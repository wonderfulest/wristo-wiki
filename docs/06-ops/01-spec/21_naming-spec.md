# Naming Specification

> 主机 / 服务 / 容器 / 资源统一命名规范

## 1️⃣ 命名目标

- **一眼看懂**：环境 / 业务 / 角色 / 归属
- **全局唯一**：避免跨 VPC / 跨账号冲突
- **可排序 / 可扩展**：支持未来横向扩容
- **适配 AWS 原生资源命名**（EC2 / ELB / RDS / S3 / CloudWatch）

------

## 2️⃣ 通用命名结构（核心约定）

### 🔹 基础结构（强制）

```
<project>-<env>-<module>-<role>-<index>
```

| 字段    | 说明          | 示例                         |
| ------- | ------------- | ---------------------------- |
| project | 项目 / 产品名 | wristo                       |
| env     | 环境          | prod / staging / test / dev  |
| module  | 业务模块      | api / web / ops / db         |
| role    | 职责          | app / worker / mysql / redis |
| index   | 编号          | 01 / 02 / a / b              |

👉 **全小写，短横线 `-` 分隔**

------

## 3️⃣ EC2 主机命名规范

### 🔹 EC2 Name Tag（最重要）

```
wristo-prod-api-app-01
```

#### 示例

| 场景           | Name                           |
| -------------- | ------------------------------ |
| 生产 API 主机  | `wristo-prod-api-app-01`       |
| 生产 API 备机  | `wristo-prod-api-app-02`       |
| Staging Worker | `wristo-staging-api-worker-01` |
| 运维跳板机     | `wristo-prod-ops-bastion-01`   |

### 🔹 hostname（Linux）

```
hostnamectl set-hostname wristo-prod-api-app-01
```

------

## 4️⃣ 服务 / 应用命名（代码 & 运维）

### 🔹 Java / Node 服务名

```
<project>-<module>-<role>
```

#### 示例

| 服务     | name                |
| -------- | ------------------- |
| API 服务 | `wristo-api-app`    |
| 后台任务 | `wristo-api-worker` |
| 管理后台 | `wristo-web-admin`  |

### 🔹 Spring Boot

```
spring:
  application:
    name: wristo-api-app
```

------

## 5️⃣ Docker 容器命名规范

### 🔹 container name

```
<project>-<env>-<service>-<index>
```

#### 示例

```
wristo-prod-api-app-01
wristo-prod-api-worker-01
```

### 🔹 docker run 示例

```
docker run -d \
  --name wristo-prod-api-app-01 \
  wristo-api-app:1.2.0
```

------

## 6️⃣ Docker Image / Tag 规范

### 🔹 Image Name

```
ghcr.io/<org>/<project>-<service>
ghcr.io/wonderfulest/wristo-api-app
```

### 🔹 Tag 规则（强制）

| 类型     | 示例             |
| -------- | ---------------- |
| 正式版本 | `1.2.0`          |
| 环境版本 | `1.2.0-prod`     |
| 构建号   | `1.2.0-20260112` |
| latest   | ❌ 禁止生产使用   |

------

## 7️⃣ AWS 资源命名规范

### 🔹 VPC

```
wristo-prod-vpc
```

### 🔹 Subnet

```
wristo-prod-public-a
wristo-prod-private-b
```

### 🔹 Security Group

```
wristo-prod-api-sg
wristo-prod-db-sg
```

### 🔹 Load Balancer

```
wristo-prod-alb
```

### 🔹 Target Group

```
wristo-prod-api-tg
```

------

## 8️⃣ RDS / Redis / 存储命名

### 🔹 RDS Instance

```
wristo-prod-mysql-01
```

### 🔹 Redis

```
wristo-prod-redis
```

### 🔹 S3 Bucket（全局唯一）

```
wristo-prod-assets
wristo-prod-backups
```

------

## 9️⃣ 日志 / 监控命名

### 🔹 CloudWatch Log Group

```
/wristo/prod/api/app
/wristo/prod/api/worker
```

### 🔹 Metric Namespace

```
Wristo/Prod/API
```

------

## 🔟 禁止事项（Hard Rules）

❌ 禁止：

- 使用大写字母
- 使用下划线 `_`
- 使用模糊词：`test1`、`tmp`、`new`
- 不带环境标识
- 生产使用 `latest` 镜像

------

## 11️⃣ 快速对照表（运维必查）

| 类型        | 示例                     |
| ----------- | ------------------------ |
| EC2         | `wristo-prod-api-app-01` |
| Docker 容器 | `wristo-prod-api-app-01` |
| 服务名      | `wristo-api-app`         |
| VPC         | `wristo-prod-vpc`        |
| ALB         | `wristo-prod-alb`        |
| RDS         | `wristo-prod-mysql-01`   |
| S3          | `wristo-prod-assets`     |

------

## 12️⃣ 变更记录

```
2026-01-12  初版定义
```

------

如果你愿意，下一步我可以直接帮你补齐：

- `tagging-spec.md`（AWS 标签规范：Owner / CostCenter / Env）
- `env-spec.md`（prod / staging / test 的硬性差异）
- `repo-naming.md`（Git 仓库命名规范）
- `port-spec.md`（端口统一分配表）

你可以直接说：**“继续补 02-architecture 里的规范文档”**