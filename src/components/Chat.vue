<template>
  <div class="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col" style="height: calc(100vh - 200px); min-height: 600px;">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white shadow-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">Chat System</h2>
            <p class="text-sm opacity-90">{{ selectedReceiverName || 'Select a user to chat' }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-sm">Online</span>
        </div>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-6 space-y-4" ref="messagesContainer" :style="chatBackgroundStyle">
      <div
        v-for="message in displayMessages"
        :key="message.id"
        :class="[
          'flex items-end space-x-2',
          message.senderId === currentUser?.id ? 'flex-row-reverse space-x-reverse' : ''
        ]"
      >
        <!-- Avatar -->
        <div
          :class="[
            'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm shadow-md',
            message.senderId === currentUser?.id
              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
              : getRoleColor(message.senderRole)
          ]"
        >
          {{ message.senderName.charAt(0).toUpperCase() }}
        </div>

        <!-- Message Bubble -->
        <div
          :class="[
            'max-w-xs lg:max-w-md relative group',
            message.senderId === currentUser?.id ? 'ml-auto' : ''
          ]"
        >
          <div
            :class="[
              'px-4 py-3 rounded-2xl shadow-md transition-all duration-200',
              message.senderId === currentUser?.id
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
            ]"
          >
            <!-- Sender Info (only for received messages) -->
            <div
              v-if="message.senderId !== currentUser?.id"
              class="text-xs font-semibold mb-1 opacity-90"
            >
              {{ message.senderName }}
              <span class="text-xs opacity-75 ml-1">({{ message.senderRole }})</span>
            </div>

            <!-- Message Content -->
            <div v-if="editingMessageId !== message.id" class="break-words">
              {{ message.message }}
            </div>
            
            <!-- Edit Mode -->
            <div v-else class="space-y-2">
              <input
                v-model="editMessageText"
                @keyup.enter="saveEdit"
                @keyup.esc="cancelEdit"
                type="text"
                :class="[
                  'w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  message.senderId === currentUser?.id
                    ? 'bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70'
                    : 'bg-gray-100 text-gray-900'
                ]"
                placeholder="Edit message..."
                autofocus
              />
              <div class="flex space-x-2">
                <button
                  @click="saveEdit"
                  class="text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit"
                  :class="[
                    'text-xs px-3 py-1.5 rounded-lg transition-colors font-medium',
                    message.senderId === currentUser?.id
                      ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  Cancel
                </button>
              </div>
            </div>

            <!-- Timestamp and Edit Indicator -->
            <div
              :class="[
                'flex items-center justify-end space-x-1 mt-1.5 text-xs',
                message.senderId === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
              ]"
            >
              <span>{{ formatTime(message.timestamp) }}</span>
              <span v-if="message.updatedAt" class="italic opacity-75">(edited)</span>
            </div>

            <!-- Edit/Delete Buttons -->
            <div
              v-if="canEditOrDelete(message)"
              :class="[
                'absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                message.senderId === currentUser?.id ? 'right-0' : 'left-0'
              ]"
            >
              <div class="flex space-x-1 bg-white rounded-lg shadow-lg p-1 border border-gray-200">
                <button
                  @click="startEdit(message)"
                  class="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit message"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteMessage(message)"
                  class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete message"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!selectedReceiver" class="flex flex-col items-center justify-center h-full py-12">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <p class="text-gray-500 font-medium">Select a user to start chatting</p>
        <p class="text-sm text-gray-400 mt-1">Choose a user from the dropdown below</p>
      </div>
      <div v-else-if="displayMessages.length === 0" class="flex flex-col items-center justify-center h-full py-12">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p class="text-gray-500 font-medium">No messages yet</p>
        <p class="text-sm text-gray-400 mt-1">Start the conversation with {{ selectedReceiverName }}</p>
      </div>
    </div>

    <!-- Input Area -->
    <div class="bg-white border-t border-gray-200 p-4">
      <!-- User Selection -->
      <div class="mb-3 space-y-2">
        <div class="flex items-center space-x-2">
          <div class="flex-1">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search user..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
          <div class="flex-1">
            <select
              v-model="selectedReceiver"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white"
              required
            >
              <option value="">Select a user to start chatting...</option>
              <optgroup v-if="filteredClients.length > 0" label="Clients">
                <option
                  v-for="user in filteredClients"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }} (Client)
                </option>
              </optgroup>
              <optgroup v-if="filteredStaff.length > 0" label="Staff/Doctors">
                <option
                  v-for="user in filteredStaff"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }} (Doctor)
                </option>
              </optgroup>
              <optgroup v-if="filteredAdmins.length > 0" label="Admins">
                <option
                  v-for="user in filteredAdmins"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }} (Admin)
                </option>
              </optgroup>
            </select>
          </div>
        </div>
        <p v-if="searchQuery && filteredClients.length === 0 && filteredStaff.length === 0 && filteredAdmins.length === 0" class="text-xs text-red-500 px-1">
          No users found matching "{{ searchQuery }}"
        </p>
      </div>

      <!-- Message Input -->
      <div class="flex items-end space-x-3">
        <div class="flex-1 relative">
          <textarea
            v-model="newMessage"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.enter.shift.exact="newMessage += '\n'"
            rows="1"
            placeholder="Type your message..."
            class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
            style="min-height: 48px; max-height: 120px;"
            @input="autoResize"
            ref="messageInput"
          ></textarea>
        </div>
        <button
          @click="sendMessage"
          :disabled="!newMessage.trim() || !selectedReceiver"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center space-x-2 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'

