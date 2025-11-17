<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Admin Dashboard</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl border border-slate-200/80 p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Total Appointments</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ totalAppointments }}</p>
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
              <p class="text-sm font-light text-slate-600">Pending Appointments</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ pendingAppointments }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200/80 p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Total Users</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ totalUsers }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
        <div class="p-6 border-b border-slate-200/60">
          <h2 class="text-xl font-light text-slate-900 tracking-tight">Upcoming Appointments</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Time</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Payment Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="appointment in upcomingAppointments" :key="appointment.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ appointment.clientName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(appointment.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ appointment.time }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(appointment.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getPaymentStatusClass(appointment.paymentStatus)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ appointment.paymentStatus || 'pending' }}
                  </span>
                </td>
              </tr>
              <tr v-if="upcomingAppointments.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                  No upcoming appointments
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
        <div class="p-6 border-b border-slate-200/60">
          <h2 class="text-xl font-light text-slate-900 tracking-tight">Quick Actions</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link
              to="/admin/appointments"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Manage Appointments</h3>
              <p class="text-sm text-slate-600 font-light">View and manage all appointments</p>
            </router-link>
            <router-link
              to="/admin/users"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Manage Users</h3>
              <p class="text-sm text-slate-600 font-light">View and manage system users</p>
            </router-link>
            <router-link
              to="/admin/products"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Product Management</h3>
              <p class="text-sm text-slate-600 font-light">Manage products and inventory</p>
            </router-link>
            <router-link
              to="/admin/chat"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Chat System</h3>
              <p class="text-sm text-slate-600 font-light">Communicate with staff and clients</p>
            </router-link>
            <router-link
              to="/admin/staff-chat-history"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Staff Chat History</h3>
              <p class="text-sm text-slate-600 font-light">View staff chat accounts</p>
            </router-link>
            <router-link
              to="/admin/doctor-statistics"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Doctor Statistics</h3>
              <p class="text-sm text-slate-600 font-light">View appointments per doctor</p>
            </router-link>
            <router-link
              to="/admin/bought-products"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">Bought Products</h3>
              <p class="text-sm text-slate-600 font-light">Manage product purchases & payments</p>
            </router-link>
            <router-link
              to="/admin/system-charts"
              class="p-4 border border-slate-200/80 rounded-xl hover:bg-slate-50/50 hover:border-slate-300 transition-colors"
            >
              <h3 class="font-light text-slate-900 mb-2">System Statistics & Charts</h3>
              <p class="text-sm text-slate-600 font-light">View comprehensive system analytics</p>
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

const totalAppointments = computed(() => appointmentStore.appointments.length)
const pendingAppointments = computed(() => 
  appointmentStore.appointments.filter(a => a.status === 'pending').length
)
const totalUsers = computed(() => authStore.users.length)

const upcomingAppointments = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return appointmentStore.appointments
    .filter(a => a.date >= today && a.status !== 'cancelled')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getPaymentStatusClass = (status?: string) => {
  const classes = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    unpaid: 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script>

