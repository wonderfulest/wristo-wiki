# EC2 开通



## 选区



根据客户地区选择合适的机房



## 连接机器

推荐使用 ssh

## 配置连接超时



```
sudo -i                                                                                       
vim /etc/profile  
# 在文件下方添加下面配置
# set 6000 seconds (or 100 minutes) session out
export TMOUT=6000
```







# aws安装redis

sudo dnf install -y redis6
sudo systemctl start redis6
sudo systemctl status redis6
sudo systemctl enable redis6
sudo systemctl is-enabled redis6
redis6-server --version
redis6-cli ping







# 当前定时任务

```shell
# 每天0点\8点\16点刷新购买数
0 0,8,16 * * * current_date=$(date +"%Y%m%d"); python3 /app/tools/market/update_purchase_count.py >> "/app/logs/download_crontab_${current_date}.log" 2>&1 

# 每天0点\12点10分部署官网
10 0,12 * * * current_date=$(date +"%Y%m%d"); curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_7Vq1F8NVQLEkzhQKyinUk7a3Q4qa/ScijXDqupJ?buildCache=false >> "/app/logs/store_front_crontab_${current_date}.log" 2>&1 
```

日志路径

```
/app/logs/*_crontab*
```

首先检查 crontab 服务是否运行

```
systemctl status crond
```

如果没有启动，先 enable 它再 start 它

```
systemctl enable crond
systemctl start crond
```

编辑计划任务

```
crontab -e
```

编辑完，需要 reload

```
systemctl reload crond            
```

输入下面的表达式（每天 00:00:00），让他每天都尝试一次关闭 Nginx->更新->启动 Nginx，到了最后 30 天的时候就会成功。

```
0 0 * * * "service nginx stop ; /bin/certbot renew --renew-by-default; service nginx start"
```