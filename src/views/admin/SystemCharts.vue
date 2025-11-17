<template>
  <Layout>
    <div class="space-y-6">
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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">System Statistics & Charts</h1>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Total Appointments</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ totalAppointments }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Total Users</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ totalUsers }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Total Products</p>
              <p class="text-2xl font-light text-slate-900 mt-2">{{ totalProducts }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-light text-slate-600">Total Revenue</p>
              <p class="text-2xl font-light text-slate-900 mt-2">₱{{ totalRevenue.toFixed(2) }}</p>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Appointment Status Chart -->
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-light text-slate-900 mb-4 sm:mb-6">Appointment Status Distribution</h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="status in appointmentStatusData" :key="status.label" class="flex items-center gap-2 sm:gap-4">
              <div class="w-16 sm:w-24 text-xs sm:text-sm font-light text-slate-700">{{ status.label }}</div>
              <div class="flex-1 relative">
                <div class="h-7 sm:h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    :class="status.color"
                    :style="{ width: status.percentage + '%' }"
                    class="h-full flex items-center justify-end pr-1 sm:pr-2 transition-all duration-500"
                  >
                    <span class="text-[10px] sm:text-xs font-light text-white">{{ status.count }}</span>
                  </div>
                </div>
              </div>
              <div class="w-12 sm:w-16 text-xs sm:text-sm font-light text-slate-600 text-right">{{ status.percentage }}%</div>
            </div>
          </div>
        </div>

        <!-- User Role Distribution -->
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-light text-slate-900 mb-4 sm:mb-6">User Role Distribution</h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="role in userRoleData" :key="role.label" class="flex items-center gap-2 sm:gap-4">
              <div class="w-16 sm:w-24 text-xs sm:text-sm font-light text-slate-700">{{ role.label }}</div>
              <div class="flex-1 relative">
                <div class="h-7 sm:h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    :class="role.color"
                    :style="{ width: role.percentage + '%' }"
                    class="h-full flex items-center justify-end pr-1 sm:pr-2 transition-all duration-500"
                  >
                    <span class="text-[10px] sm:text-xs font-light text-white">{{ role.count }}</span>
                  </div>
                </div>
              </div>
              <div class="w-12 sm:w-16 text-xs sm:text-sm font-light text-slate-600 text-right">{{ role.percentage }}%</div>
            </div>
          </div>
        </div>

        <!-- Product Status Chart -->
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-light text-slate-900 mb-4 sm:mb-6">Product Inventory Status</h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="status in productStatusData" :key="status.label" class="flex items-center gap-2 sm:gap-4">
              <div class="w-20 sm:w-32 text-xs sm:text-sm font-light text-slate-700">{{ status.label }}</div>
              <div class="flex-1 relative">
                <div class="h-7 sm:h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    :class="status.color"
                    :style="{ width: status.percentage + '%' }"
                    class="h-full flex items-center justify-end pr-1 sm:pr-2 transition-all duration-500"
                  >
                    <span class="text-[10px] sm:text-xs font-light text-white">{{ status.count }}</span>
                  </div>
                </div>
              </div>
              <div class="w-12 sm:w-16 text-xs sm:text-sm font-light text-slate-600 text-right">{{ status.percentage }}%</div>
            </div>
          </div>
        </div>

        <!-- Payment Status Chart -->
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-light text-slate-900 mb-4 sm:mb-6">Payment Status Distribution</h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="status in paymentStatusData" :key="status.label" class="flex items-center gap-2 sm:gap-4">
              <div class="w-16 sm:w-24 text-xs sm:text-sm font-light text-slate-700">{{ status.label }}</div>
              <div class="flex-1 relative">
                <div class="h-7 sm:h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    :class="status.color"
                    :style="{ width: status.percentage + '%' }"
                    class="h-full flex items-center justify-end pr-1 sm:pr-2 transition-all duration-500"
                  >
                    <span class="text-[10px] sm:text-xs font-light text-white">{{ status.count }}</span>
                  </div>
                </div>
              </div>
              <div class="w-12 sm:w-16 text-xs sm:text-sm font-light text-slate-600 text-right">{{ status.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Appointments Chart -->
      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-light text-slate-900 mb-4 sm:mb-6">Monthly Appointments Trend</h2>
        <div class="overflow-x-auto -mx-4 sm:mx-0">
          <div class="flex items-end justify-between gap-1 sm:gap-2 h-48 sm:h-64 min-w-[600px] sm:min-w-0 px-4 sm:px-0">
            <div
              v-for="month in monthlyAppointments"
              :key="month.month"
              class="flex-1 flex flex-col items-center gap-1 sm:gap-2"
            >
              <div class="relative w-full h-full flex items-end">
                <div
                  class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                  :style="{ height: month.percentage + '%', minHeight: month.count > 0 ? '4px' : '0' }"
                  :title="`${month.month}: ${month.count} appointments`"
                ></div>
              </div>
              <div class="text-[10px] sm:text-xs font-light text-slate-600 mt-1 sm:mt-2">{{ month.month }}</div>
              <div class="text-[10px] sm:text-xs font-medium text-slate-900">{{ month.count }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Statistics Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top Products -->
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
          <div class="p-4 sm:p-6 border-b border-slate-200/60">
            <h2 class="text-lg sm:text-xl font-light text-slate-900">Top Products by Sales</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200/60">
              <thead class="bg-slate-50/50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Product</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Sales</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-200/60">
                <tr v-for="product in topProducts" :key="product.id">
                  <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-light text-slate-900">{{ product.name }}</td>
                  <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-light text-slate-600">{{ product.sales }}</td>
                  <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-light text-slate-900">₱{{ product.revenue.toFixed(2) }}</td>
                </tr>
                <tr v-if="topProducts.length === 0">
                  <td colspan="3" class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-slate-500 font-light">No product sales yet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
          <div class="p-4 sm:p-6 border-b border-slate-200/60">
            <h2 class="text-lg sm:text-xl font-light text-slate-900">System Overview</h2>
          </div>
          <div class="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Active Clients</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ activeClients }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Active Staff</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ activeStaff }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Completed Appointments</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ completedAppointments }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Cancelled Appointments</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ cancelledAppointments }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Total Product Purchases</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ totalPurchases }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Products in Stock</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ inStockProducts }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Low Stock Products</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ lowStockProducts }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-light text-slate-600">Out of Stock Products</span>
              <span class="text-xs sm:text-sm font-light text-slate-900">{{ outOfStockProducts }}</span>
            </div>
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
import { useProductStore } from '@/stores/products'
import type { Appointment } from '@/types'

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()
const productStore = useProductStore()

const totalAppointments = computed(() => appointmentStore.appointments.length)
const totalUsers = computed(() => authStore.users.length)
const totalProducts = computed(() => productStore.products.length)

const totalRevenue = computed(() => {
  return productStore.purchases
    .filter(p => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + p.total, 0)
})

const appointmentStatusData = computed(() => {
  const appointments = appointmentStore.appointments
  const total = appointments.length || 1
  
  const statuses = [
    { label: 'Pending', status: 'pending', color: 'bg-yellow-500' },
    { label: 'Confirmed', status: 'confirmed', color: 'bg-green-500' },
    { label: 'Completed', status: 'completed', color: 'bg-blue-500' },
    { label: 'Cancelled', status: 'cancelled', color: 'bg-red-500' }
  ]
  
  return statuses.map(s => {
    const count = appointments.filter(a => a.status === s.status).length
    return {
      ...s,
      count,
      percentage: Math.round((count / total) * 100)
    }
  })
})

const userRoleData = computed(() => {
  const users = authStore.users
  const total = users.length || 1
  
  const roles = [
    { label: 'Admin', role: 'admin', color: 'bg-purple-500' },
    { label: 'Staff', role: 'staff', color: 'bg-blue-500' },
    { label: 'Client', role: 'client', color: 'bg-green-500' }
  ]
  
  return roles.map(r => {
    const count = users.filter(u => u.role === r.role).length
    return {
      ...r,
      count,
      percentage: Math.round((count / total) * 100)
    }
  })
})

const productStatusData = computed(() => {
  const products = productStore.products
  const total = products.length || 1
  
  const statuses = [
    { label: 'In Stock', status: 'in_stock', color: 'bg-green-500' },
    { label: 'Low Stock', status: 'low_stock', color: 'bg-yellow-500' },
    { label: 'Out of Stock', status: 'out_of_stock', color: 'bg-red-500' }
  ]
  
  return statuses.map(s => {
    const count = products.filter(p => p.status === s.status).length
    return {
      ...s,
      count,
      percentage: Math.round((count / total) * 100)
    }
  })
})

const paymentStatusData = computed(() => {
  const appointments = appointmentStore.appointments.filter(a => a.paymentStatus)
  const total = appointments.length || 1
  
  const statuses = [
    { label: 'Paid', status: 'paid', color: 'bg-green-500' },
    { label: 'Pending', status: 'pending', color: 'bg-yellow-500' },
    { label: 'Unpaid', status: 'unpaid', color: 'bg-red-500' }
  ]
  
  return statuses.map(s => {
    const count = appointments.filter(a => a.paymentStatus === s.status).length
    return {
      ...s,
      count,
      percentage: Math.round((count / total) * 100)
    }
  })
})

const monthlyAppointments = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const now = new Date()
  const last12Months = []
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthStart = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0]
    
    const count = appointmentStore.appointments.filter(a => 
      a.date >= monthStart && a.date <= monthEnd
    ).length
    
    last12Months.push({
      month: months[date.getMonth()],
      count,
      percentage: 0
    })
  }
  
  const maxCount = Math.max(...last12Months.map(m => m.count), 1)
  last12Months.forEach(month => {
    month.percentage = Math.round((month.count / maxCount) * 100)
  })
  
  return last12Months
})

