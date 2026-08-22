<template>
  <div class="console-layout dujiao-admin">
    <aside class="console-sidebar">
      <router-link class="console-brand" to="/admin">
        <span class="brand-mark">S</span>
        <span>
          <strong>数贸后台</strong>
          <small>Digital Admin</small>
        </span>
      </router-link>
      <a class="admin-menu-root active" href="#" @click.prevent="activeSection = 'overview'">管理后台</a>
      <a
        v-for="item in adminMenus"
        :key="item.key"
        href="#"
        class="admin-menu-item"
        :class="{ active: activeSection === item.key }"
        @click.prevent="activeSection = item.key"
      >
        {{ item.label }}
      </a>
    </aside>

    <div class="console-content">
      <header class="console-topbar">
        <div>
          <h2>{{ currentMenu.label }}</h2>
          <p class="muted">管理后台 / {{ currentMenu.description }}</p>
        </div>
        <div class="console-actions">
          <router-link to="/seller">卖家中心</router-link>
          <router-link to="/">返回前台</router-link>
          <span class="admin-user-badge">admin</span>
          <button class="el-button" @click="logout">退出</button>
        </div>
      </header>

      <div class="page-grid">
      <section class="section-head">
        <div>
          <h2>{{ currentMenu.label }}</h2>
          <p class="muted">当前位置：管理后台 / {{ currentMenu.label }}</p>
        </div>
        <el-date-picker v-if="activeSection === 'overview'" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
        <el-button v-else type="primary">{{ currentMenu.action }}</el-button>
      </section>

      <template v-if="activeSection === 'overview'">
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
      </template>

      <template v-else>
      <section class="stat-grid">
        <el-card v-for="item in currentMenu.cards" :key="item.label" class="metric-card" shadow="never">
          <span class="muted">{{ item.label }}</span>
          <div class="metric-value">{{ item.value }}</div>
        </el-card>
      </section>

      <section class="admin-grid">
        <el-card class="panel-card" shadow="never">
          <h3>{{ currentMenu.label }}列表</h3>
          <table class="mini-table">
            <thead>
              <tr>
                <th v-for="column in currentMenu.columns" :key="column">{{ column }}</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in currentMenu.rows" :key="row.id">
                <td v-for="value in row.values" :key="value">{{ value }}</td>
                <td><el-button size="small">查看</el-button></td>
              </tr>
            </tbody>
          </table>
        </el-card>

        <el-card class="panel-card" shadow="never">
          <h3>可执行操作</h3>
          <div class="module-actions">
            <el-button v-for="action in currentMenu.actions" :key="action">
              {{ action }}
            </el-button>
          </div>
        </el-card>
      </section>
      </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeSection = ref('overview')

const logout = () => {
  localStorage.removeItem('dm_console_session')
  router.push('/dj-e0c41416b5a1/login')
}

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

