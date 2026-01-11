> 适用范围
>
> - `www.wristo.io`（官网）
> - `studio.wristo.io`（Studio 控制台）
> - `sso.wristo.io`（统一身份中心）
> - 可扩展 App / Open API / CLI

------

# Wristo SSO 系统设计文档

## 1. 文档概述

### 1.1 设计目标

构建一套 **安全、可扩展、可维护** 的统一登录系统，实现：

- 官网登录后无感进入 Studio
- 多子系统统一身份
- 支持未来 App / API 扩展
- 支持强制下线、权限即时生效

### 1.2 非目标（刻意不做）

- 不实现完整 OAuth2 Provider（避免复杂度）
- 不在 SSO 中处理业务权限
- 不跨系统共享业务 Session

------

## 2. 系统整体架构

### 2.1 域名与职责划分

| 域名               | 职责                      |
| ------------------ | ------------------------- |
| `www.wristo.io`    | 用户登录入口、官网        |
| `studio.wristo.io` | Studio 控制台（业务系统） |
| `sso.wristo.io`    | **统一身份认证中心**      |

### 2.2 设计原则

- **身份集中，权限分散**
- **SSO 只回答：你是谁**
- **业务系统决定：你能做什么**
- **最小跨域、最少信任**

------

## 3. 核心概念定义

### 3.1 SSO Session

- 表示用户在 Wristo 体系内的登录状态
- 由 `sso.wristo.io` 维护
- 使用 Cookie + Server Session

### 3.2 Authorization Code

- 一次性授权码
- 用于 SSO → 业务系统的安全中转
- 有效期极短，仅可使用一次

### 3.3 Client（接入系统）

- Studio / Admin / App 等
- 需在 SSO 注册
- 通过 `client_id + client_secret` 标识

------

## 4. 登录与认证流程

### 4.1 官网登录流程（www → sso）

1. 用户在 `www.wristo.io` 输入用户名密码
2. 后端校验成功
3. 创建 `sso_session`
4. 设置 Cookie：

```
Set-Cookie:
sso_session=xxx;
Domain=.wristo.io;
Path=/;
HttpOnly;
Secure;
SameSite=None
```

------

### 4.2 自动登录 Studio 流程（核心）

1. 用户访问 `studio.wristo.io`
2. 若未登录 → 重定向至 SSO `/authorize`
3. SSO 校验 `sso_session`
4. 生成一次性 `auth_code`
5. 重定向回 `studio.wristo.io/auth/callback`
6. Studio 后端用 `code` 换取用户身份
7. Studio 创建自己的登录态

------

## 5. 接口设计

### 5.1 `/authorize`

```
GET /authorize
```

#### 请求参数

| 参数         | 必填 | 说明         |
| ------------ | ---- | ------------ |
| client_id    | 是   | 接入系统标识 |
| redirect_uri | 是   | 回调地址     |
| state        | 是   | 防 CSRF      |

#### 行为

- 校验 SSO Session
- 校验 client & redirect_uri
- 创建授权码
- 302 跳转回业务系统

------

### 5.2 `/token`

```
POST /token
```

#### 请求体

```
{
  "code": "xxx",
  "client_id": "studio",
  "client_secret": "xxx"
}
```

#### 返回示例

```
{
  "user_id": "123",
  "email": "user@wristo.io"
}
```

------

## 6. 数据模型设计

### 6.1 sso_client

- 定义可接入 SSO 的系统
- 管理 redirect_uri 白名单
- 可随时禁用

### 6.2 sso_session

- 统一登录态
- 支持多端登录
- 支持强制下线

### 6.3 sso_auth_code

- 一次性授权码
- 防止身份泄露
- 防重放攻击

（表结构详见《SSO 表结构设计文档》）

------

## 7. Cookie 与登录态策略

### 7.1 Cookie 策略

| Cookie         | Domain           | SameSite | 用途        |
| -------------- | ---------------- | -------- | ----------- |
| sso_session    | .wristo.io       | None     | 跨系统认证  |
| studio_session | studio.wristo.io | Lax      | Studio 登录 |

### 7.2 Session / JWT 选择

