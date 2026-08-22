<template>
  <div class="console-login-page">
    <section class="login-panel">
      <router-link class="brand login-brand" to="/">
        <span class="brand-mark">S</span>
        <span>
          <strong>数贸商店后台</strong>
          <small>独立管理入口</small>
        </span>
      </router-link>

      <div class="login-copy">
        <h1>登录管理后台</h1>
        <p class="muted">用户中心、卖家中心、管理后台统一从这里进入。正式账号权限将由后端鉴权控制。</p>
      </div>

      <form class="login-form" @submit.prevent="login">
        <label>
          <span>账号</span>
          <input v-model="username" placeholder="请输入管理员账号" autocomplete="username" />
        </label>
        <label>
          <span>密码</span>
          <input v-model="password" placeholder="请输入密码" type="password" autocomplete="current-password" />
        </label>
        <button class="el-button el-button--primary login-submit" type="submit">登录后台</button>
      </form>

      <div class="login-links">
        <router-link to="/">返回前台</router-link>
        <span>后台地址：/dj-e0c41416b5a1/login</span>
      </div>
    </section>

    <section class="login-preview">
      <div class="preview-card">
        <strong>后台功能入口</strong>
        <span>用户中心</span>
        <span>卖家中心</span>
        <span>管理后台</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')

const login = () => {
  localStorage.setItem('dm_console_session', 'active')
  router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/admin')
}
</script>
