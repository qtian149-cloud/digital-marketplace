# DEV Deployment

本文档用于 1 核 Ubuntu 24.04 开发服务器部署。生产密码、支付密钥、AI Key、TG Token 不写入仓库。

## 服务器

- 系统：Ubuntu 24.04
- 域名：chuhai6.com
- SSH：使用用户提供的端口登录
- 资源：1 核开发环境，完成后迁移到 8 核正式服务器

首次登录后建议立刻做两件事：

```bash
passwd
apt update && apt upgrade -y
```

## 基础依赖

```bash
apt install -y ca-certificates curl git ufw
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 2-4GB Swap

1 核服务器建议先开 2GB Swap，构建依赖时更稳。

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

## 项目启动

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec backend composer install
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate
```

健康检查：

```bash
curl http://127.0.0.1/
curl http://127.0.0.1/api/health
```

## 防火墙

将 SSH 端口替换为实际端口：

```bash
ufw allow 39001/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

## 开发阶段注意

- 不导入真实商品
- 不提交 `.env`
- 不提交密钥
- Queue worker 数量保持少量
- MySQL、Redis 已按低资源环境设置内存限制
