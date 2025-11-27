当EC2实例重启时，磁盘需要自动挂载，然后启动数据库。

## **在 /etc/fstab 中启用磁盘自动挂载 + 加上 nofail**

### 1. 查看你的数据盘设备（例子）

```
lsblk -f
```

假设你的数据盘是 `/dev/xvdb`



```
lsblk -f                                                                                 
NAME      FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS                        
xvda                                                                                                                
├─xvda1   xfs          /     1d710364-8204-4eaa-a51c-4ef0c0aff5a4    6.9G    57% /                                  
├─xvda127                                                                                                           
└─xvda128 vfat   FAT16       C883-7C08                               8.7M    13% /boot/efi                          
xvdb      ext4   1.0         a3d50fa6-c5b4-49f3-928c-14511f5c6ede   14.8G    19% /data      
```

### 2. 编辑 `/etc/fstab`

```
sudo vim /etc/fstab
```

添加类似内容（根据你的文件系统类型调整）：

```
/dev/xvdb   /data   xfs   defaults,nofail   0  2
```

如果是 ext4(我的磁盘是ext4)：

```
/dev/xvdb   /data   ext4  defaults,nofail   0  2
```

保存后让系统测试：

```
sudo mount -a
```





# 让 MySQL 强制依赖 /data 挂载后再启动

执行：

```
sudo systemctl edit mysqld
```

输入以下内容（完全复制）：

```
[Unit]
After=data.mount
Requires=data.mount
```

保存退出。

然后刷新 systemd：

```
sudo systemctl daemon-reload
```





# 重新启动 MySQL 检查是否正常

```
sudo systemctl restart mysqld
sudo systemctl status mysqld
```

检查 datadir：

```
mysql -uroot -p -e "SHOW VARIABLES LIKE 'datadir';"
```

应该显示：

```
/data/mysql/
```
