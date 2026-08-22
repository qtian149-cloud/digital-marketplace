<template>
  <div class="dashboard-layout">
    <aside class="dashboard-menu">
      <a
        v-for="item in userMenus"
        :key="item.key"
        href="#"
        :class="{ active: activeSection === item.key }"
        @click.prevent="activeSection = item.key"
      >
        {{ item.label }}
      </a>
    </aside>

    <div class="page-grid">
      <section class="section-head">
        <div>
          <h2>{{ currentMenu.label }}</h2>
          <p class="muted">{{ currentMenu.description }}</p>
        </div>
        <el-button type="primary">{{ currentMenu.action }}</el-button>
      </section>

      <section class="stat-grid">
        <el-card v-for="item in currentMenu.cards" :key="item.label" class="metric-card" shadow="never">
          <span class="muted">{{ item.label }}</span>
          <div class="metric-value">{{ item.value }}</div>
        </el-card>
      </section>

      <section class="table-card">
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
      </section>

      <section class="card-grid">
        <el-card v-for="item in currentMenu.quickActions" :key="item" shadow="never">{{ item }}</el-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const activeSection = ref('dashboard')

const userMenus = [
  {
    key: 'dashboard',
    label: '仪表盘',
    description: '账户总览 / 订单趋势 / 资金概览 / 消息提醒',
    action: '刷新数据',
    cards: [
      { label: '可用余额', value: '¥0.49' },
      { label: '今日订单', value: '3' },
      { label: '待处理售后', value: '2' },
      { label: '未读消息', value: '12' },
      { label: '可用优惠券', value: '88' },
    ],
    columns: ['提醒类型', '内容', '状态', '来源', '时间'],
    rows: [
      { id: 'dash_001', values: ['订单', 'Facebook 账号订单已完成', '已处理', '系统', '2024-05-20 14:30'] },
      { id: 'dash_002', values: ['资金', '充值 ¥100.00 已到账', '成功', '支付系统', '2024-05-20 11:30'] },
      { id: 'dash_003', values: ['售后', '售后工单等待回复', '处理中', '客服中心', '2024-05-20 10:12'] },
    ],
    quickActions: ['我的订单', '我的资产', '消息中心', '售后中心'],
  },
  {
    key: 'profile',
    label: '用户中心',
    description: 'jumokeji1122 / 普通用户 / 账号资料与会员信息',
    action: '编辑资料',
    cards: [
      { label: '用户等级', value: '普通用户' },
      { label: '账号状态', value: '正常' },
      { label: '绑定邮箱', value: '已绑定' },
      { label: '实名状态', value: '未认证' },
      { label: '安全等级', value: '中' },
    ],
    columns: ['资料项', '当前值', '状态', '可修改', '更新时间'],
    rows: [
      { id: 'profile_001', values: ['用户名', 'jumokeji1122', '正常', '可修改', '2024-05-20'] },
      { id: 'profile_002', values: ['邮箱', '已绑定', '正常', '可换绑', '2024-05-18'] },
      { id: 'profile_003', values: ['登录密码', '已设置', '正常', '可修改', '2024-05-16'] },
    ],
    quickActions: ['编辑资料', '修改密码', '安全设置', '通知设置'],
  },
  {
    key: 'orders',
    label: '我的订单',
    description: '查看购买记录、订单状态、发货内容与售后入口',
    action: '搜索订单',
    cards: [
      { label: '全部订单', value: '182' },
      { label: '待支付', value: '3' },
      { label: '已完成', value: '168' },
      { label: '售后中', value: '2' },
      { label: '已取消', value: '9' },
    ],
    columns: ['订单号', '商品', '订单状态', '金额', '发货状态'],
    rows: [
      { id: 'order_a', values: ['202405200001', 'Facebook 账号（高质量）', '已完成', '¥8.90', '已发货'] },
      { id: 'order_b', values: ['202405200002', 'Instagram 账号（老号）', '已完成', '¥12.50', '已发货'] },
      { id: 'order_c', values: ['202405200003', 'Twitter/X 账号（可更换）', '售后中', '¥6.50', '已发货'] },
    ],
    quickActions: ['订单详情', '查看发货', '申请售后', '再次购买'],
  },
  {
    key: 'assets',
    label: '我的资产',
    description: '余额、冻结金额、资金流水和优惠权益',
    action: '查看流水',
    cards: [
      { label: '可用余额', value: '¥0.49' },
      { label: '冻结余额', value: '¥0.00' },
      { label: '累计充值', value: '¥2,680.00' },
      { label: '累计消费', value: '¥2,156.50' },
      { label: '优惠券', value: '88' },
    ],
    columns: ['流水号', '类型', '金额', '状态', '时间'],
    rows: [
      { id: 'asset_001', values: ['A20240520001', '余额支付', '-¥8.90', '成功', '2024-05-20 14:30'] },
      { id: 'asset_002', values: ['A20240519001', '充值', '+¥100.00', '成功', '2024-05-19 18:20'] },
      { id: 'asset_003', values: ['A20240518001', '退款', '+¥6.50', '成功', '2024-05-18 10:15'] },
    ],
    quickActions: ['充值', '提现', '资金流水', '优惠券'],
  },
  {
    key: 'recharge',
    label: '充值记录',
    description: '查看充值订单、支付通道和到账状态',
    action: '立即充值',
    cards: [
      { label: '充值次数', value: '26' },
      { label: '累计充值', value: '¥2,680.00' },
      { label: '今日充值', value: '¥100.00' },
      { label: '处理中', value: '1' },
      { label: '失败记录', value: '0' },
    ],
    columns: ['充值单号', '支付方式', '金额', '状态', '时间'],
    rows: [
      { id: 'recharge_001', values: ['R20240520001', '余额充值', '¥100.00', '成功', '2024-05-20 11:30'] },
      { id: 'recharge_002', values: ['R20240519001', 'USDT', '¥300.00', '成功', '2024-05-19 09:12'] },
      { id: 'recharge_003', values: ['R20240518001', '余额充值', '¥50.00', '成功', '2024-05-18 21:40'] },
    ],
    quickActions: ['余额充值', 'USDT充值', '查看到账', '联系客服'],
  },
  {
    key: 'withdraw',
    label: '提现记录',
    description: '查看提现申请、手续费、审核和到账记录',
    action: '申请提现',
    cards: [
      { label: '可提现余额', value: '¥0.49' },
      { label: '提现次数', value: '8' },
      { label: '固定手续费', value: '¥16' },
      { label: '审核中', value: '0' },
      { label: '已到账', value: '8' },
    ],
    columns: ['提现单号', '金额', '手续费', '状态', '时间'],
    rows: [
      { id: 'withdraw_001', values: ['W20240515001', '¥200.00', '¥16.00', '已到账', '2024-05-15 12:30'] },
      { id: 'withdraw_002', values: ['W20240508001', '¥180.00', '¥16.00', '已到账', '2024-05-08 17:10'] },
      { id: 'withdraw_003', values: ['W20240501001', '¥120.00', '¥16.00', '已到账', '2024-05-01 10:05'] },
    ],
    quickActions: ['申请提现', '绑定账户', '查看规则', '提现客服'],
  },
  {
    key: 'favorites',
    label: '我的收藏',
    description: '收藏商品、常用工具和店铺关注',
    action: '管理收藏',
    cards: [
      { label: '收藏商品', value: '128' },
      { label: '关注店铺', value: '16' },
      { label: '常用工具', value: '9' },
      { label: '降价提醒', value: '5' },
      { label: '失效收藏', value: '2' },
    ],
    columns: ['名称', '分类', '价格', '状态', '收藏时间'],
    rows: [
      { id: 'fav_001', values: ['Instagram 账号（老号）', '商品', '¥12.50', '在售', '2024-05-20'] },
      { id: 'fav_002', values: ['2FA 生成', '工具', '免费', '可用', '2024-05-19'] },
      { id: 'fav_003', values: ['TG 获取验证码', '工具', '¥0.50', '可用', '2024-05-18'] },
    ],
    quickActions: ['取消收藏', '加入购物车', '查看店铺', '降价提醒'],
  },
  {
    key: 'coupons',
    label: '优惠券',
    description: '查看可用、已用和过期优惠券',
    action: '领取优惠券',
    cards: [
      { label: '可用优惠券', value: '88' },
      { label: '即将过期', value: '6' },
      { label: '已使用', value: '39' },
      { label: '已过期', value: '12' },
      { label: '累计优惠', value: '¥620.00' },
    ],
    columns: ['优惠券', '门槛', '面额', '状态', '有效期'],
    rows: [
      { id: 'coupon_001', values: ['新用户券', '满50可用', '¥5', '可用', '2024-06-20'] },
      { id: 'coupon_002', values: ['工具券', '无门槛', '¥1', '可用', '2024-06-10'] },
      { id: 'coupon_003', values: ['商品券', '满100可用', '¥10', '即将过期', '2024-05-30'] },
    ],
    quickActions: ['立即使用', '领取更多', '查看规则', '分享优惠'],
  },
  {
    key: 'messages',
    label: '消息中心',
    description: '系统通知、订单通知、售后通知和活动消息',
    action: '全部已读',
    cards: [
      { label: '未读消息', value: '12' },
      { label: '订单通知', value: '5' },
      { label: '售后通知', value: '2' },
      { label: '活动消息', value: '3' },
      { label: '系统通知', value: '2' },
    ],
    columns: ['类型', '标题', '状态', '来源', '时间'],
    rows: [
      { id: 'msg_001', values: ['订单', '订单已完成', '未读', '系统', '2024-05-20 14:30'] },
      { id: 'msg_002', values: ['售后', '售后工单已回复', '未读', '客服', '2024-05-20 13:22'] },
      { id: 'msg_003', values: ['活动', '工具中心优惠活动', '已读', '平台', '2024-05-19 09:12'] },
    ],
    quickActions: ['查看消息', '全部已读', '删除消息', '通知设置'],
  },
  {
    key: 'service',
    label: '售后中心',
    description: '售后申请、工单回复、AI 客服和人工客服',
    action: '提交售后',
    cards: [
      { label: '售后工单', value: '6' },
      { label: '处理中', value: '2' },
      { label: '已完成', value: '4' },
      { label: 'AI回复', value: '18' },
      { label: '人工介入', value: '1' },
    ],
    columns: ['工单号', '问题类型', '订单', '状态', '时间'],
    rows: [
      { id: 'ticket_001', values: ['S20240520001', '发货问题', '202405200003', '处理中', '2024-05-20 14:30'] },
      { id: 'ticket_002', values: ['S20240518001', '登录问题', '202405180005', '已完成', '2024-05-18 11:20'] },
      { id: 'ticket_003', values: ['S20240516001', '退款咨询', '202405160002', '已完成', '2024-05-16 16:10'] },
    ],
    quickActions: ['AI客服', '人工客服', '提交工单', '售后规则'],
  },
]

const currentMenu = computed(() => userMenus.find((item) => item.key === activeSection.value) ?? userMenus[0])
</script>
