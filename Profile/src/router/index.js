import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

import mortgage from './mortgage'
import refinanceMortgage from './refinance_mortgage'
import credit from './credit'
import refinanceCredit from './refinance_credit'
import profile from './profile'

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: { auth_free: true },
    component: Home
  },
  {
    path: '/registration',
    name: 'Registration',
    props: true,
    meta: { auth_free: true },
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/credit',
    name: 'Credit',
    meta: { auth_free: true },
    component: () => import('../views/credit/Service.vue')
  },
  {
    path: '/mortgage',
    name: 'Mortgage',
    meta: { auth_free: true },
    component: () => import('../views/mortgage/Service.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth_free: true },
    component: () => import('../views/text_pages/About.vue')
  },
  {
    path: '/terms-of-use',
    name: 'Terms of use',
    meta: { auth_free: true },
    component: () => import('../views/text_pages/TermsOfUse.vue')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy policy',
    meta: { auth_free: true },
    component: () => import('../views/text_pages/Policy.vue')
  },
  {
    path: '/failure',
    name: 'Failure',
    meta: { auth_free: true },
    component: () => import('../views/Failure.vue')
  },
  {
    path: '*',
    name: 'Page Not Found',
    meta: { auth_free: true },
    component: () => import('../views/404.vue')
  }
]

const routes = baseRoutes.concat(
  mortgage,
  refinanceMortgage,
  credit,
  refinanceCredit,
  profile
)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  // Загрузка локализации
  if (!store.state.locales) await store.dispatch('getLocales')

  // Редирект для авторизации
  const requireAuth = to.matched.some((record) => !record.meta.auth_free)
  if (requireAuth && !store.state.user) {
    next('/registration')
  } else {
    next()
  }
})

export default router