const adminMenus = [
  {
    key: 'overview',
    label: '数据概览',
    description: '平台核心数据 / 订单、资金、风险与通知概览',
    action: '刷新数据',
    cards: stats,
    columns: ['类型', '内容', '时间'],
    rows: notices.map((notice) => ({ id: notice.text, values: [notice.type, notice.text, notice.time] })),
    actions: ['刷新数据', '查看系统通知', '导出运营日报'],
  },
  {
    key: 'users',
    label: '用户管理',
    description: '普通用户账号、余额、订单、通知与风控状态',
    action: '新增用户',
    cards: [
      { label: '用户总数', value: '140,000+' },
      { label: '今日新增', value: '1,256' },
      { label: '冻结用户', value: '18' },
      { label: '余额合计', value: '¥89,260.00' },
      { label: '待处理通知', value: '12' },
    ],
    columns: ['用户', '余额', '订单', '状态'],
    rows: [
      { id: 'user_001', values: ['user_001', '¥120.00', '32', '正常'] },
      { id: 'user_002', values: ['user_002', '¥0.49', '8', '正常'] },
      { id: 'user_003', values: ['user_003', '¥560.00', '19', '观察'] },
    ],
    actions: ['查看资料', '冻结用户', '发送通知', '查看资金流水'],
  },
  {
    key: 'sellers',
    label: '卖家管理',
    description: '卖家申请、店铺资料、保证金、提现与违规记录',
    action: '审核卖家',
    cards: [
      { label: '卖家总数', value: '3,260' },
      { label: '待审核', value: '26' },
      { label: '保证金总额', value: '¥5,680,000' },
      { label: '违规店铺', value: '9' },
      { label: '待通知', value: '7' },
    ],
    columns: ['店铺', '保证金', '状态', '申请时间'],
    rows: [
      { id: 'store_001', values: ['优质账号店铺', '¥5,000', '待审核', '2024-05-20'] },
      { id: 'store_002', values: ['精品数字小店', '¥8,000', '正常', '2024-05-18'] },
      { id: 'store_003', values: ['工具服务店', '¥3,000', '观察', '2024-05-16'] },
    ],
    actions: ['通过审核', '驳回申请', '调整保证金', '查看店铺订单'],
  },
  {
    key: 'products',
    label: '商品管理',
    description: '商品审核、分类、库存批次、上下架与导入记录',
    action: '导入商品',
    cards: [
      { label: '商品总数', value: '50,000+' },
      { label: '待审核', value: '88' },
      { label: '库存批次', value: '1,206' },
      { label: '已下架', value: '320' },
      { label: '导入失败', value: '5' },
    ],
    columns: ['商品', '分类', '库存', '状态'],
    rows: [
      { id: 'product_001', values: ['Facebook 账号（高质量）', '社交媒体账号', '689', '待审核'] },
      { id: 'product_002', values: ['Instagram 账号（老号）', '社交媒体账号', '2.3k', '在售'] },
      { id: 'product_003', values: ['TG 获取验证码', '工具服务', 'API', '在售'] },
    ],
    actions: ['审核商品', '批量上下架', '查看库存', '导入测试商品'],
  },
  {
    key: 'orders',
    label: '订单管理',
    description: '订单状态、支付确认、自动发货、售后与退款',
    action: '导出订单',
    cards: [
      { label: '今日订单', value: '2,566' },
      { label: '待支付', value: '256' },
      { label: '待发货', value: '90' },
      { label: '售后中', value: '18' },
      { label: '退款中', value: '7' },
    ],
    columns: ['订单号', '商品', '金额', '状态'],
    rows: [
      { id: 'order_001', values: ['202405200001', 'Facebook 账号', '¥8.90', '已完成'] },
      { id: 'order_002', values: ['202405200002', 'Instagram 账号', '¥12.50', '待发货'] },
      { id: 'order_003', values: ['202405200003', 'Twitter/X 账号', '¥6.50', '售后中'] },
    ],
    actions: ['查看订单', '重新发货', '处理售后', '同步支付状态'],
  },
  {
    key: 'finance',
    label: '财务管理',
    description: '平台收入、卖家结算、资金流水、佣金与对账',
    action: '导出流水',
    cards: [
      { label: '今日交易额', value: '¥128,560.00' },
      { label: '平台佣金', value: '¥25,712.00' },
      { label: '卖家结算', value: '¥102,848.00' },
      { label: '异常流水', value: '3' },
      { label: '对账批次', value: '12' },
    ],
    columns: ['流水号', '类型', '金额', '状态'],
    rows: [
      { id: 'ledger_001', values: ['L20240520001', '平台佣金', '¥1.78', '已入账'] },
      { id: 'ledger_002', values: ['L20240520002', '卖家结算', '¥10.00', '待结算'] },
      { id: 'ledger_003', values: ['L20240520003', '用户充值', '¥100.00', '已完成'] },
    ],
    actions: ['查看流水', '生成对账单', '处理异常', '查看平台收入'],
  },
  {
    key: 'withdrawals',
    label: '提现管理',
    description: '提现申请、手续费、审核、驳回与打款记录',
    action: '审核提现',
    cards: [
      { label: '待审核提现', value: '36' },
      { label: '今日提现额', value: '¥28,900.00' },
      { label: '手续费收入', value: '¥576.00' },
      { label: '已驳回', value: '4' },
      { label: '风控拦截', value: '2' },
    ],
    columns: ['申请人', '金额', '手续费', '状态'],
    rows: [
      { id: 'withdraw_001', values: ['user_001', '¥1,000.00', '¥16.00', '待审核'] },
      { id: 'withdraw_002', values: ['store_002', '¥2,500.00', '¥16.00', '处理中'] },
      { id: 'withdraw_003', values: ['store_003', '¥800.00', '¥16.00', '风控中'] },
    ],
    actions: ['通过提现', '驳回提现', '查看流水', '标记风控'],
  },
  {
    key: 'risk',
    label: '风控管理',
    description: '登录异常、高频请求、支付异常、提现异常与 API 滥用',
    action: '新增规则',
    cards: [
      { label: '风险事件', value: '9' },
      { label: '高频请求', value: '126' },
      { label: '支付异常', value: '3' },
      { label: '提现异常', value: '2' },
      { label: 'API 滥用', value: '5' },
    ],
    columns: ['规则', '对象', '等级', '状态'],
    rows: [
      { id: 'risk_001', values: ['登录异常', 'user_003', '中', '观察'] },
      { id: 'risk_002', values: ['重复支付', 'order_002', '高', '待处理'] },
      { id: 'risk_003', values: ['API 高频', 'store_003', '中', '限流'] },
    ],
    actions: ['查看详情', '拉黑对象', '解除限制', '调整规则'],
  },
  {
    key: 'permissions',
    label: '权限管理',
    description: '管理员角色、卖家权限、普通用户权限与操作日志',
    action: '新增角色',
    cards: [
      { label: '角色数量', value: '6' },
      { label: '权限点', value: '128' },
      { label: '管理员', value: '3' },
      { label: '今日操作', value: '58' },
      { label: '高危操作', value: '2' },
    ],
    columns: ['角色', '权限范围', '成员', '状态'],
    rows: [
      { id: 'role_admin', values: ['超级管理员', '全部权限', '1', '启用'] },
      { id: 'role_operator', values: ['运营管理员', '商品/订单', '2', '启用'] },
      { id: 'role_seller', values: ['卖家', '店铺权限', '3,260', '启用'] },
    ],
    actions: ['分配权限', '查看操作日志', '禁用角色', '新增管理员'],
  },
]

const currentMenu = computed(() => adminMenus.find((item) => item.key === activeSection.value) ?? adminMenus[0])
</script>
