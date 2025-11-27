

# systemctl管理MySQL5.7版本

```
(base) [root@ip-172-31-6-223 mysql]# systemctl restart mysqld.service
(base) [root@ip-172-31-6-223 mysql]# systemctl stop mysqld.service
(base) [root@ip-172-31-6-223 mysql]# systemctl start mysqld.service   
```

# 安装MySQL 8.4 on Amazon Linux 2023



通过 Yum仓库安装

https://www.youtube.com/watch?v=htdJUGE1cEQ



mysql官方下载地址为：

https://dev.mysql.com/downloads/mysql/



下载 mysql yum源

https://dev.mysql.com/downloads/repo/yum/

选择源地址进行 wget下载

```
wget https://dev.mysql.com/get/mysql84-community-release-el9-1.noarch.rpm
```



```
sudo dnf install mysql84-community-release-el9-1.noarch.rpm
sudo dnf install mysql-community-server
# 启动mysql服务
sudo systemctl status mysqld.service   
sudo systemctl start mysqld.service   

# 查看临时密码
sudo grep 'temporary password' /var/log/mysqld.log
2025-04-05T06:19:57.241004Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: +4y*q/Qgqir:


```



# 修改数据库存储数据路径到挂载的磁盘上





# 用户创建和维护



root账号登录，进行用户管理。

修改root用户密码

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Ydw9181311@';
```

删除用户

```
DROP USER 'user_remote'@'%';                  
```



创建用户

```
CREATE USER 'user_remote'@'%' IDENTIFIED BY 'Ydw9181311@';               
```

授权用户

```
GRANT ALL PRIVILEGES ON *.* TO 'user_remote'@'%';
```

刷新权限

```
FLUSH PRIVILEGES;
```



# 卸载旧版本



```
sudo systemctl stop mysqld

sudo yum remove mysql mysql-server
```



# 参考文档地址

- https://www.modb.pro/db/1787599262368468992