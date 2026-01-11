**「AWS 控制台 · 最小主备架构」一步步创建顺序**
 👉 你只要**按顺序点**，不会走歪
 👉 目标：**2 台 EC2（一主一备）+ 可快速切换**

------

## 🧭 总体创建顺序（先看一眼）

```
1️⃣ VPC
2️⃣ Internet Gateway
3️⃣ 子网（主 / 备）
4️⃣ 路由表
5️⃣ Security Group
6️⃣ EC2（主）
7️⃣ EC2（备）
8️⃣ Elastic IP（可选但强烈建议）
```

------

## 1️⃣ 创建 VPC

**路径**

```
VPC → Your VPCs → Create VPC
```

**填写**

- Name tag：`wristo-prod-vpc`
- IPv4 CIDR：`10.0.0.0/16`
- IPv6：不选
- Tenancy：Default

👉 点 **Create VPC**

------

## 2️⃣ 创建 Internet Gateway（IGW）

**路径**

```
VPC → Internet Gateways → Create
```

**操作**

- Name：`wristo-prod-igw`
- Create
- 选中 IGW → **Attach to VPC**
- 选择：`prod-vpc`

✅ 这一步决定你能不能上公网

------

## 3️⃣ 创建两个子网（主 / 备）

### 🔹 子网 A（主）

```
VPC → Subnets → Create subnet
```

- VPC：`wristo-prod-vpc`
- Subnet name：`wristo-subnet-primary`
- AZ：任选一个（如 `us-east-1a`）
- CIDR：`10.0.1.0/24`

------

### 🔹 子网 B（备）

- Subnet name：`wristo-subnet-standby`
- AZ：**不同于上面**（如 `us-east-1b`）
- CIDR：`10.0.2.0/24`

👉 Create subnet

------

## 4️⃣ 路由表（让子网能出网）

### 4.1 创建路由表

```
VPC → Route Tables → Create
```

- Name：`wristo-prod-public-rt`
- VPC：`wristo-prod-vpc`

------

### 4.2 添加出网规则

- Routes → Edit routes → Add route

```
0.0.0.0/0 → Internet Gateway → wristo-prod-igw
```

------

### 4.3 绑定子网

- Subnet associations → Edit
- 勾选：
  - `subnet-primary`
  - `subnet-standby`

✅ 现在两个子网都能上公网

------

## 5️⃣ 创建 Security Group（一次就够）

```
EC2 → Security Groups → Create
```

- Name：`wristo-prod-sg`
- VPC：`wristo-prod-vpc`

### 入站规则（示例）

| Type  | Port | Source    |
| ----- | ---- | --------- |
| SSH   | 22   | 你的 IP   |
| HTTP  | 80   | 0.0.0.0/0 |
| HTTPS | 443  | 0.0.0.0/0 |

出站：默认全放行即可

------

## 6️⃣ 创建 EC2（主机）

```
EC2 → Instances → Launch instance
```

**关键配置**

- Name：`wristo-prod-primary`
- AMI：Amazon Linux 2023 / Ubuntu
- Instance type：`t3.micro`（起步够）
- Key pair：选你已有的
- Network：
  - VPC：`wristo-prod-vpc`
  - Subnet：`wristo-subnet-primary`
  - Auto-assign public IP：**Enable**
- Security Group：`wristo-prod-sg`

👉 Launch

------

## 7️⃣ 创建 EC2（备机）

同上，**只改 3 个地方**：

- Name：`wristo-prod-standby`
- Subnet：`wristo-subnet-standby`
- AZ：自动跟子网走

👉 Launch

------

## 8️⃣（强烈推荐）绑定 Elastic IP

### 8.1 创建 EIP

```
EC2 → Elastic IPs → Allocate
```

------

### 8.2 绑定到主机

- Actions → Associate
- Instance：`wristo-prod-primary`
- Network interface：默认

✅ 你的「对外 IP」现在固定了

------

## 🔁 主备切换（重点）

当 **主机挂了**：

```
Elastic IP
→ Disassociate（wristo-prod-primary）
→ Associate（wristo-prod-standby）
```

🕐 通常 30 秒 ~ 1 分钟
🌍 域名 / 客户 / API 全不用改

------

## ✅ 最终你会得到什么

- ✔ 两台机器，完全隔离
- ✔ 一个对外 IP
- ✔ 不用负载均衡，不烧钱
- ✔ 人肉也能切，但很稳

------

## 下一步我可以继续帮你

- 📄 **“生产事故切换 SOP（1 页）”**
- 🧱 **Terraform 一键复刻**
- 🔐 **更严谨的安全组 & 子网隔离**
- ⚡ **以后升级 ALB / 自动切换怎么无痛演进**

你直接说一句：
 👉 **“给我切换 SOP”** 或 **“Terraform 版”**