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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Product Purchase History</h1>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Product Name</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Unit Price</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Payment Method</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Purchase Date</th>
                <th class="px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">From Appointment</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200/60">
              <tr v-for="purchase in purchaseHistory" :key="purchase.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-light text-slate-900">{{ purchase.productName }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">{{ purchase.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-light">₱{{ purchase.price.toFixed(2) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-light text-slate-900">₱{{ purchase.total.toFixed(2) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <span v-if="purchase.paymentMethod" class="px-2 py-1 text-xs font-light rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {{ purchase.paymentMethod.toUpperCase() }}
                  </span>
                  <span v-else class="text-slate-400">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-light">
                  {{ formatDate(purchase.purchaseDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-light">
                  <span v-if="purchase.appointmentId" class="text-slate-900">Yes</span>
                  <span v-else class="text-slate-400">-</span>
                </td>
              </tr>
              <tr v-if="purchaseHistory.length === 0">
                <td colspan="7" class="px-6 py-4 text-center text-slate-500 font-light">
                  No purchase history found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="purchaseHistory.length > 0" class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-light text-slate-900 tracking-tight">Total Spent</h2>
          <p class="text-3xl font-light text-slate-900">₱{{ totalSpent.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Layout from '@/components/Layout.vue'
import { useProductStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'

const productStore = useProductStore()
const authStore = useAuthStore()

const purchaseHistory = computed(() => {
  if (!authStore.currentUser) return []
  return productStore.getPurchasesByClient(authStore.currentUser.id)
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
})

const totalSpent = computed(() => {
  return purchaseHistory.value.reduce((sum, purchase) => sum + purchase.total, 0)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

