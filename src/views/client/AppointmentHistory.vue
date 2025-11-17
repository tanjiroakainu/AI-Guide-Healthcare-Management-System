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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Appointment History</h1>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Time</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Payment Method</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Payment Status</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Recommended Products</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200/60">
              <tr v-for="appointment in appointmentHistory" :key="appointment.id">
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
                  <div v-if="appointment.recommendedProducts && appointment.recommendedProducts.length > 0" class="space-y-1">
                    <div v-for="productId in appointment.recommendedProducts" :key="productId" class="flex items-center">
                      <span class="text-slate-900">{{ getProductName(productId) }}</span>
                    </div>
                  </div>
                  <span v-else class="text-slate-400">-</span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600 max-w-xs font-light">
                  {{ appointment.notes || '-' }}
                </td>
              </tr>
              <tr v-if="appointmentHistory.length === 0">
                <td colspan="7" class="px-6 py-4 text-center text-slate-500 font-light">
                  No appointment history found.
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
import { useProductStore } from '@/stores/products'
import type { Appointment } from '@/types'

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()
const productStore = useProductStore()

const appointmentHistory = computed(() => {
  if (!authStore.currentUser) return []
  return appointmentStore.getAppointmentsByClient(authStore.currentUser.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusClass = (status: Appointment['status']) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPaymentStatusClass = (status?: string) => {
  const classes = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    unpaid: 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getProductName = (productId: string) => {
  const product = productStore.getProductById(productId)
  return product ? product.name : 'Unknown Product'
}
</script>