const topProducts = computed(() => {
  const productSales: Record<string, { id: string; name: string; sales: number; revenue: number }> = {}
  
  productStore.purchases.forEach(purchase => {
    if (!productSales[purchase.productId]) {
      productSales[purchase.productId] = {
        id: purchase.productId,
        name: purchase.productName,
        sales: 0,
        revenue: 0
      }
    }
    productSales[purchase.productId].sales += purchase.quantity
    productSales[purchase.productId].revenue += purchase.total
  })
  
  return Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
})

const activeClients = computed(() => {
  const clientIds = new Set(appointmentStore.appointments.map(a => a.clientId))
  return clientIds.size
})

const activeStaff = computed(() => {
  return authStore.users.filter(u => u.role === 'staff').length
})

const completedAppointments = computed(() => {
  return appointmentStore.appointments.filter(a => a.status === 'completed').length
})

const cancelledAppointments = computed(() => {
  return appointmentStore.appointments.filter(a => a.status === 'cancelled').length
})

const totalPurchases = computed(() => {
  return productStore.purchases.length
})

const inStockProducts = computed(() => {
  return productStore.products.filter(p => p.status === 'in_stock').length
})

const lowStockProducts = computed(() => {
  return productStore.products.filter(p => p.status === 'low_stock').length
})

const outOfStockProducts = computed(() => {
  return productStore.products.filter(p => p.status === 'out_of_stock').length
})
</script>

