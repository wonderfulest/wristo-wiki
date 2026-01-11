「**可落地的规则引擎 + 配置驱动主题系统**」了。下面我会**重新组织表结构（只保留两张核心表）**，并给出**规则引擎执行模型 + 接口定义**，确保：

- ✅ **一个 App 只有一套主题规则**
- ✅ **规则只负责“算 key/value”**
- ✅ **theme_configs 只负责“key/value → image + color”**
- ✅ **规则引擎可扩展、可测试、可回放**
- ✅ **不把 image_id 写死在 rule 里（解耦）**

------

## 一、核心设计思想（先定“骨架”）

> **Rule = 决策逻辑（算出命中的 key/value）**
>  **Config = 结果映射（key/value → image_id + color_json）**

👉 规则引擎 **永远不直接返回 image_id**
👉 规则引擎只返回：

```
{
  "key": "date",
  "value": "2025-12-29"
}
```

然后再用这个 `(app_id, key, value)` 去 `theme_configs` 命中图片 & 颜色。

------

## 二、表结构重构（推荐最终版）

------

## 1️⃣ 主题规则表 `theme_rules`

> **一 App 一条规则**
>
> 不存 image_id，只存“怎么算 key/value”

```
CREATE TABLE `theme_rules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `app_id` bigint unsigned NOT NULL COMMENT '应用ID（唯一）',
  `rule_type` varchar(50) NOT NULL COMMENT '规则类型: daily | time_based | seasonal | weather_based | ...',
  `rule_calculation` json NOT NULL COMMENT '规则计算JSON（只描述计算逻辑）',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_app` (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='主题规则表（一App一规则）';
```

------

### ✅ 推荐 rule_calculation 标准化格式

#### 示例 1：每日切换（daily）

```
{
  "rule_type": "daily",
  "output": {
    "key": "date",
    "format": "yyyy-MM-dd"
  }
}
```

👉 引擎只做一件事：

> **今天日期 → value**

------

#### 示例 2：时间段切换（time_based）

```
{
  "rule_type": "time_based",
  "output": {
    "key": "time_slot"
  },
  "slots": [
    { "name": "night", "range": "00:00-06:00" },
    { "name": "morning", "range": "06:00-12:00" },
    { "name": "afternoon", "range": "12:00-18:00" },
    { "name": "evening", "range": "18:00-24:00" }
  ]
}
```

👉 输出：

```
{ "key": "time_slot", "value": "morning" }
```

------

#### 示例 3：季节切换（seasonal）

```
{
  "rule_type": "seasonal",
  "output": {
    "key": "season"
  }
}
```

👉 输出：

```
{ "key": "season", "value": "winter" }
```

------

#### 示例 4：天气切换（weather_based）

```
{
  "rule_type": "weather_based",
  "input": {
    "source": "weather.code"
  },
  "mapping": {
    "sunny": ["CLEAR"],
    "rainy": ["RAIN", "STORM"],
    "cloudy": ["CLOUDS"]
  },
  "output": {
    "key": "weather"
  }
}
```

👉 输出：

```
{ "key": "weather", "value": "rainy" }
```

------

## 2️⃣ 主题配置表 `theme_configs`

> **纯映射表：key + value → image + color**

```
CREATE TABLE `theme_configs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `app_id` bigint unsigned NOT NULL COMMENT '应用ID',
  `key` varchar(100) NOT NULL COMMENT '规则输出Key，如 date / season / weather',
  `value` varchar(100) NOT NULL COMMENT '规则输出Value，如 2025-12-29 / winter / rainy',
  `image_id` bigint unsigned NOT NULL COMMENT '图片ID',
  `color_json` json COMMENT '颜色主题配置',
  `weight` int NOT NULL DEFAULT '1' COMMENT '同一key/value下加权随机',
  `priority` int NOT NULL DEFAULT '0' COMMENT '优先级，越大越优先',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_app_key_value_image` (`app_id`, `key`, `value`, `image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='主题配置映射表';
```

------

### 示例数据（time_based）

```
app_id | key        | value     | image_id | color_json
-------------------------------------------------------
1      | time_slot | morning   | 101      | {...}
1      | time_slot | afternoon | 102      | {...}
1      | time_slot | evening   | 103      | {...}
1      | time_slot | night     | 104      | {...}
```

------

## 三、规则引擎执行流程（非常清晰）

```
flowchart LR
A[客户端请求] --> B[加载 theme_rules]
B --> C[规则引擎执行]
C --> D{key,value}
D --> E[查询 theme_configs]
E --> F[加权/优先级选择]
F --> G[返回 image_id + color_json]
```

------

## 四、规则引擎输入参数（统一上下文）

```
{
  "now": "2025-12-29T09:30:00+08:00",
  "timezone": "Asia/Shanghai",
  "weather": {
    "code": "RAIN",
    "temp": 8
  },
  "location": {
    "country": "CN",
    "city": "Beijing"
  },
  "sport": {
    "goalReached": true
  },
  "body": {
    "battery": 0.32,
    "stress": 78
  }
}
```

------

## 五、对外接口定义（生产可用）

------

### 🔹 获取当前主题

```
GET /api/public/theme/current
```

#### Query

| 参数   | 必填 | 说明   |
| ------ | ---- | ------ |
| app_id | ✅    | 应用ID |

#### Body（上下文）

```
{
  "weather": { "code": "RAIN" },
  "timezone": "Asia/Shanghai"
}
```

------

### 🔹 Response

```
{
  "app_id": 1,
  "rule": {
    "type": "time_based",
    "key": "time_slot",
    "value": "morning"
  },
  "result": {
    "image_id": 101,
    "image_url": "https://cdn.xxx/bg/morning.jpg",
    "color": {
      "primary": "#1E90FF",
      "text": "#FFFFFF"
    }
  }
}
```

------

## 六、这个设计的几个“高级优势”

✅ **规则完全可配置（不改代码）**
✅ **规则与资源彻底解耦**
✅ **同一规则支持多图片加权随机**
✅ **非常适合你后续做：**

- 节日主题
- A/B Test
- 地区差异化
- 会员专属主题
- AI 规则生成（LLM 直接产 rule_calculation）

------

如果你愿意，下一步我可以直接帮你：

- ✨ 抽象 **RuleEngine 接口（Java ）**
- ✨ 给你一个 **rule_calculation JSON Schema**
- ✨ 设计 **后台配置 UI（如何让运营不写 JSON）**
- ✨ 设计 **规则回放 & Debug 工具**

你这套已经是**平台级能力**了，继续往下做非常值 👍


