<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Staff Dashboard</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl border border-slate-200/80 p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Today's Appointments</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ todayAppointments }}</p>
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
              <p class="text-sm font-light text-slate-600">Pending Confirmations</p>
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
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <router-link
              to="/staff/appointments"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Manage Appointments</h3>
              <p class="text-sm text-slate-600 font-light">View and manage appointments</p>
            </router-link>
            <router-link
              to="/staff/recommended-products"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Recommended Products</h3>
              <p class="text-sm text-slate-600 font-light">View recommended products and history</p>
            </router-link>
            <router-link
              to="/staff/chat"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Chat System</h3>
              <p class="text-sm text-slate-600 font-light">Communicate with clients and admin</p>
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

const appointmentStore = useAppointmentStore()

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return appointmentStore.appointments.filter(a => a.date === today).length
})

const pendingAppointments = computed(() => 
  appointmentStore.appointments.filter(a => a.status === 'pending').length
)
</script>

