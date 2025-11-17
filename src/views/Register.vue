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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 mb-2 tracking-tight">Client Registration</h1>
          <p class="text-slate-600 font-light">Create your account to book appointments</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-light text-slate-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-light text-slate-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
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
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-light text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              placeholder="Confirm your password"
            />
          </div>

          <div v-if="error" class="bg-red-50/80 border border-red-200/80 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50/80 border border-green-200/80 text-green-700 px-4 py-3 rounded-lg text-sm">
            {{ success }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-light"
          >
            {{ loading ? 'Registering...' : 'Register' }}
          </button>

          <div class="text-center">
            <p class="text-sm text-slate-600 font-light">
              Already have an account?
              <router-link to="/login" class="text-slate-900 hover:underline font-medium">Login here</router-link>
            </p>
          </div>
        </form>
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

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    if (form.value.password.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return
    }

    const result = authStore.register(
      form.value.name,
      form.value.email,
      form.value.password
    )

    if (result.success) {
      success.value = 'Registration successful! Redirecting to login...'
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}
</script>

