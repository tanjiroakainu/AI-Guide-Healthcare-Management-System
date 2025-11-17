<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <div class="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            <h1 class="text-base sm:text-lg lg:text-xl font-light tracking-tight text-slate-800 truncate">Healthcare Management System</h1>
            <div class="hidden md:flex items-center space-x-2 lg:space-x-4">
              <router-link
                v-if="authStore.userRole === 'admin'"
                to="/admin"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Dashboard
              </router-link>
              <router-link
                v-if="authStore.userRole === 'admin'"
                to="/admin/users"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Users
              </router-link>
              <router-link
                v-if="authStore.userRole === 'admin'"
                to="/admin/products"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Products
              </router-link>
              <router-link
                v-if="authStore.userRole === 'admin'"
                to="/admin/bought-products"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Bought
              </router-link>
              <router-link
                v-if="authStore.userRole === 'admin'"
                to="/admin/doctor-statistics"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Stats
              </router-link>
              <router-link
                v-if="authStore.userRole === 'staff'"
                to="/staff"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Dashboard
              </router-link>
              <router-link
                v-if="authStore.userRole === 'client'"
                to="/client"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Dashboard
              </router-link>
              <router-link
                v-if="authStore.userRole === 'client'"
                to="/client/market"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Market
              </router-link>
              <router-link
                :to="`/${authStore.userRole}/chat`"
                class="text-xs lg:text-sm text-slate-600 hover:text-slate-900 transition-colors font-light"
              >
                Chat
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <span class="text-xs sm:text-sm text-slate-600 truncate max-w-[100px] sm:max-w-none font-light">{{ authStore.currentUser?.name }}</span>
            <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-slate-100 text-slate-700 whitespace-nowrap border border-slate-200">
              {{ authStore.userRole?.toUpperCase() }}
            </span>
            <button
              @click="handleLogout"
              class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-light text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
      <slot />
    </div>

    <footer class="bg-white/60 backdrop-blur-sm border-t border-slate-200/60 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-sm text-slate-500 font-light">
          <p>Developed by <span class="font-medium text-slate-800">Raminder Jangao</span></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
}
</script>

