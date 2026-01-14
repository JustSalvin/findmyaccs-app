import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import DashboardView from './views/DashboardView.vue'
import AuthView from './views/AuthView.vue'
import ForgotView from './views/ForgotView.vue'
import PrivacyView from './views/PrivacyView.vue'
import AccountView from './views/AccountsView.vue'
import AppLayout from './layouts/AppLayout.vue'
import SettingsView from './views/SettingsView.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: DashboardView },
      { path: 'accounts', component: AccountView },
      { path: 'settings', component: SettingsView },
    ],
  },
  {
    path: '/login',
    component: AuthView,
    meta: { requiresGuest: true },
  },
  {
    path: '/signup',
    component: AuthView,
    meta: { requiresGuest: true },
  },
  {
    path: '/forgot',
    component: ForgotView,
    meta: { requiresGuest: true },
  },
  {
    path: '/privacy',
    component: PrivacyView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta?.requiresAuth)
  const requiresGuest = to.matched.some((route) => route.meta?.requiresGuest)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (requiresAuth && !session) {
    return next({ path: '/login' })
  }

  if (requiresGuest && session) {
    console.log(requiresAuth)
    console.log(requiresGuest)
    return next({ path: '/dashboard' })
  }

  next()
})

export default router
