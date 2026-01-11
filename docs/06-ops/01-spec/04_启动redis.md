# **用 Docker 跑 Redis 7**

> 这是 **AWS 官方 + 生产环境** 最主流做法

### 为什么这是最优解？

- Redis 本来就是 **单进程服务**
- Docker 隔离、版本稳定
- 不依赖系统 RPM
- 升级 / 回滚极其简单

## 生产常用版本（持久化 + 密码）

### 1️⃣ 创建数据目录

```
mkdir -p /data/redis
```

### 2️⃣ 所有节点都要启动 Redis（只做缓存，不做分布式锁）（推荐）

```
docker run -d \
  --name redis \
  --restart unless-stopped \
  -p 6379:6379 \
  -v /data/redis:/data \
  redis:7.2 \
  redis-server \
    --appendonly yes \
    --bind 0.0.0.0 \
    --protected-mode no \
    --requirepass "Wristo2026!"
```

验证（带密码）：

```
docker exec -it redis redis-cli -a Wristo2026! ping
# PONG
```

> ✅ AOF 持久化
> ✅ 容器重启数据不丢
> ✅ 有密码，安全基本到位

> ⚠️ **Docker 组生效需要重新登录一次 EC2**





