# 一、整月备份方案设计

## 目标规则（明确一下口径）

- **按月整表备份**
- 备份 **3 个月前的 trials 数据**
- 以 `created_at` 为准
- 例如：
  - 2026-02 执行任务
  - 备份 **2025-11** 的数据
  - 目标表：`trials_backup_202511`
- **流程要求**
  1. 先建表
  2. 再插入数据
  3. 可重复执行（幂等）

------

# 二、SQL 实现（核心）

## 1️⃣ 建备份表（结构完全一致）

```
CREATE TABLE IF NOT EXISTS `trials_backup_202511`
LIKE `trials`;
```

> ✔ 保留索引、字段、类型
>  ✔ 不复制数据

------

## 2️⃣ 按整月备份数据

```
INSERT INTO `trials_backup_202511`
SELECT *
FROM `trials`
WHERE created_at >= '2025-11-01 00:00:00'
  AND created_at <  '2025-12-01 00:00:00';
```

> ✔ 精准整月
>  ✔ 不受执行时间影响
>  ✔ 适合定时任务

------

# 三、Spring Boot 任务化实现（推荐）

## 1️⃣ 配置定时任务

```
@EnableScheduling
@Configuration
public class BackupScheduleConfig {
}
```

------

## 2️⃣ 备份任务 Service（核心逻辑）

```
@Service
@RequiredArgsConstructor
public class TrialsBackupService {

    private final JdbcTemplate jdbcTemplate;

    /**
     * 每月 1 号凌晨 03:30 执行
     */
    @Scheduled(cron = "0 30 3 1 * ?")
    public void backupTrialsMonthly() {
        YearMonth targetMonth = YearMonth.now().minusMonths(3);
        String monthStr = targetMonth.format(DateTimeFormatter.ofPattern("yyyyMM"));

        String tableName = "trials_backup_" + monthStr;
        LocalDateTime start = targetMonth.atDay(1).atStartOfDay();
        LocalDateTime end = targetMonth.plusMonths(1).atDay(1).atStartOfDay();

        createBackupTable(tableName);
        backupData(tableName, start, end);
    }

    private void createBackupTable(String tableName) {
        String sql = "CREATE TABLE IF NOT EXISTS `" + tableName + "` LIKE `trials`";
        jdbcTemplate.execute(sql);
    }

    private void backupData(String tableName,
                            LocalDateTime start,
                            LocalDateTime end) {

        String sql = """
            INSERT INTO `%s`
            SELECT *
            FROM `trials`
            WHERE created_at >= ?
              AND created_at < ?
        """.formatted(tableName);

        jdbcTemplate.update(sql, start, end);
    }
}
```

### ✔ 设计说明

- **幂等安全**
  - 表存在不报错
- **不依赖应用重启**
- **无 ORM 侵入**
- **可加日志 / 事务**

------

# 四、清理任务设计（你要求的规则）

## 清理条件（非常关键）

- **updated_at 超过 3 个月**
- **email 为空**
  - `NULL` 或 `''`

------

## 1️⃣ 清理 SQL（先给你最终版）

```
DELETE FROM trials
WHERE updated_at < DATE_SUB(NOW(), INTERVAL 3 MONTH)
  AND (email IS NULL OR email = '');
```

------

## 2️⃣ Spring Boot 定时清理任务

```
@Service
@RequiredArgsConstructor
public class TrialsCleanupService {

    private final JdbcTemplate jdbcTemplate;

    /**
     * 每周日凌晨 04:00 清理
     */
    @Scheduled(cron = "0 0 4 ? * SUN")
    public void cleanupOldTrials() {

        String sql = """
            DELETE FROM trials
            WHERE updated_at < DATE_SUB(NOW(), INTERVAL 3 MONTH)
              AND (email IS NULL OR email = '')
        """;

        int rows = jdbcTemplate.update(sql);

        // 可选：记录日志
        log.info("Trials cleanup finished, deleted rows: {}", rows);
    }
}
```

------

# 五、生产级增强建议（强烈推荐）

### ✅ 1. 先备份再删（安全）

```
INSERT INTO trials_backup_cleanup
SELECT *
FROM trials
WHERE updated_at < DATE_SUB(NOW(), INTERVAL 3 MONTH)
  AND (email IS NULL OR email = '');
```

------

### ✅ 2. 限流删除（防止锁表）

```
DELETE FROM trials
WHERE updated_at < DATE_SUB(NOW(), INTERVAL 3 MONTH)
  AND (email IS NULL OR email = '')
LIMIT 5000;
```

配合 **循环任务**

------

### ✅ 3. 索引优化（非常重要）

```
CREATE INDEX idx_trials_updated_email
ON trials (updated_at, email);
```

------

# 六、整体方案总结（一句话给领导）

> **通过定时任务实现 trials 表的按月冷数据归档与无效数据清理，既降低主表数据规模，又保障历史数据可追溯，提升整体查询与维护效率。**

如果你愿意，下一步我可以直接帮你补：

- ✅ **Flyway / Liquibase 版本脚本**
- ✅ **分库分表后的改造方案**
- ✅ **归档表查询统一 View**
- ✅ **失败重试 + 执行记录表设计**