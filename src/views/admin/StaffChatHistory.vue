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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">Staff Chat History</h1>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl overflow-hidden">
        <div class="p-4 sm:p-6 border-b border-slate-200/60">
          <label class="block text-sm font-light text-slate-700 mb-2">Select Staff/Doctor:</label>
          <select
            v-model="selectedStaffId"
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-400 outline-none transition bg-white"
          >
            <option value="">All Staff/Doctors</option>
            <option
              v-for="staff in staffMembers"
              :key="staff.id"
              :value="staff.id"
            >
              {{ staff.name }} ({{ staff.email }})
            </option>
          </select>
        </div>

        <div class="p-4 sm:p-6">
          <div v-if="filteredMessages.length === 0" class="text-center text-slate-500 py-8 font-light">
            No chat messages found for selected staff member.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="message in filteredMessages"
              :key="message.id"
              class="border border-slate-200/60 rounded-xl p-4 bg-white/50"
            >
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <div>
                  <span class="font-light text-slate-900">{{ message.senderName }}</span>
                  <span class="text-xs text-slate-500 ml-2 font-light">({{ message.senderRole }})</span>
                </div>
                <span class="text-xs text-slate-500 font-light">{{ formatDateTime(message.timestamp) }}</span>
              </div>
              <div class="mb-2">
                <span class="text-xs sm:text-sm text-slate-600 font-light">To: </span>
                <span class="text-xs sm:text-sm font-light text-slate-900">
                  {{ message.receiverName || 'All Users (Broadcast)' }}
                </span>
              </div>
              <div class="text-slate-800 bg-slate-50/50 p-3 rounded-lg font-light text-sm leading-relaxed">
                {{ message.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Layout from '@/components/Layout.vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'

const chatStore = useChatStore()
const authStore = useAuthStore()

const selectedStaffId = ref('')

const staffMembers = computed(() => {
  return authStore.users.filter(u => u.role === 'staff')
})

const filteredMessages = computed(() => {
  const allMessages = chatStore.getAllMessages()
  
  if (selectedStaffId.value) {
    return allMessages.filter(m => m.senderId === selectedStaffId.value)
  }
  
  return allMessages.filter(m => {
    const sender = authStore.users.find(u => u.id === m.senderId)
    return sender?.role === 'staff'
  })
})

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
</script>

