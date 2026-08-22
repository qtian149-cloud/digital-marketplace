<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_health_endpoint_returns_consistent_shape(): void
    {
        $response = $this->getJson('/api/health');

        $response->assertStatus(503)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'status',
                    'checks' => ['app', 'database', 'redis'],
                    'environment',
                ],
            ]);
    }
}
