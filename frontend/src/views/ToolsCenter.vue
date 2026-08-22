<template>
  <div class="page-grid">
    <section class="section-head">
      <div>
        <h2>工具中心 / 全部工具</h2>
        <p class="muted">多种实用工具，助力账号业务效率和增长</p>
      </div>
      <el-button type="primary">申请 API 权限</el-button>
    </section>

    <section class="tool-grid">
      <el-card v-for="tool in tools" :key="tool.name" class="tool-card" shadow="never">
        <div class="tool-logo">{{ tool.logo }}</div>
        <h3>{{ tool.name }}</h3>
        <p class="muted">{{ tool.desc }}</p>
        <div class="module-actions">
          <el-button size="small" type="primary">立即使用</el-button>
        </div>
      </el-card>
    </section>

    <section class="table-card">
      <table class="mini-table">
        <thead>
          <tr>
            <th>工具名称</th>
            <th>使用时间</th>
            <th>消耗</th>
            <th>结果</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in records" :key="row.name">
            <td>{{ row.name }}</td>
            <td>{{ row.time }}</td>
            <td>{{ row.cost }}</td>
            <td><el-tag :type="row.ok ? 'success' : 'danger'" size="small">{{ row.ok ? '正常' : '异常' }}</el-tag></td>
            <td><el-button link type="primary">查看</el-button></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
const tools = [
  { logo: 'FB', name: 'Facebook 检测', desc: '检测账号状态、好友数' },
  { logo: 'X', name: 'Twitter/X 检测', desc: '检测账号状态、好友数' },
  { logo: 'TT', name: 'TikTok 检测', desc: '检测账号状态、权益状态' },
  { logo: 'IG', name: 'Instagram 检测', desc: '检测账号状态、好友数' },
  { logo: '2F', name: '2FA 生成', desc: '生成动态两步验证码' },
  { logo: 'GM', name: 'Gmail 检测', desc: '检测账号状态、好友数' },
  { logo: 'HT', name: 'Hotmail 邮箱工具', desc: '邮箱检测与管理工具' },
  { logo: 'CK', name: 'Cookie 工具箱', desc: 'Cookie 检测与分析' },
]

const records = [
  { name: 'Facebook 检测', time: '2024-05-20 14:30:22', cost: '¥1.00', ok: true },
  { name: 'Twitter/X 检测', time: '2024-05-20 14:28:15', cost: '¥1.00', ok: false },
  { name: '2FA 生成', time: '2024-05-20 14:20:05', cost: '免费', ok: true },
]
</script>
