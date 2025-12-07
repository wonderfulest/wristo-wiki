# 🚀 EC2 重启后需要完成的动作（完整版）

## 1. **挂载数据盘（EBS Volumes）**

你的两块盘需要在系统启动后重新确认挂载情况：

### 🧩 需要挂载的 Volume

- `vol-01f66618cf024761c` 系统盘   /            16G
- `vol-0252c068afcfebcdb` 数据盘  /data       20G

### ⛓️ **操作步骤**

1. 查看是否自动挂载成功

   ```
   lsblk
   df -h
   ```

   **确认 /data 自动挂载（fstab）**

   运行：

   ```
   cat /etc/fstab
   ```

   确保有如下内容（可能略有不同）：

   ```
   /dev/xvdb   /data   ext4   defaults,nofail   0   2
   ```

   如果没有，我可以帮你生成安全的 fstab 条目。

------

## 2. **启动 MySQL（或检查其运行状态）**

### 🔧 启动服务

```
sudo systemctl start mysqld
# or
sudo systemctl start mysql
```

### 🔍 检查状态

```
sudo systemctl status mysqld
```

### 🗂️ 检查数据目录是否在挂载盘上

确保你的数据盘已经挂载后再启动 MySQL，否则它会报数据目录不存在。

------

## **启动 Redis（如你的系统使用）**

```
sudo systemctl start redis
sudo systemctl status redis
```



## 3. **启动 Java（Spring Boot / JAR 服务）**

### 🚦 启动后端服务

```
pm2 ls

```

直接执行：

```
cd /app/wristo-api
bash run.sh
```

如果你不想跑 run.sh，也可以手动启动：

```
pm2 start "java -jar -Dspring.profiles.active=prod /app/wristo-api/wristo-api-0.0.1-SNAPSHOT.jar" \
    --name wristo-api \
    --output /data/logs/wristo-api/wristo-api.log \
    --error  /data/logs/wristo-api/wristo-api_error.log
```

### 🧪 验证服务

```
 curl http://localhost:8088/actuator/health
```

------

## 4. **启动 Nginx（如有）**

```
sudo systemctl start nginx
sudo systemctl status nginx
```

------

## 5. **加载环境变量 / Profile**

部分情况下 EC2 重启后 profile 不会自动恢复：

```
source ~/.bash_profile
```

确认环境变量可用：

```
echo $JAVA_HOME
echo $PATH
```

------

## 7. **检查安全组与公网 IP（如使用 Elastic IP）**

确保实例重新绑定你的 Elastic IP，外部访问才会恢复正常。

------

## 8. **检查对外服务是否正常运行**

### 🧪 API 自检

```
 curl -I https://api.wristo.io
```

### 🧪 网站

快速访问：

- 前台网站
- 后台管理系统
- Watch face 激活服务

------

## 9. **检查系统监控**

- CPU
- 内存
- 磁盘空间
- 文件句柄（特别是高并发服务）
- 日志路径是否正确

------

## 10. **检查 Cron 计划任务是否已恢复运行**

```
crontab -l
```

------

# ✔️ 最终 Checklist（你可直接贴到 Notion）

- [ ] 确认 EBS 数据盘挂载
- [ ] 确认 `/etc/fstab` 正确
- [ ] 启动 MySQL
- [ ] 启动 Java（Spring Boot）服务
- [ ] 启动 Nginx
- [ ] 启动 Redis
- [ ] 加载环境变量
- [ ] 检查 Elastic IP
- [ ] 检查 API / 网站访问
- [ ] 检查日志与监控
- [ ] 检查 Cron Job
