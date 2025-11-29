# https证书申请

下一次到期日：This certificate expires on 2026-02-14.

## 生成证书

```
sudo certbot certonly -d "*.wristo.io" --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

上面的命令执行完，会阻塞，这时，需要在 AWS 的 Route 53中增加DNS TXT record

```
Please deploy a DNS TXT record under the name:

_acme-challenge.wristo.io.

with the following value:

-tOIFfb_0-Lc92TUfK45e82YBtmNx-Hc58mqdw3jVcc

Before continuing, verify the TXT record has been deployed. Depending on the DNS
provider, this may take some time, from a few seconds to multiple minutes. You can
check if it has finished deploying with aid of online tools, such as the Google
Admin Toolbox: https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.wristo.io.
Look for one or more bolded line(s) below the line ';ANSWER'. It should show the
value(s) you've just added.
```

等待几秒后，enter继续，提示证书生成成功，目录和有效期如下：

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/wristo.io/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/wristo.io/privkey.pem
This certificate expires on 2026-02-14.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically. Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook) but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

## 证书上传服务器

注意上面的路径只有root权限可以访问，将 wristo.io 的所有证书拷贝到 home 路径

```
cd ${HOME}
sudo cp -rf /etc/letsencrypt/live/ .  
# 修改私钥文件权限
sudo chmod 644 wristo.io/*
```

上传服务器

```
scp -i Documents/us-east-1.pem wristo.io/* ec2-user@ec2-3-236-120-5.compute-1.amazonaws.com:~

# 将上面的文件拷贝到 /etc/pki/tls/certs/ 路径下
ssh -i ~/Documents/us-east-1.pem ec2-user@ec2-3-236-120-5.compute-1.amazonaws.com     
sudo -i
cp /home/ec2-user/*.pem /etc/pki/tls/certs/wristo/
```

## Nginx配置https证书

```
pwd
/etc/nginx/conf.d
[root@ip-172-31-79-140 conf.d]# cat api-wristo-io-https.conf
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name api.wristo.io;

    # certs sent to the client in SERVER HELLO are concatenated in ssl_certificate
    ssl_certificate /etc/pki/tls/certs/wristo/fullchain.pem;
    ssl_certificate_key /etc/pki/tls/certs/wristo/privkey.pem;
}
```

重启 nginx

```
systemctl restart nginx
或者重新加载配置
systemctl reload nginx
```

# 参考文档

- https://zhuanlan.zhihu.com/p/611507373

- https://www.frankfeekr.cn/2021/03/28/let-is-encrypt-cerbot-for-https/index.html

# Wristo.io https 证书申请总结

```
sudo certbot certonly -d "*.wristo.io" --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory

cd ${HOME}
sudo cp -rf /etc/letsencrypt/live/ .  
# 修改私钥文件权限
sudo chmod 644 wristo.io/*

scp -i ~/Documents/us-east-1.pem wristo.io/* ec2-user@ec2-3-236-120-5.compute-1.amazonaws.com:~

ssh -i ~/Documents/us-east-1.pem ec2-user@ec2-3-236-120-5.compute-1.amazonaws.com

cp /home/ec2-user/*.pem /etc/pki/tls/certs/wristo/

systemctl reload nginx
# 或 nginx -s reload
```