const chatStore = useChatStore()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.currentUser)
const newMessage = ref('')
const selectedReceiver = ref('')
const searchQuery = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const editingMessageId = ref<string | null>(null)
const editMessageText = ref('')
const messageInput = ref<HTMLTextAreaElement | null>(null)

const selectedReceiverName = computed(() => {
  if (!selectedReceiver.value) return 'All Users'
  const user = authStore.users.find(u => u.id === selectedReceiver.value)
  return user?.name || 'Unknown User'
})

const getRoleColor = (role: string) => {
  const colors = {
    admin: 'bg-gradient-to-br from-purple-500 to-purple-600',
    staff: 'bg-gradient-to-br from-blue-500 to-blue-600',
    client: 'bg-gradient-to-br from-green-500 to-green-600'
  }
  return colors[role as keyof typeof colors] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
}

const chatBackgroundStyle = computed(() => {
  const pattern = encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#f3f4f6" fill-opacity="0.4"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')
  return {
    backgroundImage: `url('data:image/svg+xml,${pattern}')`
  }
})

const availableUsers = computed(() => {
  if (!currentUser.value) return []
  return authStore.users.filter(u => u.id !== currentUser.value?.id)
})

const clients = computed(() => {
  if (!currentUser.value) return []
  return authStore.users.filter(u => u.id !== currentUser.value?.id && u.role === 'client')
})

const staff = computed(() => {
  if (!currentUser.value) return []
  return authStore.users.filter(u => u.id !== currentUser.value?.id && u.role === 'staff')
})

const admins = computed(() => {
  if (!currentUser.value) return []
  return authStore.users.filter(u => u.id !== currentUser.value?.id && u.role === 'admin')
})

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value
  const query = searchQuery.value.toLowerCase()
  return clients.value.filter(u => u.name.toLowerCase().includes(query))
})

const filteredStaff = computed(() => {
  if (!searchQuery.value) return staff.value
  const query = searchQuery.value.toLowerCase()
  return staff.value.filter(u => u.name.toLowerCase().includes(query))
})

const filteredAdmins = computed(() => {
  if (!searchQuery.value) return admins.value
  const query = searchQuery.value.toLowerCase()
  return admins.value.filter(u => u.name.toLowerCase().includes(query))
})

const displayMessages = computed(() => {
  if (!currentUser.value) return []
  
  const allMessages = chatStore.getAllMessages()
  
  // If no receiver selected, show empty (like Messenger - need to select a conversation)
  if (!selectedReceiver.value) {
    return []
  }
  
  // Show only messages between current user and selected receiver (one-on-one conversation)
  // This includes:
  // 1. Messages sent by current user to selected receiver
  // 2. Messages sent by selected receiver to current user
  return allMessages
    .filter(m => {
      // Direct messages between current user and selected receiver
      const isDirectMessage = 
        (m.senderId === currentUser.value?.id && m.receiverId === selectedReceiver.value) ||
        (m.senderId === selectedReceiver.value && m.receiverId === currentUser.value?.id)
      
      return isDirectMessage
    })
    .sort((a, b) => {
      // Sort by timestamp (oldest first)
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    })
})

const sendMessage = () => {
  if (!newMessage.value.trim() || !currentUser.value || !selectedReceiver.value) {
    return
  }

  const receiver = authStore.users.find(u => u.id === selectedReceiver.value)
  
  if (!receiver) {
    return
  }

  chatStore.addMessage({
    senderId: currentUser.value.id,
    senderName: currentUser.value.name,
    senderRole: currentUser.value.role,
    receiverId: receiver.id,
    receiverName: receiver.name,
    message: newMessage.value.trim()
  })

  newMessage.value = ''
  scrollToBottom()
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(displayMessages, () => {
  scrollToBottom()
})

const canEditOrDelete = (message: any) => {
  if (!currentUser.value) return false
  // Allow if user is the sender or if user is admin
  return message.senderId === currentUser.value.id || currentUser.value.role === 'admin'
}

const startEdit = (message: any) => {
  editingMessageId.value = message.id
  editMessageText.value = message.message
}

const cancelEdit = () => {
  editingMessageId.value = null
  editMessageText.value = ''
}

const saveEdit = () => {
  if (!editingMessageId.value || !editMessageText.value.trim()) return
  
  const result = chatStore.updateMessage(editingMessageId.value, editMessageText.value.trim())
  if (result) {
    editingMessageId.value = null
    editMessageText.value = ''
  }
}

const confirmDeleteMessage = (message: any) => {
  if (confirm('Are you sure you want to delete this message?')) {
    chatStore.deleteMessage(message.id)
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

