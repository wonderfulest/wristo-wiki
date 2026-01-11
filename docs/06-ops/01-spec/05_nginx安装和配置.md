# 安装

```
# --------------------------------------------------
# 8️⃣ Nginx 1.26.x (Official)
# --------------------------------------------------
echo ">>> Installing Nginx..."

cat >/etc/yum.repos.d/nginx.repo <<'EOF'
[nginx-stable]
name=nginx stable repo
baseurl=https://nginx.org/packages/mainline/amzn/2023/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF

dnf install -y nginx

systemctl enable nginx
systemctl start nginx

nginx -v
```

# 配置

依次配置下面的文件：

- [ ] /etc/nginx/nginx.conf 
- [ ] /etc/nginx/blacklist.conf
- [ ] /etc/nginx/conf.d/api-wristo-io-https.conf
- [ ] /etc/nginx/conf.d/api-wristo-io.conf
- [ ] /etc/pki/tls/certs/wristo/fullchain.pem
- [ ] /etc/pki/tls/certs/wristo/privkey.pem

# 启动服务

```
nginx -t
systemctl restart nginx
systemctl status nginx
```

