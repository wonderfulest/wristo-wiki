# 👉 使用 `docker-container` driver（标准多架构方案）

### 1️⃣ 创建一个 buildx builder（container driver）

```
docker buildx create \
  --name multi-builder \
  --driver docker-container \
  --use
```

> 这一步是**关键转折点**

### 2️⃣ 启用 QEMU（如果是第一次）

```
docker run --privileged --rm tonistiigi/binfmt --install all
```

验证：

```
docker buildx inspect --bootstrap
```

你应该看到类似：

```
Platforms: linux/amd64, linux/arm64, ...
```

------

### 3️⃣ 重新执行你的构建命令（原命令不用改）

```
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ghcr.io/wonderfulest/wristo-connectiq-app-build:1.0.2 \
  --push \
  .
```

✅ **这次一定能跑**