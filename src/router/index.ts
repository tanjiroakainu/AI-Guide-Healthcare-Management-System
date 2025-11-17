import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('@/views/Products.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('@/views/admin/Dashboard.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/appointments',
      name: 'AdminAppointments',
      component: () => import('@/views/admin/Appointments.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: () => import('@/views/admin/Users.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/chat',
      name: 'AdminChat',
      component: () => import('@/views/admin/Chat.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/staff-chat-history',
      name: 'AdminStaffChatHistory',
      component: () => import('@/views/admin/StaffChatHistory.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/doctor-statistics',
      name: 'AdminDoctorStatistics',
      component: () => import('@/views/admin/DoctorStatistics.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/products',
      name: 'AdminProducts',
      component: () => import('@/views/admin/Products.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/bought-products',
      name: 'AdminBoughtProducts',
      component: () => import('@/views/admin/BoughtProducts.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/system-charts',
      name: 'AdminSystemCharts',
      component: () => import('@/views/admin/SystemCharts.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/staff',
      name: 'StaffDashboard',
      component: () => import('@/views/staff/Dashboard.vue'),
      meta: { requiresAuth: true, roles: ['staff'] }
    },
    {
      path: '/staff/appointments',
      name: 'StaffAppointments',
      component: () => import('@/views/staff/Appointments.vue'),
      meta: { requiresAuth: true, roles: ['staff'] }
    },
    {
      path: '/staff/chat',
      name: 'StaffChat',
      component: () => import('@/views/staff/Chat.vue'),
      meta: { requiresAuth: true, roles: ['staff'] }
    },
    {
      path: '/staff/recommended-products',
      name: 'StaffRecommendedProducts',
      component: () => import('@/views/staff/RecommendedProducts.vue'),
      meta: { requiresAuth: true, roles: ['staff'] }
    },
    {
      path: '/client',
      name: 'ClientDashboard',
      component: () => import('@/views/client/Dashboard.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/appointments',
      name: 'ClientAppointments',
      component: () => import('@/views/client/Appointments.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/book',
      name: 'ClientBook',
      component: () => import('@/views/client/BookAppointment.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/chat',
      name: 'ClientChat',
      component: () => import('@/views/client/Chat.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/appointment-history',
      name: 'ClientAppointmentHistory',
      component: () => import('@/views/client/AppointmentHistory.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/product-purchase-history',
      name: 'ClientProductPurchaseHistory',
      component: () => import('@/views/client/ProductPurchaseHistory.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/market',
      name: 'ClientProductMarket',
      component: () => import('@/views/client/ProductMarket.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    },
    {
      path: '/client/recommended-products',
      name: 'ClientRecommendedProducts',
      component: () => import('@/views/client/RecommendedProducts.vue'),
      meta: { requiresAuth: true, roles: ['client'] }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAuth && to.meta.roles) {
    const allowedRoles = to.meta.roles as UserRole[]
    if (!authStore.canAccess(allowedRoles)) {
      // Redirect to appropriate dashboard based on role
      if (authStore.userRole === 'admin') {
        next('/admin')
      } else if (authStore.userRole === 'staff') {
        next('/staff')
      } else if (authStore.userRole === 'client') {
        next('/client')
      } else {
        next('/')
      }
    } else {
      next()
    }
  } else if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    // Redirect authenticated users to their dashboard
    if (authStore.userRole === 'admin') {
      next('/admin')
    } else if (authStore.userRole === 'staff') {
      next('/staff')
    } else if (authStore.userRole === 'client') {
      next('/client')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

