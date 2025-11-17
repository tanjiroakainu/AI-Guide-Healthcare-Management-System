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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Product Market</h1>
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            to="/client/product-purchase-history"
            class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-sm sm:text-base font-light"
          >
            View Purchase History
          </router-link>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
            />
          </div>
          <div class="md:w-48">
            <select
              v-model="statusFilter"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
          <div class="md:w-48">
            <select
              v-model="categoryFilter"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
            >
              <option value="all">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Purchase Modal -->
      <div v-if="showPurchaseModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl sm:text-2xl font-light text-slate-900 mb-4 tracking-tight">Purchase Product</h2>
          
          <div v-if="selectedProduct" class="space-y-4">
            <div>
              <h3 class="text-lg font-light text-slate-900">{{ selectedProduct.name }}</h3>
              <p class="text-sm text-slate-600 font-light">{{ selectedProduct.description }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Quantity</label>
              <input
                v-model.number="purchaseQuantity"
                type="number"
                min="1"
                :max="selectedProduct.quantity"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              />
              <p class="text-xs text-slate-500 mt-1 font-light">Available: {{ selectedProduct.quantity }}</p>
            </div>

            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Payment Method</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="paymentMethod = 'cash'"
                  :class="[
                    'px-4 py-3 border-2 rounded-lg font-light transition-colors',
                    paymentMethod === 'cash'
                      ? 'border-slate-900 bg-slate-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  ]"
                >
                  Cash
                </button>
                <button
                  @click="paymentMethod = 'gcash'"
                  :class="[
                    'px-4 py-3 border-2 rounded-lg font-light transition-colors',
                    paymentMethod === 'gcash'
                      ? 'border-slate-900 bg-slate-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  ]"
                >
                  GCash
                </button>
              </div>
            </div>

            <div class="bg-slate-50/50 border border-slate-200/60 p-4 rounded-xl">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-slate-600 font-light">Unit Price:</span>
                <span class="font-light">₱{{ selectedProduct.price.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-slate-600 font-light">Quantity:</span>
                <span class="font-light">{{ purchaseQuantity }}</span>
              </div>
              <div class="border-t border-slate-200/60 pt-2 mt-2">
                <div class="flex justify-between">
                  <span class="font-light text-slate-900">Total:</span>
                  <span class="text-xl font-light text-slate-900">₱{{ (selectedProduct.price * purchaseQuantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div v-if="purchaseError" class="bg-red-50/80 border border-red-200/80 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ purchaseError }}
            </div>
            <div v-if="purchaseSuccess" class="bg-green-50/80 border border-green-200/80 text-green-700 px-4 py-3 rounded-lg text-sm">
              {{ purchaseSuccess }}
            </div>

            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                @click="handlePurchase"
                :disabled="purchaseQuantity < 1 || purchaseQuantity > selectedProduct.quantity || !paymentMethod || loading"
                class="flex-1 bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-light"
              >
                {{ loading ? 'Processing...' : 'Purchase' }}
              </button>
              <button
                @click="closePurchaseModal"
                class="flex-1 bg-slate-100 text-slate-700 py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors font-light border border-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
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

            <button
              @click="openPurchaseModal(product)"
              :disabled="product.status === 'out_of_stock'"
              :class="[
                'w-full py-2.5 px-4 rounded-lg font-light transition-colors',
                product.status === 'out_of_stock'
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              ]"
            >
              {{ product.status === 'out_of_stock' ? 'Out of Stock' : 'Purchase' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-12 text-center">
        <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 class="text-lg font-light text-slate-900 mb-2">No Products Found</h3>
        <p class="text-slate-600 font-light">Try adjusting your search or filter criteria.</p>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Layout from '@/components/Layout.vue'
import { useProductStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import type { Product } from '@/types'

const productStore = useProductStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')
const showPurchaseModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const purchaseQuantity = ref(1)
const paymentMethod = ref<'cash' | 'gcash' | ''>('')
const purchaseError = ref('')
const purchaseSuccess = ref('')
const loading = ref(false)

const categories = computed(() => {
  const cats = new Set<string>()
  productStore.products.forEach(p => {
    if (p.category) cats.add(p.category)
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

  // Filter by status
  if (statusFilter.value !== 'all') {
    products = products.filter(p => p.status === statusFilter.value)
  }

  // Filter by category
  if (categoryFilter.value !== 'all') {
    products = products.filter(p => p.category === categoryFilter.value)
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

const openPurchaseModal = (product: Product) => {
  selectedProduct.value = product
  purchaseQuantity.value = 1
  paymentMethod.value = ''
  purchaseError.value = ''
  purchaseSuccess.value = ''
  showPurchaseModal.value = true
}

const closePurchaseModal = () => {
  showPurchaseModal.value = false
  selectedProduct.value = null
  purchaseQuantity.value = 1
  paymentMethod.value = ''
  purchaseError.value = ''
  purchaseSuccess.value = ''
}

const handlePurchase = () => {
  if (!selectedProduct.value || !authStore.currentUser) return

  purchaseError.value = ''
  purchaseSuccess.value = ''
  loading.value = true

  try {
    if (purchaseQuantity.value < 1) {
      purchaseError.value = 'Quantity must be at least 1'
      loading.value = false
      return
    }

    if (purchaseQuantity.value > selectedProduct.value.quantity) {
      purchaseError.value = 'Insufficient stock available'
      loading.value = false
      return
    }

    if (selectedProduct.value.status === 'out_of_stock') {
      purchaseError.value = 'Product is out of stock'
      loading.value = false
      return
    }

    if (!paymentMethod.value) {
      purchaseError.value = 'Please select a payment method'
      loading.value = false
      return
    }

    // Create purchase
    productStore.addPurchase({
      clientId: authStore.currentUser.id,
      clientName: authStore.currentUser.name,
      productId: selectedProduct.value.id,
      productName: selectedProduct.value.name,
      quantity: purchaseQuantity.value,
      price: selectedProduct.value.price,
      total: selectedProduct.value.price * purchaseQuantity.value,
      purchaseDate: new Date().toISOString(),
      paymentMethod: paymentMethod.value as 'cash' | 'gcash',
      paymentStatus: 'pending' // Default to pending, admin can update
    })

    purchaseSuccess.value = 'Purchase successful!'
    
    setTimeout(() => {
      closePurchaseModal()
      loading.value = false
    }, 1500)
  } catch (err) {
    purchaseError.value = 'Failed to process purchase. Please try again.'
    loading.value = false
  }
}
</script>

