<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Client Dashboard</h1>
        <router-link
          to="/client/book"
          class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors font-light"
        >
          Book Appointment
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl border border-slate-200/80 p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">My Appointments</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ myAppointments }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200/80 p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Upcoming</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ upcomingAppointments }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200/80 p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Pending</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ pendingAppointments }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
        <div class="p-6 border-b border-slate-200/60">
          <h2 class="text-xl font-light text-slate-900 tracking-tight">Quick Actions</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link
              to="/client/book"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Book New Appointment</h3>
              <p class="text-sm text-slate-600 font-light">Schedule a new appointment</p>
            </router-link>
            <router-link
              to="/client/appointments"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">View My Appointments</h3>
              <p class="text-sm text-slate-600 font-light">View and manage your appointments</p>
            </router-link>
            <router-link
              to="/client/appointment-history"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Appointment History</h3>
              <p class="text-sm text-slate-600 font-light">View your complete appointment history</p>
            </router-link>
            <router-link
              to="/client/market"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Product Market</h3>
              <p class="text-sm text-slate-600 font-light">Browse and purchase products</p>
            </router-link>
            <router-link
              to="/client/recommended-products"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Recommended Products</h3>
              <p class="text-sm text-slate-600 font-light">View products recommended by your doctor</p>
            </router-link>
            <router-link
              to="/client/product-purchase-history"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Product Purchase History</h3>
              <p class="text-sm text-slate-600 font-light">View your product purchase history</p>
            </router-link>
            <router-link
              to="/client/chat"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Chat System</h3>
              <p class="text-sm text-slate-600 font-light">Chat with doctors and staff</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Layout from '@/components/Layout.vue'
import { useAppointmentStore } from '@/stores/appointments'
import { useAuthStore } from '@/stores/auth'

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const myAppointments = computed(() => {
  if (!authStore.currentUser) return 0
  return appointmentStore.getAppointmentsByClient(authStore.currentUser.id).length
})

const upcomingAppointments = computed(() => {
  if (!authStore.currentUser) return 0
  const today = new Date().toISOString().split('T')[0]
  return appointmentStore.getAppointmentsByClient(authStore.currentUser.id)
    .filter(a => a.date >= today && a.status !== 'cancelled').length
})

const pendingAppointments = computed(() => {
  if (!authStore.currentUser) return 0
  return appointmentStore.getAppointmentsByClient(authStore.currentUser.id)
    .filter(a => a.status === 'pending').length
})
</script>

