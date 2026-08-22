import { createRouter, createWebHistory } from 'vue-router'
import MarketplaceHome from '@/views/MarketplaceHome.vue'
import ToolsCenter from '@/views/ToolsCenter.vue'
import UserCenter from '@/views/UserCenter.vue'
import SellerCenter from '@/views/SellerCenter.vue'
import AdminConsole from '@/views/AdminConsole.vue'
import ConsoleLogin from '@/views/ConsoleLogin.vue'

const consoleLoginPath = '/dj-e0c41416b5a1/login'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'marketplace', component: MarketplaceHome },
    { path: '/tools', name: 'tools-center', component: ToolsCenter },
    { path: consoleLoginPath, name: 'console-login', component: ConsoleLogin },
    { path: '/user', name: 'user-center', component: UserCenter },
    { path: '/seller', name: 'seller-center', component: SellerCenter, meta: { requiresConsoleAuth: true } },
    { path: '/admin', name: 'admin-console', component: AdminConsole, meta: { requiresConsoleAuth: true } },
  ],
})

router.beforeEach((to) => {
  if (!to.meta.requiresConsoleAuth) {
    return true
  }

  if (localStorage.getItem('dm_console_session') === 'active') {
    return true
  }

  return {
    path: consoleLoginPath,
    query: { redirect: to.fullPath },
  }
})
