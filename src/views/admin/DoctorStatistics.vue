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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Doctor Appointment Statistics</h1>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="p-4 sm:p-6 border-b border-slate-200/60">
          <p class="text-xs sm:text-sm text-slate-600 font-light">View appointment statistics for each doctor in the system</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200/60">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider">
                  Pending
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                  Confirmed
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                  Completed
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                  Cancelled
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden xl:table-cell">
                  With Recommendations
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-light text-slate-600 uppercase tracking-wider hidden xl:table-cell">
                  Total Products Recommended
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200/60">
              <tr v-for="doctor in doctorStats" :key="doctor.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-3 sm:px-6 py-4">
                  <div class="text-xs sm:text-sm font-light text-slate-900">{{ doctor.name }}</div>
                  <div class="text-xs text-slate-500 md:hidden font-light mt-1">{{ doctor.email }}</div>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-600 font-light hidden md:table-cell">
                  {{ doctor.email }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {{ doctor.total }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                    {{ doctor.pending }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-green-50 text-green-700 border border-green-200">
                    {{ doctor.confirmed }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {{ doctor.completed }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-red-50 text-red-700 border border-red-200">
                    {{ doctor.cancelled }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {{ doctor.withRecommendations }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                  <span class="px-2 sm:px-3 py-1 text-xs font-light rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {{ doctor.totalRecommendedProducts }}
                  </span>
                </td>
              </tr>
              <tr v-if="doctorStats.length === 0">
                <td colspan="9" class="px-6 py-4 text-center text-slate-500 font-light text-sm">
                  No doctors found in the system
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Total Doctors</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ totalDoctors }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Total Appointments</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ totalAppointments }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Average per Doctor</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ averagePerDoctor }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-light text-slate-600">Total Recommendations</p>
              <p class="text-xl sm:text-2xl font-light text-slate-900 mt-2">{{ totalRecommendations }}</p>
            </div>
            <div class="p-3 bg-slate-100 rounded-full">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
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

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const doctors = computed(() => {
  return authStore.users.filter(u => u.role === 'staff')
})

const doctorStats = computed(() => {
  return doctors.value.map(doctor => {
    const allAppointments = appointmentStore.appointments
    const appointmentsWithRecommendations = allAppointments.filter(a => 
      a.recommendedProducts && a.recommendedProducts.length > 0
    )
    
    return {
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      total: allAppointments.length,
      pending: allAppointments.filter(a => a.status === 'pending').length,
      confirmed: allAppointments.filter(a => a.status === 'confirmed').length,
      completed: allAppointments.filter(a => a.status === 'completed').length,
      cancelled: allAppointments.filter(a => a.status === 'cancelled').length,
      withRecommendations: appointmentsWithRecommendations.length,
      totalRecommendedProducts: appointmentsWithRecommendations.reduce((sum, a) => 
        sum + (a.recommendedProducts?.length || 0), 0
      )
    }
  })
})

const totalDoctors = computed(() => doctors.value.length)
const totalAppointments = computed(() => appointmentStore.appointments.length)
const averagePerDoctor = computed(() => {
  if (totalDoctors.value === 0) return 0
  return Math.round(totalAppointments.value / totalDoctors.value)
})
const totalRecommendations = computed(() => {
  return appointmentStore.appointments.reduce((sum, appointment) => {
    return sum + (appointment.recommendedProducts?.length || 0)
  }, 0)
})
</script>

