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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Product Management</h1>
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link
            to="/admin/bought-products"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-light border border-slate-200"
          >
            View Bought Products
          </router-link>
          <button
            @click="showAddModal = true"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors font-light"
          >
            Add Product
          </button>
        </div>
      </div>

      <!-- Add Product Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl sm:text-2xl font-light text-slate-900 tracking-tight mb-4">Add New Product</h2>
          <form @submit.prevent="handleAddProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Product Name</label>
              <input
                v-model="addForm.name"
                type="text"
                required
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Description</label>
              <textarea
                v-model="addForm.description"
                required
                rows="3"
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white resize-none"
                placeholder="Enter product description"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Price (₱)</label>
              <input
                v-model.number="addForm.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Quantity</label>
              <input
                v-model.number="addForm.quantity"
                type="number"
                min="0"
                required
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="0"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Category (optional)</label>
              <input
                v-model="addForm.category"
                type="text"
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="e.g., Medicine, Equipment"
              />
            </div>
            <div v-if="addError" class="bg-red-50/80 border border-red-200/80 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ addError }}
            </div>
            <div v-if="addSuccess" class="bg-green-50/80 border border-green-200/80 text-green-700 px-4 py-3 rounded-lg text-sm">
              {{ addSuccess }}
            </div>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                class="flex-1 bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors font-light"
              >
                Add Product
              </button>
              <button
                type="button"
                @click="closeAddModal"
                class="flex-1 bg-slate-100 text-slate-700 py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors font-light border border-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl sm:text-2xl font-light text-slate-900 tracking-tight mb-4">Edit Product</h2>
          <form @submit.prevent="handleUpdateProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Product Name</label>
              <input
                v-model="editForm.name"
                type="text"
                required
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Description</label>
              <textarea
                v-model="editForm.description"
                required
                rows="3"
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white resize-none"
                placeholder="Enter product description"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Price (₱)</label>
              <input
                v-model.number="editForm.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Quantity</label>
              <input
                v-model.number="editForm.quantity"
                type="number"
                min="0"
                required
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="0"
              />
            </div>
            <div>
              <label class="block text-sm font-light text-slate-700 mb-2">Category (optional)</label>
              <input
                v-model="editForm.category"
                type="text"
                class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
                placeholder="e.g., Medicine, Equipment"
              />
            </div>
            <div v-if="editError" class="bg-red-50/80 border border-red-200/80 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ editError }}
            </div>
            <div v-if="editSuccess" class="bg-green-50/80 border border-green-200/80 text-green-700 px-4 py-3 rounded-lg text-sm">
              {{ editSuccess }}
            </div>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                class="flex-1 bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors font-light"
              >
                Update Product
              </button>
              <button
                type="button"
                @click="closeEditModal"
                class="flex-1 bg-slate-100 text-slate-700 py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors font-light border border-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Total Products</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ products.length }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">In Stock</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ inStockCount }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Low Stock</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ lowStockCount }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Out of Stock</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ outOfStockCount }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Product Name</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden md:table-cell">Description</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Price</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Quantity</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Status</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden lg:table-cell">Category</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200/60">
              <tr v-for="product in products" :key="product.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-3 sm:px-6 py-4">
                  <div class="text-xs sm:text-sm font-light text-slate-900">{{ product.name }}</div>
                  <div class="text-xs text-slate-500 md:hidden mt-1 font-light truncate max-w-[200px]">{{ product.description }}</div>
                </td>
                <td class="px-3 sm:px-6 py-4 text-xs sm:text-sm text-slate-600 max-w-xs truncate font-light hidden md:table-cell">{{ product.description }}</td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-900 font-light">₱{{ product.price.toFixed(2) }}</td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-900 font-light">{{ product.quantity }}</td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(product.status)" class="px-2 inline-flex text-xs leading-5 font-light rounded-full border border-slate-200">
                    {{ formatStatus(product.status) }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-600 font-light hidden lg:table-cell">{{ product.category || '-' }}</td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-light">
                  <div class="flex flex-wrap gap-1 sm:gap-2">
                    <button
                      @click="openEditModal(product)"
                      class="px-2 py-1 text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      @click="confirmDelete(product)"
                      class="px-2 py-1 text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="7" class="px-6 py-4 text-center text-slate-500 font-light text-sm">
                  No products found. Add your first product!
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
import { computed, ref } from 'vue'
import Layout from '@/components/Layout.vue'
import { useProductStore } from '@/stores/products'
import type { Product } from '@/types'

const productStore = useProductStore()

const products = computed(() => productStore.products)
const inStockCount = computed(() => productStore.inStockProducts.length)
const lowStockCount = computed(() => productStore.lowStockProducts.length)
const outOfStockCount = computed(() => productStore.outOfStockProducts.length)

const showAddModal = ref(false)
const showEditModal = ref(false)
const addError = ref('')
const addSuccess = ref('')
const editError = ref('')
const editSuccess = ref('')

const addForm = ref({
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  category: ''
})

const editForm = ref({
  id: '',
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  category: ''
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

const handleAddProduct = () => {
  addError.value = ''
  addSuccess.value = ''

  if (addForm.value.price < 0) {
    addError.value = 'Price cannot be negative'
    return
  }

  if (addForm.value.quantity < 0) {
    addError.value = 'Quantity cannot be negative'
    return
  }

  productStore.addProduct({
    name: addForm.value.name,
    description: addForm.value.description,
    price: addForm.value.price,
    quantity: addForm.value.quantity,
    category: addForm.value.category || undefined
  })

  addSuccess.value = 'Product added successfully!'
  setTimeout(() => {
    closeAddModal()
  }, 1500)
}

const closeAddModal = () => {
  showAddModal.value = false
  addForm.value = { name: '', description: '', price: 0, quantity: 0, category: '' }
  addError.value = ''
  addSuccess.value = ''
}

const openEditModal = (product: Product) => {
  editForm.value = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    category: product.category || ''
  }
  showEditModal.value = true
  editError.value = ''
  editSuccess.value = ''
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = { id: '', name: '', description: '', price: 0, quantity: 0, category: '' }
  editError.value = ''
  editSuccess.value = ''
}

const handleUpdateProduct = () => {
  editError.value = ''
  editSuccess.value = ''

  if (editForm.value.price < 0) {
    editError.value = 'Price cannot be negative'
    return
  }

  if (editForm.value.quantity < 0) {
    editError.value = 'Quantity cannot be negative'
    return
  }

  productStore.updateProduct(editForm.value.id, {
    name: editForm.value.name,
    description: editForm.value.description,
    price: editForm.value.price,
    quantity: editForm.value.quantity,
    category: editForm.value.category || undefined
  })

  editSuccess.value = 'Product updated successfully!'
  setTimeout(() => {
    closeEditModal()
  }, 1500)
}

const confirmDelete = (product: Product) => {
  if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
    productStore.deleteProduct(product.id)
    alert('Product deleted successfully')
  }
}
</script>

