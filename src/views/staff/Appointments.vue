<template>
  <Layout>
      <div class="space-y-4 sm:space-y-6">
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
            <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Appointments</h1>
          </div>
          <button
            @click="$router.push('/staff/recommended-products')"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors font-light flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Recommended Products
          </button>
        </div>

      <!-- Reschedule Modal -->
      <div v-if="showRescheduleModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Reschedule Appointment</h2>
          
          <div v-if="selectedAppointment" class="space-y-4">
            <div>
              <p class="text-sm text-gray-600 mb-2">Client: <span class="font-semibold">{{ selectedAppointment.clientName }}</span></p>
              <p class="text-sm text-gray-600">Current Date: <span class="font-semibold">{{ formatDate(selectedAppointment.date) }}</span></p>
              <p class="text-sm text-gray-600">Current Time: <span class="font-semibold">{{ selectedAppointment.time }}</span></p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Date</label>
              <input
                v-model="rescheduleForm.date"
                type="date"
                :min="getMinDate()"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Time</label>
              <input
                v-model="rescheduleForm.time"
                type="time"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div v-if="rescheduleError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ rescheduleError }}
            </div>
            <div v-if="rescheduleSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {{ rescheduleSuccess }}
            </div>

            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                @click="handleReschedule"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Reschedule
              </button>
              <button
                @click="closeRescheduleModal"
                class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommend Products Modal -->
      <div v-if="showRecommendModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Recommend Products</h2>
          <p class="text-sm text-gray-600 mb-4">Select products to recommend to {{ selectedAppointment?.clientName }}</p>
          
          <div class="space-y-3 mb-6 max-h-96 overflow-y-auto">
            <div
              v-for="product in availableProducts"
              :key="product.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    :value="product.id"
                    v-model="selectedProducts"
                    :disabled="product.status === 'out_of_stock'"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="text-sm text-gray-500">{{ product.description }}</p>
                    <div class="flex items-center space-x-4 mt-1">
                      <span class="text-sm font-semibold text-gray-900">₱{{ product.price.toFixed(2) }}</span>
                      <span class="text-sm text-gray-500">Qty: {{ product.quantity }}</span>
                      <span :class="getProductStatusClass(product.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                        {{ formatProductStatus(product.status) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="availableProducts.length === 0" class="text-center text-gray-500 py-8">
              No products available
            </div>
          </div>

          <div v-if="recommendError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {{ recommendError }}
          </div>
          <div v-if="recommendSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
            {{ recommendSuccess }}
          </div>

          <div class="flex space-x-3">
            <button
              @click="handleRecommendProducts"
              :disabled="selectedProducts.length === 0"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Recommend Selected Products
            </button>
            <button
              @click="closeRecommendModal"
              class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Time
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Payment
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td class="px-3 sm:px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ appointment.clientName }}</div>
                  <div class="text-xs sm:text-sm text-gray-500">{{ appointment.clientEmail }}</div>
                  <div class="text-xs text-gray-400 sm:hidden mt-1">
                    {{ formatDate(appointment.date) }} at {{ appointment.time }}
                  </div>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                  {{ formatDate(appointment.date) }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                  {{ appointment.time }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(appointment.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ appointment.status }}
                  </span>
                  <div class="text-xs text-gray-500 mt-1 lg:hidden">
                    {{ appointment.paymentMethod ? appointment.paymentMethod.toUpperCase() : '-' }} / 
                    <span :class="getPaymentStatusClass(appointment.paymentStatus)" class="px-1 rounded">
                      {{ appointment.paymentStatus || 'pending' }}
                    </span>
                  </div>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div class="text-xs text-gray-900 mb-1">{{ appointment.paymentMethod ? appointment.paymentMethod.toUpperCase() : '-' }}</div>
                  <span :class="getPaymentStatusClass(appointment.paymentStatus)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ appointment.paymentStatus || 'pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex flex-wrap gap-2">
                    <button
                      @click="openRecommendModal(appointment)"
                      v-if="appointment.status !== 'cancelled'"
                      class="text-xs sm:text-sm px-2 py-1 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded transition"
                    >
                      Recommend
                    </button>
                    <button
                      @click="openRescheduleModal(appointment)"
                      v-if="appointment.status !== 'cancelled' && appointment.status !== 'completed'"
                      class="text-xs sm:text-sm px-2 py-1 text-orange-600 hover:text-orange-900 hover:bg-orange-50 rounded transition"
                    >
                      Reschedule
                    </button>
                    <button
                      @click="updatePaymentStatus(appointment.id, 'paid')"
                      v-if="appointment.paymentStatus !== 'paid'"
                      class="text-xs sm:text-sm px-2 py-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition"
                    >
                      Mark Paid
                    </button>
                    <button
                      @click="updateStatus(appointment.id, 'confirmed')"
                      v-if="appointment.status === 'pending'"
                      class="text-xs sm:text-sm px-2 py-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition"
                    >
                      Confirm
                    </button>
                    <button
                      @click="updateStatus(appointment.id, 'completed')"
                      v-if="appointment.status === 'confirmed'"
                      class="text-xs sm:text-sm px-2 py-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition"
                    >
                      Complete
                    </button>
                    <button
                      @click="confirmCancelAppointment(appointment)"
                      v-if="appointment.status !== 'cancelled'"
                      class="text-xs sm:text-sm px-2 py-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="appointments.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                  No appointments found
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
import { useAppointmentStore } from '@/stores/appointments'
import { useProductStore } from '@/stores/products'
import type { Appointment, Product } from '@/types'

const appointmentStore = useAppointmentStore()
const productStore = useProductStore()

const appointments = computed(() => appointmentStore.appointments)
const availableProducts = computed(() => productStore.products.filter(p => p.status !== 'out_of_stock'))

const showRecommendModal = ref(false)
const showRescheduleModal = ref(false)
const selectedAppointment = ref<Appointment | null>(null)
const selectedProducts = ref<string[]>([])
const recommendError = ref('')
const recommendSuccess = ref('')
const rescheduleError = ref('')
const rescheduleSuccess = ref('')
const rescheduleForm = ref({
  date: '',
  time: ''
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

const updateStatus = (id: string, status: Appointment['status']) => {
  appointmentStore.updateAppointment(id, { status })
}

const updatePaymentStatus = (id: string, paymentStatus: 'paid' | 'pending' | 'unpaid') => {
  appointmentStore.updateAppointment(id, { paymentStatus })
}

const openRecommendModal = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  selectedProducts.value = appointment.recommendedProducts ? [...appointment.recommendedProducts] : []
  showRecommendModal.value = true
  recommendError.value = ''
  recommendSuccess.value = ''
}

const closeRecommendModal = () => {
  showRecommendModal.value = false
  selectedAppointment.value = null
  selectedProducts.value = []
  recommendError.value = ''
  recommendSuccess.value = ''
}

const handleRecommendProducts = () => {
  if (!selectedAppointment.value) return
  
  recommendError.value = ''
  recommendSuccess.value = ''

  // Update appointment with recommended products
  appointmentStore.updateAppointment(selectedAppointment.value.id, {
    recommendedProducts: selectedProducts.value
  })

  recommendSuccess.value = 'Products recommended successfully!'
  setTimeout(() => {
    closeRecommendModal()
  }, 1500)
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

const openRescheduleModal = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  rescheduleForm.value = {
    date: appointment.date,
    time: appointment.time
  }
  rescheduleError.value = ''
  rescheduleSuccess.value = ''
  showRescheduleModal.value = true
}

const closeRescheduleModal = () => {
  showRescheduleModal.value = false
  selectedAppointment.value = null
  rescheduleForm.value = { date: '', time: '' }
  rescheduleError.value = ''
  rescheduleSuccess.value = ''
}

const getMinDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const handleReschedule = () => {
  if (!selectedAppointment.value) return

  rescheduleError.value = ''
  rescheduleSuccess.value = ''

  if (!rescheduleForm.value.date || !rescheduleForm.value.time) {
    rescheduleError.value = 'Please fill in both date and time'
    return
  }

  const selectedDateTime = new Date(`${rescheduleForm.value.date}T${rescheduleForm.value.time}`)
  const now = new Date()

  if (selectedDateTime < now) {
    rescheduleError.value = 'Cannot reschedule to a past date/time'
    return
  }

  appointmentStore.updateAppointment(selectedAppointment.value.id, {
    date: rescheduleForm.value.date,
    time: rescheduleForm.value.time
  })

  rescheduleSuccess.value = 'Appointment rescheduled successfully!'
  setTimeout(() => {
    closeRescheduleModal()
  }, 1500)
}

const confirmCancelAppointment = (appointment: Appointment) => {
  if (confirm(`Are you sure you want to cancel the appointment with ${appointment.clientName}?`)) {
    updateStatus(appointment.id, 'cancelled')
  }
}
</script>

