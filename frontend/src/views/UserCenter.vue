<template>
  <div class="dashboard-layout">
    <aside class="dashboard-menu">
      <span class="active">控制台</span>
      <span>我的订单</span>
      <span>我的资产</span>
      <span>充值记录</span>
      <span>提现记录</span>
      <span>我的收藏</span>
      <span>优惠券</span>
      <span>消息中心</span>
    </aside>

    <div class="page-grid">
      <section class="section-head">
        <div>
          <h2>用户中心</h2>
          <p class="muted">jumokeji1122 / 普通用户</p>
        </div>
        <el-button type="primary">充值</el-button>
      </section>

      <section class="stat-grid">
        <el-card v-for="item in stats" :key="item.label" class="metric-card" shadow="never">
          <span class="muted">{{ item.label }}</span>
          <div class="metric-value">{{ item.value }}</div>
        </el-card>
      </section>

      <section class="table-card">
        <table class="mini-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>商品</th>
              <th>状态</th>
              <th>金额</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.no">
              <td>{{ order.no }}</td>
              <td>{{ order.product }}</td>
              <td><el-tag type="success" size="small">已完成</el-tag></td>
              <td>{{ order.amount }}</td>
              <td>{{ order.time }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="card-grid">
        <el-card v-for="item in quickActions" :key="item" shadow="never">{{ item }}</el-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { label: '可用余额', value: '¥0.49' },
  { label: '我的订单', value: '182' },
  { label: '收藏商品', value: '128' },
  { label: '优惠券', value: '88' },
  { label: '消息数', value: '12' },
]

const orders = [
  { no: '202405200001', product: 'Facebook 账号（高质量）', amount: '¥8.90', time: '2024-05-20 14:30' },
  { no: '202405200002', product: 'Instagram 账号（老号）', amount: '¥12.50', time: '2024-05-20 14:25' },
  { no: '202405200003', product: 'Twitter/X 账号（可更换）', amount: '¥6.50', time: '2024-05-20 14:20' },
]

const quickActions = ['充值', '提现', '优惠券', '收藏', '消息', '售后']
</script>
