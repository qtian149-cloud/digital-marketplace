<template>
  <div class="dashboard-layout">
    <aside class="dashboard-menu">
      <span class="active">数据概览</span>
      <span>商品管理</span>
      <span>库存管理</span>
      <span>订单管理</span>
      <span>收入统计</span>
      <span>提现管理</span>
      <span>店铺设置</span>
    </aside>

    <div class="page-grid">
      <section class="section-head">
        <div>
          <h2>卖家中心</h2>
          <p class="muted">优质账号店铺 / 认证卖家</p>
        </div>
        <el-button type="primary">发布测试商品</el-button>
      </section>

      <section class="stat-grid">
        <el-card v-for="item in stats" :key="item.label" class="metric-card" shadow="never">
          <span class="muted">{{ item.label }}</span>
          <div class="metric-value">{{ item.value }}</div>
        </el-card>
      </section>

      <el-card class="panel-card" shadow="never">
        <div class="section-head">
          <h3>订单统计</h3>
          <el-segmented v-model="range" :options="['今日', '近7天', '近30天']" />
        </div>
        <div class="seller-chart">
          <span v-for="height in bars" :key="height" :style="{ height: `${height}px` }"></span>
        </div>
      </el-card>

      <section class="table-card">
        <table class="mini-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>商品</th>
              <th>买家</th>
              <th>金额</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.no">
              <td>{{ order.no }}</td>
              <td>{{ order.product }}</td>
              <td>{{ order.user }}</td>
              <td>{{ order.amount }}</td>
              <td><el-tag type="success" size="small">已完成</el-tag></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const range = ref('近7天')

const stats = [
  { label: '今日订单', value: '1,258.80' },
  { label: '今日收入', value: '¥856.20' },
  { label: '商品总数', value: '256 / 500' },
  { label: '库存数量', value: '3,256' },
  { label: '保证金', value: '¥5,000' },
]

const bars = [68, 92, 84, 110, 76, 96, 126, 88, 74, 103, 118, 94]

const orders = [
  { no: '202405200001', product: 'Facebook 账号（高质量）', user: 'user_001', amount: '¥8.90' },
  { no: '202405200002', product: 'Instagram 账号（老号）', user: 'user_002', amount: '¥12.50' },
  { no: '202405200003', product: 'Twitter/X 账号（可更换）', user: 'user_003', amount: '¥6.50' },
]
</script>
