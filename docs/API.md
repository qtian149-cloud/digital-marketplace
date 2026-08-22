# API

所有接口默认返回统一结构。

成功：

```json
{
  "success": true,
  "message": "success",
  "data": {}
}
```

失败：

```json
{
  "success": false,
  "message": "error message",
  "errors": {}
}
```

## Health

```http
GET /api/health
```

返回应用、数据库、Redis 的健康状态。
