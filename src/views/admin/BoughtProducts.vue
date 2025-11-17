<template>
  <Layout>
    <div class="space-y-4 sm:space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-3">
          <button
            @click="$router.push('/admin')"
            class="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Bought Products Management</h1>
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link
            to="/admin/products"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-light border border-slate-200"
          >
            View Products
          </router-link>
          <router-link
            to="/admin"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-light"
          >
            Dashboard
          </router-link>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <p class="text-xs sm:text-sm font-light text-slate-600">Total Purchases</p>
          <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ allPurchases.length }}</p>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <p class="text-xs sm:text-sm font-light text-slate-600">Paid</p>
          <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ paidPurchases.length }}</p>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <p class="text-xs sm:text-sm font-light text-slate-600">Pending</p>
          <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ pendingPurchases.length }}</p>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <p class="text-xs sm:text-sm font-light text-slate-600">Unpaid</p>
          <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ unpaidPurchases.length }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4">
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by client, product..."
              class="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
            />
          </div>
          <div class="sm:w-48">
            <select
              v-model="statusFilter"
              class="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Purchases Table -->
      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Client</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden sm:table-cell">Product</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Qty</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden md:table-cell">Total</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden lg:table-cell">Payment Method</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Payment Status</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200/60">
              <tr v-for="purchase in filteredPurchases" :key="purchase.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-3 sm:px-6 py-4">
                  <div class="text-xs sm:text-sm font-light text-slate-900">{{ purchase.clientName }}</div>
                  <div class="text-xs text-slate-500 sm:hidden mt-1">{{ purchase.productName }}</div>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-900 font-light hidden sm:table-cell">
                  {{ purchase.productName }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-900 font-light">
                  {{ purchase.quantity }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light text-slate-900 hidden md:table-cell">
                  ₱{{ purchase.total.toFixed(2) }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-600 font-light hidden lg:table-cell">
                  <span v-if="purchase.paymentMethod" class="px-2 py-1 text-xs font-light rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {{ purchase.paymentMethod.toUpperCase() }}
                  </span>
                  <span v-else class="text-slate-400">-</span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getPaymentStatusClass(purchase.paymentStatus)" class="px-2 py-1 text-xs font-light rounded-full border border-slate-200">
                    {{ purchase.paymentStatus || 'pending' }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-600 font-light hidden md:table-cell">
                  {{ formatDate(purchase.purchaseDate) }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light">
                  <div class="flex flex-wrap gap-1 sm:gap-2">
                    <button
                      @click="updatePaymentStatus(purchase.id, 'paid')"
                      v-if="purchase.paymentStatus !== 'paid'"
                      class="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors border border-green-200"
                    >
                      Mark Paid
                    </button>
                    <button
                      @click="updatePaymentStatus(purchase.id, 'unpaid')"
                      v-if="purchase.paymentStatus !== 'unpaid'"
                      class="px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors border border-red-200"
                    >
                      Mark Unpaid
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredPurchases.length === 0">
                <td colspan="8" class="px-6 py-4 text-center text-slate-500 font-light text-sm">
                  No purchases found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Total Revenue -->
      <div v-if="allPurchases.length > 0" class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 class="text-lg sm:text-xl font-light text-slate-900 tracking-tight">Revenue Summary</h2>
            <p class="text-xs sm:text-sm text-slate-600 font-light mt-1">Total revenue from paid purchases</p>
          </div>
          <div class="text-right">
            <p class="text-2xl sm:text-3xl font-light text-slate-900">₱{{ totalRevenue.toFixed(2) }}</p>
            <p class="text-xs sm:text-sm text-slate-500 font-light mt-1">{{ paidPurchases.length }} paid purchase(s)</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Layout from '@/components/Layout.vue'
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()

const searchQuery = ref('')
const statusFilter = ref('all')

const allPurchases = computed(() => productStore.getAllPurchases())

const filteredPurchases = computed(() => {
  let filtered = [...allPurchases.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.clientName.toLowerCase().includes(query) ||
      p.productName.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(p => (p.paymentStatus || 'pending') === statusFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
})

const paidPurchases = computed(() => 
  allPurchases.value.filter(p => p.paymentStatus === 'paid')
)

const pendingPurchases = computed(() => 
  allPurchases.value.filter(p => (p.paymentStatus || 'pending') === 'pending')
)

const unpaidPurchases = computed(() => 
  allPurchases.value.filter(p => p.paymentStatus === 'unpaid')
)

const totalRevenue = computed(() => 
  paidPurchases.value.reduce((sum, p) => sum + p.total, 0)
)

const getPaymentStatusClass = (status?: string) => {
  const classes = {
    paid: 'bg-green-50 text-green-700',
    pending: 'bg-yellow-50 text-yellow-700',
    unpaid: 'bg-red-50 text-red-700'
  }
  return classes[status as keyof typeof classes] || 'bg-slate-50 text-slate-700'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const updatePaymentStatus = (id: string, status: 'paid' | 'unpaid') => {
  productStore.updatePurchasePaymentStatus(id, status)
}
</script>

