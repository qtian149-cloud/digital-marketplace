<template>
  <div class="app-shell">
    <header class="topbar">
      <router-link class="brand" to="/">
        <span class="brand-mark">S</span>
        <span>
          <strong>数贸商店</strong>
          <small>全球数字商品交易平台</small>
        </span>
      </router-link>

      <el-input class="search" placeholder="搜索商品，例如：Facebook账号" clearable>
        <template #append>搜索</template>
      </el-input>

      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/tools">工具中心</router-link>
        <router-link to="/user">用户中心</router-link>
        <router-link to="/seller">卖家中心</router-link>
        <router-link to="/admin">管理后台</router-link>
      </nav>

      <div class="top-actions">
        <el-button type="primary">申请成为卖家</el-button>
        <el-avatar :size="34">U</el-avatar>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>