| 场景       | 推荐                |
| ---------- | ------------------- |
| SSO        | Session             |
| Studio Web | Session             |
| App / API  | JWT + Refresh Token |

------

## 8. 安全设计

### 8.1 安全控制点

- Authorization Code 一次性
- redirect_uri 白名单
- client_secret 仅后端使用
- state 防 CSRF
- HTTPS 全站强制

### 8.2 强制下线

- 删除 Redis 中 `sso_session`
- 立即影响所有子系统

------

## 9. 扩展性设计

### 9.1 新系统接入流程

1. 在 `sso_client` 注册
2. 配置 redirect_uri
3. 实现 `/auth/callback`
4. 接入完成

### 9.2 未来支持

- App 登录
- Open API
- 多租户（tenant_id）
- MFA（二次验证）

------

## 10. 风险与取舍说明

| 决策               | 原因         |
| ------------------ | ------------ |
| 不共享业务 Session | 安全边界清晰 |
| SSO 不用 JWT       | 可控性更高   |
| Code + Token 模式  | 防止身份泄露 |

------

## 11. 总结

该 SSO 系统具备：

- **B 端级别安全性**
- **SaaS 可扩展能力**
- **实现成本可控**
- **长期不返工的架构稳定性**

------

## 下一步建议（非常自然的演进）

你可以按这个顺序继续：

1. ✅ SSO Controller / Service 代码
2. ✅ Studio 登录模块实现
3. ✅ 权限模型（RBAC）
4. ✅ 登录态监控 & 审计

如果你愿意，我可以 **下一步直接给你一份：**

> 👉「Spring Boot SSO 实现 + Redis Key 设计 + 登录中间件」

直接到 **可运行级别**。

Spring Boot SSO 实现 + Redis Key 设计 + 登录中间件

下面我直接给你一套**「可运行级别」的 Spring Boot SSO 实现方案**，覆盖你要的三块内容：

> ✅ SSO 核心实现（Controller + Service）
>  ✅ Redis Key 设计（可强制下线、可扩展）
>  ✅ Studio / 业务系统登录中间件（OncePerRequestFilter）

**假设技术栈**

- Spring Boot 3.x
- Spring Web
- Spring Data Redis
- Spring Security（仅用 Filter，不用全套复杂配置）
- MySQL / Redis

------

# 一、Redis Key 设计（先给地基）

## 1️⃣ SSO Session

```
Key: sso:session:{sessionId}
Value: {
  userId: 123,
  loginAt: 1730000000
}
TTL: 2h / 24h
```

### 反向索引（强烈推荐）

```
Key: sso:user:{userId}:sessions
Type: SET
Value: sessionId1, sessionId2
```

👉 用于 **强制下线 / 踢所有设备**

------

## 2️⃣ Authorization Code

```
Key: sso:code:{code}
Value: {
  userId: 123,
  clientId: "studio",
  redirectUri: "https://studio.wristo.io/auth/callback"
}
TTL: 5 min
```

> 用完即 `DEL`

------

## 3️⃣ Studio Session

```
Key: studio:session:{sessionId}
Value: {
  userId: 123,
  roles: ["admin"]
}
TTL: 2h
```

------

# 二、SSO 服务端实现（sso.wristo.io）

## 1️⃣ SSO Session 创建（官网登录成功后）

```
public String createSsoSession(Long userId, HttpServletResponse response) {
    String sessionId = UUID.randomUUID().toString();

    String key = "sso:session:" + sessionId;
    redisTemplate.opsForValue().set(
        key,
        userId.toString(),
        Duration.ofHours(24)
    );

    redisTemplate.opsForSet()
        .add("sso:user:" + userId + ":sessions", sessionId);

    Cookie cookie = new Cookie("sso_session", sessionId);
    cookie.setDomain(".wristo.io");
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    cookie.setMaxAge(86400);

    response.addCookie(cookie);
    return sessionId;
}
```

------

## 2️⃣ `/authorize` 接口

