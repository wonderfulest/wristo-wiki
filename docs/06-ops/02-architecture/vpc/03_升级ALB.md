现在这套 **「2 EC2 + 公网子网 + EIP 主备」** 的结构，本身就是 **ALB 的完美前置形态**，**几乎不用推倒重来**。

下面我按 **“在你现有架构上如何平滑升级到负载均衡”** 来讲，而不是重画一张新架构图。

------

## 🧭 一句话总览（你只需要新增 3 样东西）

在你现有：

```
VPC
├─ Subnet A (primary)
├─ Subnet B (standby)
├─ EC2 primary
└─ EC2 standby
```

👉 **新增：**

```
➕ Application Load Balancer（ALB）
➕ Target Group
➕ ALB 专用 Security Group
```

**原来的 EC2 / 子网 / 路由表：全部保留**

------

## 🧱 升级后的结构图（逻辑上是这样）

```
Internet
   ↓
ALB（公网）
   ↓
Target Group
   ├─ EC2 primary (10.0.1.0/24)
   └─ EC2 standby (10.0.2.0/24)
```

------

## 0️⃣ 升级前的 **必要前提检查**

你现在的架构 **已经满足 ALB 要求**，只确认 3 件事：

- ✅ **至少 2 个子网**
- ✅ **子网在不同 AZ**
- ✅ **子网是公网子网**（0.0.0.0/0 → IGW）

👉 你现在全部满足 ✔

------

## 1️⃣ 创建 Target Group（先于 ALB）

### 路径

```
EC2 → Target Groups → Create target group
```

### 配置

- Target type：`Instances`
- Name：`wristo-prod-tg`
- Protocol：`HTTP`
- Port：`80`
- VPC：`wristo-prod-vpc`

### Health Check（很重要）

- Protocol：HTTP
- Path：`/health`（**建议你自己实现一个**）
- Success codes：`200`

👉 Create

------

### 注册 EC2

- Register targets
- 勾选：
  - `wristo-prod-primary`
  - `wristo-prod-standby`
- Port：`80`
- Save

------

## 2️⃣ 创建 ALB 专用 Security Group

> ❗ **不要复用 EC2 的 SG**

```
EC2 → Security Groups → Create
```

- Name：`wristo-alb-sg`
- VPC：`wristo-prod-vpc`

### 入站规则

| Type  | Port | Source    |
| ----- | ---- | --------- |
| HTTP  | 80   | 0.0.0.0/0 |
| HTTPS | 443  | 0.0.0.0/0 |

出站：默认全放行

------

## 3️⃣ 创建 Application Load Balancer（核心）

### 路径

```
EC2 → Load Balancers → Create
```

### 选择

- Type：**Application Load Balancer**
- Name：`wristo-prod-alb`
- Scheme：`Internet-facing`
- IP type：IPv4

------

### Network Mapping（重点）

- VPC：`wristo-prod-vpc`
- Subnets：
  - `wristo-subnet-primary`
  - `wristo-subnet-standby`

👉 **必须 2 个子网，不然无法创建**

------

### Security Group

- 选择：`wristo-alb-sg`

------

### Listener & Routing

- Listener：
  - HTTP : 80
- Forward to：
  - Target Group：`wristo-prod-tg`

👉 Create Load Balancer

------

## 4️⃣ 修改 EC2 Security Group（关键但容易漏）

你的 EC2 现在是：

```
80 / 443 ← 0.0.0.0/0
```

❌ **不推荐**

### 正确做法是：

**EC2 SG 入站规则改为：**

| Type  | Port | Source          |
| ----- | ---- | --------------- |
| HTTP  | 80   | `wristo-alb-sg` |
| HTTPS | 443  | `wristo-alb-sg` |
| SSH   | 22   | 你的 IP         |

✅ 这样 **EC2 只接受 ALB 的流量**

------

## 5️⃣ DNS / EIP 怎么办？（重点理解）

### ❌ ALB **不能绑定 Elastic IP**

这是 AWS 的设计。

### 正确方案：

- 你原来的 **EIP 可以退休**
- 对外入口改成：

```
ALB DNS Name
例如：
wristo-prod-alb-123456.us-east-1.elb.amazonaws.com
```

### 推荐做法（生产必做）

- Route53：
  - `api.wristo.io`
  - CNAME → ALB DNS

------

## 🔁 主备切换：现在是谁在做？

| 场景       | 谁负责           |
| ---------- | ---------------- |
| EC2 挂     | **ALB 自动摘除** |
| 恢复       | 自动加回         |
| 流量分配   | ALB              |
| 你是否手动 | ❌ 不需要         |

👉 **你从“人肉切换”进化成“自动容灾”**

------

## 💰 成本预期（真实）

- ALB：
  - ~$16 / 月（低流量）
- 不用 EIP
- EC2 不变

👉 比 **人肉 EIP 切换** 贵一点
👉 但 **稳定性直接上一个等级**

------

## 🧠 你现在这条技术演进路径是「非常专业的」

```
阶段 1：EIP 主备（你现在）
阶段 2：ALB 自动健康检查
阶段 3：Auto Scaling（将来）
阶段 4：多 Region（再以后）
```

------

如果你愿意，下一步我可以直接帮你：

- ✅ **给你一份「ALB + EC2」Terraform 最小模板**
- ✅ **帮你设计 `/health` 接口规范**
- ✅ **算你现在流量下，ALB 是否值得上**
- ✅ **一步步从 EIP 迁移到 ALB，不停服**

你只要说一句：
 👉 **「下一步做 X」**

