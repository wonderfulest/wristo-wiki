**「可直接落库、可直接写代码」的后端接口清单**。
 我会按 **你现在的架构（Email 主身份 + Google 登录）** 来，不讲虚的。

> 目标：**接口少、职责清晰、不区分注册/登录**

------

# 一、接口总览（你真正需要的就这些）

```
Auth
├── POST /auth/email/send-code
├── POST /auth/email/verify-code
├── POST /auth/google/login
├── POST /auth/logout
├── GET  /auth/me
```

✔ 没有 register
 ✔ 没有 login
 ✔ 用户永远只是在「认证」

------

# 二、接口详细设计（逐个拆）

# 1️⃣ 发送邮箱验证码

### `POST /auth/email/send-code`

### 用途

- 校验邮箱格式
- 发送一次性验证码
- **不创建用户**

### Request

```
{
  "email": "user@gmail.com"
}
```

### Server 行为（关键）

```
1. 校验邮箱格式
2. 生成 6 位验证码
3. 写入 email_verification 表 / Redis
4. 发送邮件
```

### Response（永远一致）

```
{
  "success": true
}
```

📌 **不要返回：是否已注册**

------

## 2️⃣ 校验邮箱验证码（核心接口）

### `POST /auth/email/verify-code`

### 用途

- 校验验证码
- 登录 or 创建用户
- 返回 session / token

### Request

```
{
  "email": "user@gmail.com",
  "code": "483920"
}
```

### Server 核心逻辑（重点）

```
if code invalid:
    return 401

user = find user by email

if user exists:
    mark email_verified = true
    login user
else:
    create user
    email_verified = true
    login user
```

### Response

```
{
  "access_token": "jwt_xxx",
  "user": {
    "id": 123,
    "email": "user@gmail.com",
    "avatar": null
  }
}
```

📌 这一步 = **登录完成**

------

## 3️⃣ Google 登录

### `POST /auth/google/login`

### 用途

- 校验 Google JWT
- 绑定 / 登录 / 创建用户

### Request

```
{
  "credential": "google_id_token"
}
```

### Server 核心逻辑

```
1. 验证 Google JWT
2. 拿到 google_id + email + avatar

if google_id exists:
    login

else if email exists:
    bind google_id
    login

else:
    create user(email, google_id, email_verified=true)
    login
```

### Response（和邮箱登录保持一致）

```
{
  "access_token": "jwt_xxx",
  "user": {
    "id": 123,
    "email": "user@gmail.com",
    "avatar": "https://..."
  }
}
```

📌 **Response 结构必须统一**

------

## 4️⃣ 获取当前用户信息

### `GET /auth/me`

### 用途

- 前端刷新后恢复用户态
- 校验 token 是否有效

### Header

```
Authorization: Bearer jwt_xxx
```

### Response

```
{
  "id": 123,
  "email": "user@gmail.com",
  "avatar": "...",
  "providers": {
    "google": true,
    "apple": false
  }
}
```

------

## 5️⃣ 退出登录

### `POST /auth/logout`

### 用途

- 清除 session / token（如需要）

### Response

```
{
  "success": true
}
```

📌 JWT 可选做黑名单，不是必须

------

# 三、辅助表 & 基础设施（你一定会用到）

## email_verification 表用 Redis 实现，ttl 设置为 10分钟

```
CREATE TABLE email_verification (
  email VARCHAR(255) PRIMARY KEY,
  code VARCHAR(6),
  expires_at DATETIME
);
```

📌 Redis 更优（TTL）

------

## 速率限制（非常重要）

| 场景        | 限制                |
| ----------- | ------------------- |
| send-code   | 同一邮箱 60s 1 次   |
| send-code   | 同一 IP 1h ≤ 10 次  |
| verify-code | 错误 5 次锁 10 分钟 |

------

# 四、前端对接时的「黄金规则」

- **不区分注册 / 登录**
- **只处理两种结果：成功 or 失败**
- **所有成功都拿 token**

------

# 五、你这套接口的最大优点

- 登录方式可以无限加
- user 表不变
- 前端逻辑极简
- 不会出现「重复账号」

------

# 六、工程师级总结（给你压一句）

> **Auth 接口的本质是：
>  “我确认你是谁，然后给你一个 user_id”
>  而不是“我让你注册一个账号”**

如果你愿意，下一步我可以直接帮你出：

- Spring Boot Controller + Service
- JWT / Session 实现
- Redis 验证码组件
- OpenAPI 文档

你这套已经是**可以直接上线的级别**了。