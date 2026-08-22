<template>
  <div class="dashboard-layout">
    <aside class="dashboard-menu">
      <span class="active">控制台</span>
      <span>用户管理</span>
      <span>卖家管理</span>
      <span>商品管理</span>
      <span>订单管理</span>
      <span>财务管理</span>
      <span>提现管理</span>
      <span>风控管理</span>
      <span>权限管理</span>
    </aside>

    <div class="page-grid">
      <section class="section-head">
        <div>
          <h2>管理后台</h2>
          <p class="muted">数据总览 / 欢迎回来</p>
        </div>
        <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </section>

      <section class="stat-grid">
        <el-card v-for="item in stats" :key="item.label" class="metric-card" shadow="never">
          <span class="muted">{{ item.label }}</span>
          <div class="metric-value">{{ item.value }}</div>
        </el-card>
      </section>

      <section class="admin-grid">
        <el-card class="panel-card" shadow="never">
          <h3>订单统计（近7天）</h3>
          <div class="seller-chart">
            <span v-for="height in bars" :key="height" :style="{ height: `${height}px` }"></span>
          </div>
        </el-card>
        <el-card class="panel-card" shadow="never">
          <h3>订单状态分布</h3>
          <div class="donut">
            <strong>2,566</strong>
            <span>订单总数</span>
          </div>
        </el-card>
      </section>

      <section class="table-card">
        <table class="mini-table">
          <tbody>
            <tr v-for="notice in notices" :key="notice.text">
              <td><el-tag size="small">{{ notice.type }}</el-tag></td>
              <td>{{ notice.text }}</td>
              <td class="muted">{{ notice.time }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { label: '今日订单', value: '2,566' },
  { label: '今日交易额', value: '¥128,560.00' },
  { label: '今日新增用户', value: '1,256' },
  { label: '平台总收入', value: '¥256,890.50' },
  { label: '风险事件', value: '9' },
]

const bars = [80, 126, 98, 145, 112, 132, 90, 108, 139, 156, 166, 188]

const notices = [
  { type: '卖家', text: '优质账号店铺 申请成为卖家', time: '2024-05-20 14:30' },
  { type: '审核', text: 'Facebook 账号（高质量）需要审核', time: '2024-05-20 14:28' },
  { type: '提现', text: '用户 user_001 申请提现 ¥1000', time: '2024-05-20 14:25' },
]
</script>
