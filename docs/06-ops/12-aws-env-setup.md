

# AWS服务器重启IP会重新动态分配，ssh也需要重新分配

# 当前IP: 3-236-120-5

一旦域名变更，需要在

# 反向代理

## apache服务关闭

```
systemctl stop httpd     
systemctl start httpd   
```

## nginx服务关闭

```
systemctl start nginx  
systemctl stop nginx  
```

## web服务启动

```
pm2 list           
```

启动 npm 应用

```
pm2 start npm -- start       
```



# 登录机器



```
ssh -i ~/Documents/aws-secret.pem ec2-user@ec2-54-252-44-182.ap-southeast-2.compute.amazonaws.com
sudo -i
```



# 登录root用户

```
sudo -s
sudo -i
```



# 环境配置

```shell
# CDN
export CLOUDINARY_NAME=dpgpmyswj                                                                                                     
export CLOUDINARY_KEY=546672668453137                                                                                                
export CLOUDINARY_SECRET=lsjEVzRveJC8lSSbu0uBepXdNJs                                                                                 
# 数据库链接
export SQLALCHEMY_DATABASE_URL="mysql+pymysql://user_remote:Ydw9181311%40@localhost:3306/market_analyzer?charset=utf8mb4" 
```



# python包管理

Python 版本：3.10

```
conda create -n py3.10 python=3.10

conda
```

## 版本固定

```
pip freeze > requirements.txt
```

## 冲突检查

```
pip check

pipdeptree
```

​       
