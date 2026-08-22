<?php

namespace App\Http\Controllers\Api;

use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Throwable;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $checks = [
            'app' => true,
            'database' => $this->databaseIsReady(),
            'redis' => $this->redisIsReady(),
        ];

        $ok = ! in_array(false, $checks, true);

        return ApiResponse::success([
            'status' => $ok ? 'ok' : 'degraded',
            'checks' => $checks,
            'environment' => app()->environment(),
        ], $ok ? 200 : 503);
    }

    private function databaseIsReady(): bool
    {
        try {
            DB::connection()->getPdo();

            return true;
        } catch (Throwable) {
            return false;
        }
    }

    private function redisIsReady(): bool
    {
        try {
            return (string) Redis::connection()->ping() !== '';
        } catch (Throwable) {
            return false;
        }
    }
}
