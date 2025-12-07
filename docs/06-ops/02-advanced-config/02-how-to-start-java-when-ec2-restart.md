# 🚀 **EC2 实例停机/重启后，如何启动 Java 服务？**

EC2 重启后，你需要按顺序做两件事：

1. **确认数据盘 /data 是否挂载成功**
2. **用 pm2 或 run.sh 启动 Java 服务**

下面是完整流程👇

------

# ✅ **步骤 1：检查数据盘是否已挂载**

你的 Java 日志存放在：

```
/data/logs/wristo-api/
```

所以 **必须确保 /data 已挂载**。

### 查看挂载：

```
df -h
```

你应该看到：

```
/dev/xvdb   20G   ...   /data
```

如果没挂载（极少情况），手动执行：

```
sudo mount /data
```

------

# ✅ **步骤 2：检查 pm2 是否还在（重启后 pm2 默认不会自动启动）**

运行：

```
pm2 ls
```

若显示：

```
bash: pm2: command not found
```

说明你当前 shell 没加载 pm2，执行：

```
source ~/.bash_profile
```

再执行：

```
pm2 ls
```

------

# 🧭 **如果 pm2 列表里没有 wristo-api（重启后一般都会消失）：**

你需要重新启动 Java 服务。

此时有 **两种方式**可选👇

------

# 🚀 方法一（推荐）：执行 run.sh（你已经有完整脚本）

你的 run.sh 会：

✔ 自动删除旧 pm2 进程
 ✔ 自动轮转日志
 ✔ 自动启动 Java
 ✔ 自动创建日志目录

直接执行：

```
cd /app/wristo-api
bash run.sh
```

看到以下说明已成功：

```
pm2 delete wristo-api
pm2 start "java -jar ..."
```

### 查看服务是否上线：

```
pm2 ls
```

### 查看日志：

```
pm2 logs wristo-api
```

------

# 🚀 方法二：直接用 pm2 启动 Java

如果你不想跑 run.sh，也可以手动启动：

```
pm2 start "java -jar -Dspring.profiles.active=prod /app/wristo-api/wristo-api-0.0.1-SNAPSHOT.jar" \
    --name wristo-api \
    --output /data/logs/wristo-api/wristo-api.log \
    --error  /data/logs/wristo-api/wristo-api_error.log
```

这个命令与你 run.sh 中的完全一致。

------

# 🎯 **你需要记住的最简单的启动流程（适合平时运维）**

只需两步：

### **① 确认 /data 挂载成功**

```
df -h
```

### **② 执行 run.sh 启动 Java**

```
cd /app/wristo-api
bash run.sh
```

就这两步，你的 Java 服务就会完全恢复。