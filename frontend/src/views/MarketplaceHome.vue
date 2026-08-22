<template>
  <div class="portal-layout">
    <aside class="side-panel">
      <div class="category-list">
        <div v-for="(item, index) in categories" :key="item" class="category-item" :class="{ active: index === 0 }">
          <span>{{ item }}</span>
          <span>›</span>
        </div>
      </div>
      <div class="join-card">
        <strong>成为卖家</strong>
        <p class="muted">开启数字商品交易之旅</p>
        <el-button type="primary" size="small">立即申请</el-button>
      </div>
    </aside>

    <div class="page-grid">
      <section class="hero">
        <div>
          <el-tag effect="dark">已服务 140,000+ 全球用户</el-tag>
          <h1>购买属于你的<br />高质量数字产品</h1>
          <p>安全、稳定、高效、英颖。支持零售购买、批发购买、自动发货、余额支付和测试 USDT 支付。</p>
          <div class="hero-actions">
            <el-button size="large" type="primary" color="#ffffff">立即购买</el-button>
            <el-button size="large" plain>联系客服</el-button>
          </div>
        </div>
        <div class="floating-icons">
          <span v-for="icon in heroIcons" :key="icon" class="brand-icon">{{ icon }}</span>
        </div>
      </section>

      <section class="stat-grid">
        <el-card v-for="item in stats" :key="item.label" class="metric-card" shadow="never">
          <span class="muted">{{ item.label }}</span>
          <div class="metric-value">{{ item.value }}</div>
        </el-card>
      </section>

      <section class="section-head">
        <h3>热门商品</h3>
        <el-button link type="primary">查看更多</el-button>
      </section>

      <section class="product-grid">
        <el-card v-for="item in products" :key="item.name" class="product-card" shadow="never">
          <div class="product-logo">{{ item.logo }}</div>
          <h3>{{ item.name }}</h3>
          <p class="muted">{{ item.desc }}</p>
          <div class="section-head">
            <span class="price">¥ {{ item.price }}</span>
            <span class="muted">已售 {{ item.sold }}</span>
          </div>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = ['商品分类', '社交媒体账号', '邮箱账号', '谷歌系列账号', '苹果系列账号', '游戏账号', '软件账号', '货币卡券', '电商账号', '流媒体账号', '其他数字产品']
const heroIcons = ['FB', 'IG', 'TT', 'X', 'GM', 'TG']

const stats = [
  { label: '注册用户', value: '140,000+' },
  { label: '订单总数', value: '320,000+' },
  { label: '好评率', value: '99.6%' },
  { label: '商品总数', value: '50,000+' },
  { label: '在线客服', value: '7x24h' },
]

const products = [
  { logo: 'IG', name: 'Instagram 账号', desc: '高质量账号，可更换邮箱', price: '12.50', sold: '2.3k' },
  { logo: 'FB', name: 'Facebook 账号', desc: '稳定账号，批量可购', price: '8.90', sold: '1.6k' },
  { logo: 'X', name: 'Twitter/X 账号', desc: '高质量账号，可更换', price: '6.50', sold: '1.2k' },
  { logo: 'YT', name: 'YouTube 频道', desc: '视频频道，可交付', price: '25.00', sold: '689' },
]
</script>
