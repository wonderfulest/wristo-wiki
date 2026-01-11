## `01-spec/` —— 运维规范与基线

> **统一“规则”，避免个人风格污染生产**

### 放什么

- 命名规范
- 目录与路径规范
- 环境划分规范
- 基础账号与权限规范

### 示例文件

- `naming-spec.md`（主机 / 服务 / 容器命名）
- `env-standard.md`（DEV / STG / PROD 区别）
- `directory-layout.md`（/data /opt /logs）
- `ops-account-policy.md`

## `02-architecture/` —— 架构与设计说明

> **一眼看懂系统是怎么“搭起来的”**

### 放什么

- 系统整体架构说明
- 网络与可用性设计
- 主备 / 灾备方案

### 示例文件

- `system-architecture.md`
- `network-topology.md`
- `ha-dr-design.md`

> 📌 通常配架构图（PNG / drawio / excalidraw）



## `03-resources/` —— 资源与资产清单

> **回答三个问题：有什么？在哪？谁负责？**

### 放什么

- 云资源清单
- IP / 域名 / 证书
- 第三方依赖

### 示例文件

- `ec2-list.md`
- `database-list.md`
- `redis-list.md`
- `domain-cert-list.md`
- `third-party-services.md`

## `04-deploy/` —— 部署与初始化

> **新人不问人，也能把环境跑起来**

### 放什么

- 新机器初始化
- 中间件安装
- 服务部署步骤

### 示例文件

- `ec2-init.md`
- `docker-install.md`
- `nginx-deploy.md`
- `mysql-8.4-deploy.md`
- `redis-deploy.md`

## `05-release/` —— 发布与变更

> **防止“拍脑袋上线”**

### 放什么

- 发布流程
- 回滚方案
- 版本管理规范

### 示例文件

- `release-process.md`
- `release-checklist.md`
- `rollback-guide.md`
- `versioning-rules.md`

## `06-runtime/` —— 运行手册（How to Operate）

> **系统跑起来之后的“日常操作说明书”**

### 放什么

- 启停方式
- 配置文件位置
- 日志说明

### 示例文件

- `runtime-nginx.md`
- `runtime-mysql.md`
- `runtime-redis.md`
- `runtime-docker.md`

## `07-monitor/` —— 监控与告警

> **提前发现问题，而不是用户告诉你**

### 放什么

- 监控指标说明
- 告警规则
- 告警处理流程

### 示例文件

- `metrics-definition.md`
- `alert-rules.md`
- `alert-handling.md`
- `monitor-dashboard.md`

------

## `08-runbook/` —— 故障处理手册（最重要）

> **出事时按步骤来，不靠经验**

### 放什么

- 高频故障的处理流程
- 排查路径
- 临时止血方案

### 示例文件

- `nginx-502.md`
- `mysql-connection-timeout.md`
- `redis-memory-full.md`
- `disk-full.md`

📌 **一条 Runbook = 一个问题**