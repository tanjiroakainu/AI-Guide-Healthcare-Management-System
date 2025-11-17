<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4">
    <div class="max-w-md w-full">
      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-8 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <router-link
            to="/"
            class="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-sm font-light">Home</span>
          </router-link>
        </div>
        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 mb-2 tracking-tight">Healthcare Management System</h1>
          <p class="text-slate-600 font-light">Sign in to your account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-light text-slate-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-light text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              placeholder="Enter your password"
            />
          </div>

          <div v-if="error" class="bg-red-50/80 border border-red-200/80 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-light"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-slate-200/60">
          <p class="text-sm text-slate-600 text-center mb-3 font-light">
            Don't have an account?
            <router-link to="/register" class="text-slate-900 hover:underline font-medium ml-1">Register here</router-link>
          </p>
        </div>
        
        <div class="mt-4 pt-4 border-t border-slate-200/60">
          <p class="text-sm text-slate-600 text-center mb-3 font-light">Test Accounts:</p>
          <div class="space-y-1.5 text-xs text-slate-500 font-light">
            <div>Admin: admin@gmail.com / admin123</div>
            <div>Staff: staff@gmail.com / staff123</div>
            <div>Client: client@gmail.com / client123</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const success = authStore.login(email.value, password.value)
    
    if (success) {
      const role = authStore.userRole
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'staff') {
        router.push('/staff')
      } else if (role === 'client') {
        router.push('/client')
      }
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (err) {
    error.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>

