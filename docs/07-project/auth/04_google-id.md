好，这里我给你一套**「Google 登录 + 邮箱登录」协同工作的最佳实践**，目标只有三个：
 **不重复账号｜不恶心用户｜后期好扩展**。

------

## 一、最终形态（一眼看懂）

```
同一个用户
├── 用 Gmail 点「Google 登录」 ✔
├── 也可以直接输邮箱收验证码 ✔
└── 最终 → 同一个 user_id
```

👉 **用户不需要理解“账号体系”**
 👉 **系统自动帮他合并**

------

## 二、推荐的整体架构（结论先行）

> **邮箱 = 主身份**
>  **Google = 快捷认证方式**

```
Email (唯一)
 ├── Google ID（可选）
 ├── Apple ID（可选）
 └── Password（可选，甚至可以没有）
```

------

## 三、数据库设计（⚠️这是成败关键）

### ✅ user 表（核心）

```
CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,

  -- 核心身份
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,

  -- 第三方账号
  google_id VARCHAR(64) UNIQUE DEFAULT NULL,

  -- 基础信息
  avatar VARCHAR(512),
  created_at DATETIME,
  updated_at DATETIME
);
```

📌 设计原则：

- **email 永远唯一**
- Google 只是「绑定项」，不是主键

------

## 四、两种登录方式的真实执行逻辑

------

### ① Google 登录流程（推荐给新用户）

基于 **Google Identity Services**

```
Google 登录成功
 → 拿到 google_id + email
 → 用 email 查 user
```

#### 后端判断逻辑（重点）

```
如果 google_id 已存在：
    → 直接登录

否则如果 email 已存在：
    → 绑定 google_id
    → 登录

否则：
    → 创建新用户
    → 保存 email + google_id
    → 登录
```

📌 **这一步保证：**

- Google 新用户不重复
- 老邮箱用户无感升级

------

### ② 邮箱验证码登录流程（兜底 & 主方案）

```
输入邮箱
 → 发送验证码
 → 校验成功
 → 查 user
如果 email 已存在：
    → 登录

否则：
    → 创建新用户
    → email_verified = true
    → 登录
```

📌 如果这个用户**之前用 Google 登录过**：

- email 一样
- 会命中同一个 user

------

## 五、账号合并的“铁律”（你照着做就不会翻车）

### ✅ 永远按这个优先级

```
1️⃣ google_id
2️⃣ email
```

### ❌ 千万不要

- 用 google_id 当唯一用户
- 允许 email 重复
- Google 登录生成「无邮箱用户」

------

## 六、前端 UX 推荐（非常重要）

### 登录入口建议这样排：

```
[ Continue with Google ]
------------------------
[ Email address ______ ]
[ Send Code ]
```

📌 原因：

- Google 用户一键进
- 非 Google 用户也不被劝退
- **不要让用户选「注册 / 登录」**

------

## 七、你这套方案天然支持后期扩展

以后你想加：

- Apple 登录
- 密码登录
- 企业 SSO

👇 **user 表都不用改结构**

```
email 作为统一锚点
第三方登录 = 绑定项
```

------

## 八、常见踩坑清单（提前帮你避）

❌ Google 登录 ≠ 有 email 就直接 trust
 ✔ 必须校验 Google JWT

❌ Google 登录生成无 email 用户
 ✔ 必须有 email 才创建用户

❌ 邮箱登录和 Google 登录各一套 user 表
 ✔ **一张表！**

------

## 九、给你一句「产品级总结」

> **邮箱是身份证，Google 是快速通道**
>  **用户不关心登录方式，只关心能不能进去**