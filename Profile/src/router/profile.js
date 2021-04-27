const profile = [
  {
    path: '/profile/add-card',
    name: 'addCard',
    component: () => import('../views/profile/AddNewCard.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/payments',
    name: 'payments',
    component: () => import('../views/profile/Payments.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/payments/:id',
    name: 'payment',
    component: () => import('../views/profile/Payment.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/PersonalProfile.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/notifications',
    name: 'notifications',
    component: () => import('../views/profile/NotificationsPage.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/services',
    name: 'services',
    component: () => import('../views/profile/ServicesPage.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/documents',
    name: 'documentations',
    component: () => import('../views/profile/DocumentsPage.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/information',
    name: 'personalInformation',
    component: () => import('../views/profile/PersonalInformationPage.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/information/changes',
    name: 'changes',
    component: () => import('../views/profile/ChangesPage.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/profile/settings',
    name: 'settings',
    component: () => import('../views/profile/SettingsPage.vue'),
    meta: { auth_free: true }
  },
  {
    path: '/payment-service',
    name: 'payment-service',
    component: () => import('../views/profile/PaymentServicePage.vue'),
    meta: { auth_free: true }
  }
]
export default profile
