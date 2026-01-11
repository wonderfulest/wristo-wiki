# MySQL只有主节点安装

# 第一次启动就用 `/data/mysql`（标准流程）

## 1️⃣ 安装 MySQL（但**不要启动**）

```
# --------------------------------------------------
# 4️⃣ MySQL 8.4 LTS
# --------------------------------------------------
echo ">>> Installing MySQL 8.4 LTS..."
dnf install -y https://repo.mysql.com/mysql84-community-release-el9-1.noarch.rpm
dnf install -y mysql-community-server
```

⚠️ **此时不要执行 `systemctl start mysqld`**

------

## 2️⃣ 创建目标数据目录

```
mkdir -p /data/mysql
chown mysql:mysql /data/mysql
chmod 750 /data/mysql
```

------

## 3️⃣ 预先写好 MySQL 配置（关键步骤）

编辑配置文件：

```
vi /etc/my.cnf
```

**完整示例（推荐直接用）**：

```
[mysqld]
datadir=/data/mysql
socket=/data/mysql/mysql.sock

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

symbolic-links=0
character-set-server=utf8mb4
collation-server=utf8mb4_0900_ai_ci


[client]
socket=/data/mysql/mysql.sock

```

> ⚠️ `datadir` 和 `socket` **必须同时改**

------

## 4️⃣ 处理 SELinux（Amazon Linux 2023 必做）

### ① 安装工具（如果没有）

```
dnf install -y policycoreutils-python-utils
```

### ② 设置 MySQL 数据目录上下文

```
semanage fcontext -a -t mysqld_db_t "/data/mysql(/.*)?"
restorecon -Rv /data/mysql
```

验证：

```
ls -Zd /data/mysql
# 应该看到 mysqld_db_t
```

------

## 5️⃣ 初始化 MySQL 数据目录（第一次初始化）

⚠️ **这是和“迁移方案”最大的区别**

```
mysqld --initialize --user=mysql --datadir=/data/mysql
```

执行成功后：

- `/data/mysql` 里会生成 ibdata / ib_logfile 等文件
- `/var/log/mysqld.log` 会写入 **root 临时密码**

查看密码：

```
grep 'temporary password' /var/log/mysqld.log

UmT,tF(sF9aq
```

------

## 6️⃣ 启动 MySQL（第一次真正启动）

```
systemctl enable mysqld
systemctl start mysqld
```

------

## 7️⃣ 验证是否完全成功（必须做）

### ① 服务状态

```
systemctl status mysqld
```

必须是：

```
Active: active (running)
```

------

### ② 登录并确认 datadir

```
mysql -u root -p
SHOW VARIABLES LIKE 'datadir';
```

结果必须是：

```
/data/mysql/
```

------

# 三、第一次登录后必做（生产必做）

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Ydw9181311@';
```

或：

```
mysql_secure_installation
```

------

创建业务用户

```
CREATE USER 'wristo_app'@'%' IDENTIFIED BY 'Ydw9181311@';

# 授权最小业务权限
GRANT
  SELECT,
  INSERT,
  UPDATE,
  DELETE,
  CREATE,
  ALTER,
  INDEX
ON wristo.*
TO 'wristo_app'@'%';
```

刷新权限（8.x 非必须，但可显式）

```
FLUSH PRIVILEGES;
```

# 一键清理MySQL脚本

```
systemctl stop mysqld || true
systemctl disable mysqld || true

dnf remove -y \
  mysql-community-server \
  mysql-community-client \
  mysql-community-client-plugins \
  mysql-community-common \
  mysql-community-libs \
  mysql-community-icu-data-files || true

rm -rf /var/lib/mysql
rm -rf /var/log/mysqld.log
rm -rf /var/run/mysqld
rm -rf /etc/my.cnf
rm -rf /etc/my.cnf.d

rm -rf /data/mysql

dnf remove -y mysql84-community-release || true
rm -f /etc/yum.repos.d/mysql*.repo

dnf clean all

```

