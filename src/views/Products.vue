<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-4">
            <router-link
              to="/"
              class="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </router-link>
            <h1 class="text-lg sm:text-xl font-light tracking-tight text-slate-800">Available Products</h1>
          </div>
          <div class="flex items-center space-x-3">
            <router-link
              to="/register"
              class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Register
            </router-link>
            <router-link
              to="/login"
              class="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-light text-slate-900 mb-2 tracking-tight">Browse Our Products</h2>
        <p class="text-slate-600 font-light">View our available medical products and supplies. Register or login to make a purchase.</p>
      </div>

      <!-- Filter Section -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white font-light"
          />
        </div>
        <div class="sm:w-48">
          <select
            v-model="selectedCategory"
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white font-light"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="sm:w-48">
          <select
            v-model="selectedStatus"
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white font-light"
          >
            <option value="">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl hover:border-slate-300 transition-all overflow-hidden"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <h3 class="text-lg font-light text-slate-900 mb-1">{{ product.name }}</h3>
                <p class="text-xs text-slate-500 mb-2 font-light">{{ product.category || 'Uncategorized' }}</p>
              </div>
              <span :class="getStatusClass(product.status)" class="px-2 py-1 text-xs font-light rounded-full whitespace-nowrap border border-slate-200">
                {{ formatStatus(product.status) }}
              </span>
            </div>
            
            <p class="text-slate-600 text-sm mb-4 line-clamp-2 font-light leading-relaxed">{{ product.description }}</p>
            
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-2xl font-light text-slate-900">₱{{ product.price.toFixed(2) }}</p>
                <p class="text-xs text-slate-500 font-light">Quantity: {{ product.quantity }}</p>
              </div>
            </div>

            <div class="bg-slate-50/50 border border-slate-200/60 rounded-lg p-3 text-center">
              <p class="text-xs text-slate-600 font-light mb-2">Login or Register to Purchase</p>
              <div class="flex gap-2">
                <router-link
                  to="/login"
                  class="flex-1 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors font-light text-center"
                >
                  Login
                </router-link>
                <router-link
                  to="/register"
                  class="flex-1 px-3 py-2 bg-white text-slate-900 border border-slate-300 text-sm rounded-lg hover:bg-slate-50 transition-colors font-light text-center"
                >
                  Register
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-12 text-center">
        <svg class="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p class="text-slate-600 font-light text-lg mb-2">No products found</p>
        <p class="text-slate-500 font-light text-sm">Try adjusting your search or filter criteria.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/products'
import type { Product } from '@/types'

const productStore = useProductStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

const categories = computed(() => {
  const cats = new Set<string>()
  productStore.products.forEach(product => {
    if (product.category) {
      cats.add(product.category)
    }
  })
  return Array.from(cats).sort()
})

const filteredProducts = computed(() => {
  let products = productStore.products

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query))
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  // Filter by status
  if (selectedStatus.value) {
    products = products.filter(p => p.status === selectedStatus.value)
  }

  return products
})

const getStatusClass = (status: Product['status']) => {
  const classes = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status: Product['status']) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>

