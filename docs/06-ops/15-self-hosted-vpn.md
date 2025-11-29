# 🎯 目标

使用 **Amazon Linux（运行 Java 服务 + 已有 Nginx 反向代理）** 的 EC2 搭建 **Xray（VLESS+WS+TLS）VPN**，供 **ClashX Pro** 使用。

**不会破坏你的现有 Java 服务，也不会改变你的域名结构。**

我们利用 **Nginx 分流**——将 `/v` 路径交给 Xray，其他路径继续交给 Java 服务。

------

# 🚀 一、服务器端（Amazon Linux）配置步骤

以下操作全部在 EC2 上执行。

------

# 1. 安装 Xray（不占用 443）

Amazon Linux 使用 bash 脚本安装：

```
bash <(curl -Ls https://raw.githubusercontent.com/XTLS/Xray-install/main/install-release.sh)
```

成功后文件位置：

```
/usr/local/bin/xray
/etc/xray/config.json
```

------

# 2. 创建 Xray 配置（监听本地 10000 端口）

编辑：

```
sudo nano /etc/xray/config.json
```

内容如下（**可直接复制**）：

```
{
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 10000,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "b1761af8-927d-4537-9423-57bae7366ea3",
            "email": "wristo"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/v"
        }
      }
    }
  ],
  "outbounds": [
    { "protocol": "freedom" }
  ]
}
```

UUID 可替换，我这里已经给你自动生成。

------

# 3. 启动 Xray 服务

```
sudo systemctl daemon-reload
sudo systemctl restart xray
sudo systemctl enable xray
```

检查运行状态：

```
sudo systemctl status xray
```

------

# 4. Nginx 反向代理分流（核心）

你的服务器已有 Java 后端 + HTTPS，443 已被 Nginx 占用。

我们只需要在你的 Nginx server 中加入一个 `/v` 路径即可。

编辑：

```
sudo nano /etc/nginx/nginx.conf
```

在你的 HTTPS server 块里加入：

```
location /v {
    proxy_redirect off;
    proxy_pass http://127.0.0.1:10000;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
}
```

示例完整结构：

```
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name api.wristo.io;

    ssl_certificate /etc/pki/tls/certs/wristo/fullchain.pem;
    ssl_certificate_key /etc/pki/tls/certs/wristo/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    access_log /var/log/nginx/wristo-access.log;
    error_log /var/log/nginx/wristo-error.log;

    # === Java 后端 API 原有逻辑 ===
    location /api {
        proxy_pass http://localhost:8088;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
    }

    # === Xray WS 分流（新增） ===
    location /v {
        proxy_redirect off;
        proxy_pass http://127.0.0.1:10000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}

```

------

# 5. 重启 Nginx

```
sudo nginx -t
sudo systemctl reload nginx
```

### 5.1. 测试 Xray 分流是否成功

执行：

```
curl -I https://api.wristo.io/v
```

**✔️ 正常结果（任意以下皆可）**

```
HTTP/2 404
```

或

```
HTTP/2 403
```

或空白回复。

这意味着：
 **Nginx → WS → Xray 内部 10000 分流成功**。

**❌ 异常结果（需要我帮你修）**

- 502
- 500
- connection refused
- 超时（timeout）

------

# 🎉 到这里：服务器端已全部完成

你已经具备：

- 隐蔽的 WS+TLS 加密通道
- 不影响现有 Java 服务
- Nginx 自动分流
- Xray 稳定运行

# 🔥 二、客户端（ClashX Pro）配置步骤

你只需要导入下面提供的 Clash 配置文件。

------

# 1. 创建文件 wris-vpn.yaml

内容如下（**已完全可用**）：

```
port: 7890
socks-port: 7891
allow-lan: true
mode: Rule
log-level: info

dns:
  enable: true
  ipv6: false
  use-system-hosts: true
  listen: :1053
  nameserver:
    - 1.1.1.1
    - 8.8.8.8

proxies:
  - name: Wristo-EC2-VLESS
    type: vless
    server: api.wristo.io
    port: 443
    uuid: b1761af8-927d-4537-9423-57bae7366ea3
    network: ws
    tls: true
    servername: api.wristo.io
    skip-cert-verify: false
    udp: true
    ws-opts:
      path: "/v"
      headers:
        Host: api.wristo.io

proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - Wristo-EC2-VLESS
      - DIRECT

rules:
  - GEOIP,CN,DIRECT
  - MATCH,Proxy

```

------

# 2. 在 ClashX Pro 导入配置

ClashX Pro → 配置 → **从文件导入**
 选择 `wris-vpn.yaml`

------

# 3. 开启代理

- 选择配置 → 启用
- 模式选择：Rule 或 Global
- 节点选择：Wristo-EC2-VLESS

即可开始翻墙。

------

# 🎯 三、验证实际是否翻墙成功

1. 打开浏览器访问：
    `https://www.google.com`
2. ClashX Pro → 连接信息
    看到大量连接走 **Wristo-EC2-VLESS** 说明成功。

