<template>
  <Layout>
    <div class="max-w-2xl mx-auto">
      <div class="space-y-6">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <button
              @click="$router.push('/client')"
              class="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Book Appointment</h1>
              <p class="text-slate-600 mt-2 font-light">Schedule a new appointment with the clinic</p>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="date" class="block text-sm font-light text-slate-700 mb-2">
                Date
              </label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                required
                :min="minDate"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              />
            </div>

            <div>
              <label for="time" class="block text-sm font-light text-slate-700 mb-2">
                Time
              </label>
              <input
                id="time"
                v-model="form.time"
                type="time"
                required
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              />
            </div>

            <div>
              <label for="paymentMethod" class="block text-sm font-light text-slate-700 mb-2">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                v-model="form.paymentMethod"
                required
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
              >
                <option value="">Select Payment Method</option>
                <option value="gcash">GCash</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div>
              <label for="notes" class="block text-sm font-light text-slate-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                v-model="form.notes"
                rows="4"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white resize-none"
                placeholder="Any additional information..."
              ></textarea>
            </div>

            <div v-if="error" class="bg-red-50/80 border border-red-200/80 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ error }}
            </div>

            <div v-if="success" class="bg-green-50/80 border border-green-200/80 text-green-700 px-4 py-3 rounded-lg text-sm">
              Appointment booked successfully!
            </div>

            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-light"
              >
                {{ loading ? 'Booking...' : 'Book Appointment' }}
              </button>
              <router-link
                to="/client/appointments"
                class="px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-center font-light text-slate-700"
              >
                Cancel
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useAppointmentStore } from '@/stores/appointments'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const form = ref({
  date: '',
  time: '',
  paymentMethod: '' as 'gcash' | 'cash' | '',
  notes: ''
})

const error = ref('')
const success = ref(false)
const loading = ref(false)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const handleSubmit = async () => {
  error.value = ''
  success.value = false
  loading.value = true

  try {
    if (!authStore.currentUser) {
      error.value = 'You must be logged in to book an appointment'
      return
    }

    appointmentStore.addAppointment({
      clientId: authStore.currentUser.id,
      clientName: authStore.currentUser.name,
      clientEmail: authStore.currentUser.email,
      date: form.value.date,
      time: form.value.time,
      status: 'pending',
      paymentMethod: form.value.paymentMethod as 'gcash' | 'cash',
      paymentStatus: 'pending',
      notes: form.value.notes || undefined
    })

    success.value = true
    form.value = { date: '', time: '', paymentMethod: '', notes: '' }

    setTimeout(() => {
      router.push('/client/appointments')
    }, 1500)
  } catch (err) {
    error.value = 'Failed to book appointment. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