```
@GetMapping("/authorize")
public void authorize(
        @RequestParam String client_id,
        @RequestParam String redirect_uri,
        @RequestParam String state,
        @CookieValue(value = "sso_session", required = false) String ssoSession,
        HttpServletResponse response
) throws IOException {

    if (ssoSession == null) {
        response.sendRedirect("https://www.wristo.io/login");
        return;
    }

    String sessionKey = "sso:session:" + ssoSession;
    String userId = redisTemplate.opsForValue().get(sessionKey);
    if (userId == null) {
        response.sendRedirect("https://www.wristo.io/login");
        return;
    }

    String code = UUID.randomUUID().toString().replace("-", "");

    redisTemplate.opsForValue().set(
        "sso:code:" + code,
        userId + "|" + client_id + "|" + redirect_uri,
        Duration.ofMinutes(5)
    );

    response.sendRedirect(
        redirect_uri + "?code=" + code + "&state=" + state
    );
}
```

------

## 3️⃣ `/token` 接口（Studio 后端调用）

```
@PostMapping("/token")
public TokenResponse token(@RequestBody TokenRequest req) {

    String key = "sso:code:" + req.getCode();
    String value = redisTemplate.opsForValue().get(key);

    if (value == null) {
        throw new RuntimeException("Invalid code");
    }

    redisTemplate.delete(key); // 一次性

    String[] parts = value.split("\\|");
    String userId = parts[0];

    return new TokenResponse(userId);
}
```

------

# 三、Studio 登录实现（studio.wristo.io）

## 1️⃣ 回调接口 `/auth/callback`

```
@GetMapping("/auth/callback")
public void callback(
        @RequestParam String code,
        HttpServletResponse response
) throws IOException {

    TokenResponse token = ssoClient.exchangeCode(code);

    String sessionId = UUID.randomUUID().toString();
    redisTemplate.opsForValue().set(
        "studio:session:" + sessionId,
        token.getUserId(),
        Duration.ofHours(2)
    );

    Cookie cookie = new Cookie("studio_session", sessionId);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    response.addCookie(cookie);

    response.sendRedirect("/");
}
```

------

# 四、登录中间件（重点）

## 1️⃣ Studio 登录校验 Filter

```
@Component
public class StudioAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();
        if (path.startsWith("/auth") || path.startsWith("/public")) {
            filterChain.doFilter(request, response);
            return;
        }

        String sessionId = Arrays.stream(
                Optional.ofNullable(request.getCookies()).orElse(new Cookie[0])
        )
        .filter(c -> "studio_session".equals(c.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);

        if (sessionId == null) {
            response.sendRedirect(
              "https://sso.wristo.io/authorize?client_id=studio&redirect_uri=https://studio.wristo.io/auth/callback&state=xyz"
            );
            return;
        }

        String userId = redisTemplate.opsForValue()
                .get("studio:session:" + sessionId);

        if (userId == null) {
            response.sendRedirect("/auth/logout");
            return;
        }

        request.setAttribute("userId", userId);
        filterChain.doFilter(request, response);
    }
}
```

------

## 2️⃣ 强制下线（SSO 管理员）

```
public void logoutUser(Long userId) {
    String key = "sso:user:" + userId + ":sessions";
    Set<String> sessions = redisTemplate.opsForSet().members(key);

    if (sessions != null) {
        for (String sid : sessions) {
            redisTemplate.delete("sso:session:" + sid);
        }
    }

    redisTemplate.delete(key);
}
```

👉 **所有系统立即失效**

------

# 五、你现在这套方案的成熟度

| 维度        | 评级  |
| ----------- | ----- |
| 安全性      | ⭐⭐⭐⭐⭐ |
| 可扩展性    | ⭐⭐⭐⭐⭐ |
| 实现复杂度  | ⭐⭐⭐   |
| SaaS 友好度 | ⭐⭐⭐⭐⭐ |

------

# 六、下一步（强烈建议）

你现在已经是**企业级登录体系**，下一步自然演进是：

1. 🔐 **RBAC / 权限注解（@RequirePermission）**
2. 📊 **登录审计 & 风控**
3. 🔄 **Refresh Token（App / API）**
4. 🔑 **多租户 tenant_id**

你可以直接说一句：

> 👉「给我 RBAC 表结构 + 权限注解实现」

我可以直接帮你补齐最后一块。



