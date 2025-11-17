<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-3">
          <button
            @click="$router.push('/staff')"
            class="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Recommended Products</h1>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="activeTab = 'current'"
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg transition-colors font-light text-sm sm:text-base',
              activeTab === 'current'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            <span class="hidden sm:inline">Current Recommendations</span>
            <span class="sm:hidden">Current</span>
          </button>
          <button
            @click="activeTab = 'history'"
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg transition-colors font-light text-sm sm:text-base',
              activeTab === 'history'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            <span class="hidden sm:inline">Recommendation History</span>
            <span class="sm:hidden">History</span>
          </button>
        </div>
      </div>

      <!-- Current Recommendations Tab -->
      <div v-if="activeTab === 'current'" class="space-y-6">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200/60">
              <thead class="bg-slate-50/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Appointment Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Recommended Products
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-200/60">
                <tr v-for="recommendation in currentRecommendations" :key="recommendation.appointmentId">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-light text-slate-900">{{ recommendation.clientName }}</div>
                    <div class="text-sm text-slate-500 font-light">{{ recommendation.clientEmail }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">
                    {{ formatDate(recommendation.appointmentDate) }}
                    <div class="text-xs text-slate-500">{{ recommendation.appointmentTime }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-2">
                      <div
                        v-for="product in recommendation.products"
                        :key="product.id"
                        class="text-sm text-slate-700 font-light"
                      >
                        <span class="font-medium">{{ product.name }}</span>
                        <span class="text-slate-500"> - ₱{{ product.price.toFixed(2) }}</span>
                        <span
                          :class="getProductStatusClass(product.status)"
                          class="ml-2 px-2 py-0.5 text-xs font-light rounded-full"
                        >
                          {{ formatProductStatus(product.status) }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ₱{{ recommendation.totalValue.toFixed(2) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-light">
                    <button
                      @click="viewAppointment(recommendation.appointmentId)"
                      class="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      View Appointment
                    </button>
                  </td>
                </tr>
                <tr v-if="currentRecommendations.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-slate-500 font-light">
                    No current recommendations found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Recommendation History Tab -->
      <div v-if="activeTab === 'history'" class="space-y-6">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200/60">
              <thead class="bg-slate-50/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Date Recommended
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Appointment
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Products Recommended
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-200/60">
                <tr v-for="historyItem in recommendationHistory" :key="historyItem.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">
                    {{ formatDateTime(historyItem.recommendedAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-light text-slate-900">{{ historyItem.clientName }}</div>
                    <div class="text-sm text-slate-500 font-light">{{ historyItem.clientEmail }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">
                    {{ formatDate(historyItem.appointmentDate) }}
                    <div class="text-xs text-slate-500">{{ historyItem.appointmentTime }}</div>
                    <div class="text-xs">
                      <span :class="getStatusClass(historyItem.appointmentStatus)" class="px-2 py-0.5 rounded-full">
                        {{ historyItem.appointmentStatus }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-1">
                      <div
                        v-for="product in historyItem.products"
                        :key="product.id"
                        class="text-sm text-slate-700 font-light"
                      >
                        {{ product.name }} - ₱{{ product.price.toFixed(2) }}
                      </div>
                      <div class="text-xs font-medium text-slate-900 mt-1">
                        Total: ₱{{ historyItem.totalValue.toFixed(2) }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="getRecommendationStatusClass(historyItem.status)"
                      class="px-2 inline-flex text-xs leading-5 font-light rounded-full"
                    >
                      {{ historyItem.status }}
                    </span>
                  </td>
                </tr>
                <tr v-if="recommendationHistory.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-slate-500 font-light">
                    No recommendation history found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useAppointmentStore } from '@/stores/appointments'
import { useProductStore } from '@/stores/products'
import type { Appointment, Product } from '@/types'

const router = useRouter()
const appointmentStore = useAppointmentStore()
const productStore = useProductStore()

const activeTab = ref<'current' | 'history'>('current')

interface RecommendationItem {
  appointmentId: string
  clientId: string
  clientName: string
  clientEmail: string
  appointmentDate: string
  appointmentTime: string
  appointmentStatus: string
  products: Product[]
  totalValue: number
}

interface RecommendationHistoryItem {
  id: string
  appointmentId: string
  clientId: string
  clientName: string
  clientEmail: string
  appointmentDate: string
  appointmentTime: string
  appointmentStatus: string
  products: Product[]
  totalValue: number
  recommendedAt: string
  status: 'active' | 'purchased' | 'expired'
}

const currentRecommendations = computed<RecommendationItem[]>(() => {
  const recommendations: RecommendationItem[] = []
  
  appointmentStore.appointments.forEach((appointment: Appointment) => {
    if (appointment.recommendedProducts && appointment.recommendedProducts.length > 0) {
      const products = appointment.recommendedProducts
        .map(productId => productStore.getProductById(productId))
        .filter((p): p is Product => p !== undefined)
      
      if (products.length > 0) {
        const totalValue = products.reduce((sum, p) => sum + p.price, 0)
        recommendations.push({
          appointmentId: appointment.id,
          clientId: appointment.clientId,
          clientName: appointment.clientName,
          clientEmail: appointment.clientEmail,
          appointmentDate: appointment.date,
          appointmentTime: appointment.time,
          appointmentStatus: appointment.status,
          products,
          totalValue
        })
      }
    }
  })
  
  // Sort by appointment date (newest first)
  return recommendations.sort((a, b) => 
    new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
  )
})

const recommendationHistory = computed<RecommendationHistoryItem[]>(() => {
  const history: RecommendationHistoryItem[] = []
  
  appointmentStore.appointments.forEach((appointment: Appointment) => {
    if (appointment.recommendedProducts && appointment.recommendedProducts.length > 0) {
      const products = appointment.recommendedProducts
        .map(productId => productStore.getProductById(productId))
        .filter((p): p is Product => p !== undefined)
      
      if (products.length > 0) {
        const totalValue = products.reduce((sum, p) => sum + p.price, 0)
        
        // Check if any products were purchased
        const purchases = productStore.purchases.filter(
          p => p.appointmentId === appointment.id
        )
        
        let status: 'active' | 'purchased' | 'expired' = 'active'
        if (purchases.length > 0) {
          status = 'purchased'
        } else if (appointment.status === 'cancelled' || appointment.status === 'completed') {
          // Consider expired if appointment is old (more than 30 days)
          const appointmentDate = new Date(appointment.date)
          const daysDiff = (Date.now() - appointmentDate.getTime()) / (1000 * 60 * 60 * 24)
          if (daysDiff > 30) {
            status = 'expired'
          }
        }
        
        history.push({
          id: appointment.id,
          appointmentId: appointment.id,
          clientId: appointment.clientId,
          clientName: appointment.clientName,
          clientEmail: appointment.clientEmail,
          appointmentDate: appointment.date,
          appointmentTime: appointment.time,
          appointmentStatus: appointment.status,
          products,
          totalValue,
          recommendedAt: appointment.updatedAt || appointment.createdAt,
          status
        })
      }
    }
  })
  
  // Sort by recommendation date (newest first)
  return history.sort((a, b) => 
    new Date(b.recommendedAt).getTime() - new Date(a.recommendedAt).getTime()
  )
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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

const getProductStatusClass = (status: Product['status']) => {
  const classes = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatProductStatus = (status: Product['status']) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getRecommendationStatusClass = (status: string) => {
  const classes = {
    active: 'bg-blue-100 text-blue-800',
    purchased: 'bg-green-100 text-green-800',
    expired: 'bg-gray-100 text-gray-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const viewAppointment = (appointmentId: string) => {
  router.push('/staff/appointments')
  // Scroll to appointment or highlight it (could be enhanced)
}
</script>

