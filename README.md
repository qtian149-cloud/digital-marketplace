# Digital Marketplace

数字商品交易平台 V1.0。项目按 `AGENTS.md` 和 `TASKS.md` 的约束开发：Vue 3 + TypeScript + Element Plus 前端，Laravel + Sanctum 后端，MySQL + Redis 数据层，Docker / Nginx 部署。

## 当前阶段

P0 项目初始化骨架：

- `frontend/`：Vue 3 / Vite / Element Plus / Pinia / Router / Axios
- `backend/`：Laravel 应用骨架、Sanctum 依赖、统一 API 响应、`/api/health`
- `deploy/`：Docker Compose、Nginx、PHP-FPM、Node、MySQL、Redis 配置
- `docs/`：开发部署和迁移文档起点

开发阶段只允许测试商品和测试库存，不导入真实商品。

## 本地启动

```bash
cp .env.example .env
docker compose up -d --build
```

后端依赖和初始化：

```bash
docker compose exec backend composer install
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate
```

健康检查：

```bash
curl http://localhost/
curl http://localhost/api/health
```
