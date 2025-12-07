# 🛠️ **AWS 运维文档（通用版 + 你的环境已适配）**

> 环境：Amazon Linux / EC2（t2.medium）
>  磁盘：xvda（系统盘 16GB），xvdb（数据盘 20GB，挂载到 /data）
>  服务：MySQL、Java（Spring Boot）、Nginx、Redis（如有）

------

# 1. 🔧 EC2 基础信息（Instance Overview）

### **1.1 实例信息**

- Instance ID: *i-00ac4af8bbc71baff*
- Instance Type: *t2.medium*
- OS: Amazon Linux 2023
- Region: *us-east-1*
- Availability Zone: *us-east-1f*

### **1.2 EBS 磁盘布局**

| 设备名               | Volume ID             | 大小 | 用途   | 挂载点 |
| -------------------- | --------------------- | ---- | ------ | ------ |
| /dev/xvda            | vol-01f66618cf024761c | 16GB | 系统盘 | /      |
| /dev/xvdb (/dev/sdb) | vol-0252c068afcfebcdb | 20GB | 数据盘 | /data  |

### **1.3 当前挂载情况（fstab 已预配置）**

```
UUID=xxxx   /           xfs    defaults,noatime        1   1
UUID=xxxx   /boot/efi   vfat   defaults,noatime,...    0   2
/dev/xvdb   /data       ext4   defaults,nofail         0   2
```

📌 **此配置稳定、安全、可自动挂载。**

------

# 2. 🚀 EC2 重启后运维流程（重要）

> 以下流程适用于执行 `sudo reboot` 或 AWS 控制台执行 Reboot 后。

## **2.1 磁盘检查**

```
lsblk
df -h
```

确认：

- `/dev/xvda1` → `/`
- `/dev/xvdb` → `/data`

如 `/data` 未挂载：

```
sudo mount /data
```

------

## **2.2 启动 MySQL**

```
sudo systemctl start mysqld
sudo systemctl status mysqld
```

验证端口：

```
sudo netstat -tulnp | grep 3306
```

------

## **2.5 启动 Redis（如有）**

```
sudo systemctl start redis
sudo systemctl status redis
```



## **2.3 启动 Java 服务**

进入应用目录：

```
cd /home/ec2-user/app
```

后台运行：

```
nohup java -jar your-app.jar --spring.profiles.active=prod > app.log 2>&1 &
```

检查：

```
curl http://localhost:8080/actuator/health
```

------

## **2.4 启动 Nginx（如有）**

```
sudo systemctl start nginx
sudo systemctl status nginx
```

检查前端：

```
curl -I http://localhost
```

------



# 3. 📡 网络与安全运维

## **3.1 Elastic IP（EIP）检查**

在 AWS Console → Networking → Elastic IPs
 确认 EIP 已绑定到当前 EC2 实例。

## **3.2 安全组（Security Group）检查**

典型开放端口：

| 端口 | 用途                          |
| ---- | ----------------------------- |
| 22   | SSH                           |
| 80   | HTTP                          |
| 443  | HTTPS                         |
| 8080 | Java 服务（如直接暴露）       |
| 3306 | MySQL（强烈建议不对公网开放） |
| 6379 | Redis（不可对公网开放）       |

------

# 4. 💽 数据与存储运维

## **4.1 EBS 扩容流程（不重启）**

若 /data 空间不足：

1. 控制台修改 Volume 大小（例如 20G → 50G）
2. 执行：

```
sudo growpart /dev/xvdb 1
sudo resize2fs /dev/xvdb
```

------

## **4.2 MySQL 数据备份**

### 方式1：自动 Dump

```
mysqldump -u root -p --all-databases > /data/backup/all_$(date +%F).sql
```

### 方式2：快照 Snapshot（推荐）

Console → EBS → Create Snapshot
 可用于恢复整个数据盘。

------

## **4.3 恢复 Snapshot 到新 EC2**

1. 从 Snapshot 创建新 Volume
2. Attach 到新实例
3. 挂载后即可直接访问 `/data` 内容

------

# 5. 🌡 系统监控（建议每周查看）

## **5.1 监控 CPU / 内存**

```
top
htop
free -h
```

## **5.2 磁盘空间**

```
df -h
du -sh /data/*
```

## **5.3 查看异常日志**

- Java 日志：`/home/ec2-user/app/app.log`
- 系统日志：`/var/log/messages`
- Nginx：`/var/log/nginx/error.log`
- MySQL：`/var/log/mysqld.log`

------

# 6. 🛡 安全运维

## **6.1 禁止 root 远程登录**

`/etc/ssh/sshd_config`：

```
PermitRootLogin no
```

## **6.2 禁止密码登录，启用密钥**

```
PasswordAuthentication no
```

## **6.3 防止 Redis、MySQL 对公网开放**

安全组只允许：

- MySQL 3306 → 仅 VPC 内
- Redis 6379 → 仅 VPC 内

------

# 7. 🔁 定时任务（Cron）

查看：

```
crontab -l
```

常用示例：

```
0 3 * * * /usr/bin/mysqldump > /data/backup/db_$(date +\%F).sql
```

------

# 8. 🧯 故障排查指南（Troubleshooting）

## **8.1 Java 无法启动**

```
tail -f app.log
```

## **8.2 MySQL 不能连接**

```
systemctl status mysqld
sudo ss -tulnp | grep 3306
```

## **8.3 数据盘未挂载**

```
sudo mount /data
lsblk
```

## **8.4 磁盘读写变慢**

可能需要修改 EBS IOPS 或升级实例：

- t2.medium → t3.medium / m5.large

------

# 9. 📦 自动化脚本（可选）

如果你希望，我可以生成一套：

### **EC2 启动自愈脚本（自动挂载 + 启动 MySQL + Java + 健康检查）**

放入：

```
/usr/local/bin/startup.sh
```

再加 systemd + service 单元
 即可做到 **自动恢复、自动运行**。

你只需说一句：“生成脚本”。

------

# 10. ✔ 最终 Checklist（适合贴到 Notion 顶部）

-  EC2 状态正常
-  /data 已挂载
-  MySQL 启动正常
-  Java 服务启动正常
-  Nginx / Redis （如有）
-  EIP 已绑定
-  安全组未暴露敏感端口
-  日志无错误
-  每日自动备份正常
-  每周检查磁盘空间
-  Snapshot 每周一次