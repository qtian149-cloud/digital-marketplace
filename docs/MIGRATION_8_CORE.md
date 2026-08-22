# Migration To 8 Core Server

迁移目标：从 1 核开发服务器迁移到 8 核 / 8GB / 80GB SSD 正式服务器，不能要求重新开发。

## 迁移内容

- Git 仓库代码
- `.env.production`
- MySQL 数据备份
- `backend/storage`
- Nginx 配置
- Docker Compose 配置
- Cron / Scheduler
- Queue worker
- SSL 证书

## 数据库备份

```bash
docker compose exec mysql mysqldump -uroot -p digital_marketplace > backup.sql
```

## 数据库恢复

```bash
cat backup.sql | docker compose exec -T mysql mysql -uroot -p digital_marketplace
```

## 正式环境检查

- `APP_ENV=production`
- `APP_DEBUG=false`
- 正式支付 Key 仅配置在 `.env.production`
- 正式 AI Key 仅配置在 `.env.production`
- DNS 指向正式服务器
- SSL 已签发
- Laravel config / route / view cache 已启用
- 日志轮转已启用
- 队列和定时任务已启动
