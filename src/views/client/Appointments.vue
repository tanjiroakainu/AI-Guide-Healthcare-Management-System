<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-3">
          <button
            @click="$router.push('/client')"
            class="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">My Appointments</h1>
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link
            to="/client/recommended-products"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors font-light flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Recommended Products
          </router-link>
          <router-link
            to="/client/book"
            class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors font-light"
          >
            Book New Appointment
          </router-link>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Time
                </th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Payment Method
                </th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Payment Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Notes
                </th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200/60">
              <tr v-for="appointment in myAppointments" :key="appointment.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">
                  {{ formatDate(appointment.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">
                  {{ appointment.time }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(appointment.status)" class="px-2 inline-flex text-xs leading-5 font-light rounded-full border border-slate-200">
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">
                  {{ appointment.paymentMethod ? appointment.paymentMethod.toUpperCase() : '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getPaymentStatusClass(appointment.paymentStatus)" class="px-2 inline-flex text-xs leading-5 font-light rounded-full border border-slate-200">
                    {{ appointment.paymentStatus || 'pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600 font-light">
                  {{ appointment.notes || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-light">
                  <button
                    @click="cancelAppointment(appointment.id)"
                    v-if="appointment.status !== 'cancelled' && appointment.status !== 'completed'"
                    class="text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
              <tr v-if="myAppointments.length === 0">
                <td colspan="7" class="px-6 py-4 text-center text-slate-500 font-light">
                  No appointments found. <router-link to="/client/book" class="text-slate-900 hover:underline font-medium">Book your first appointment</router-link>
                </td>
              </tr>
            </tbody>
          </table>
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
  if (!authStore.currentUser) return []
  return appointmentStore.getAppointmentsByClient(authStore.currentUser.id)
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

const cancelAppointment = (id: string) => {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    appointmentStore.updateAppointment(id, { status: 'cancelled' })
  }
}
</script>

