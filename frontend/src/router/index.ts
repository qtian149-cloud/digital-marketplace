import { createRouter, createWebHistory } from 'vue-router'
import MarketplaceHome from '@/views/MarketplaceHome.vue'
import ToolsCenter from '@/views/ToolsCenter.vue'
import UserCenter from '@/views/UserCenter.vue'
import SellerCenter from '@/views/SellerCenter.vue'
import AdminConsole from '@/views/AdminConsole.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'marketplace', component: MarketplaceHome },
    { path: '/tools', name: 'tools-center', component: ToolsCenter },
    { path: '/user', name: 'user-center', component: UserCenter },
    { path: '/seller', name: 'seller-center', component: SellerCenter },
    { path: '/admin', name: 'admin-console', component: AdminConsole },
  ],
})
