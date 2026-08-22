#!/usr/bin/env bash
set -euo pipefail

docker compose ps
docker compose exec backend composer validate
docker compose exec backend php artisan test
curl -fsS http://127.0.0.1/
curl -fsS http://127.0.0.1/api/health
