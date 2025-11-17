<template>
  <!-- Floating Button -->
  <button
    @click="toggleChatbot"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
    :class="{ 'animate-pulse': !isOpen }"
    aria-label="Open AI Assistant"
  >
    <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span v-if="!isOpen" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
  </button>

  <!-- Chatbot Window -->
  <div
    v-if="isOpen"
    class="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-40 h-[600px] max-h-[calc(100vh-6rem)] bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 class="text-white font-light text-lg">AI Assistant</h3>
          <p class="text-white/80 text-xs font-light">Always here to help</p>
        </div>
      </div>
      <button
        @click="toggleChatbot"
        class="text-white/80 hover:text-white transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
      <!-- Welcome Message -->
      <div v-if="!selectedChoice" class="space-y-4">
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div class="flex-1 bg-white/80 border border-slate-200/60 rounded-2xl rounded-tl-sm p-4 shadow-sm">
            <p class="text-slate-700 font-light leading-relaxed">
              👋 Hello! I'm your AI assistant. I'm here to provide information about our Healthcare Management System. 
              Choose a topic below to learn more:
            </p>
          </div>
        </div>

        <!-- Choice Buttons -->
        <div class="grid grid-cols-1 gap-2 mt-4">
          <button
            v-for="choice in choices"
            :key="choice.id"
            @click="handleChoice(choice)"
            class="text-left p-3 bg-white/80 border border-slate-200/60 rounded-xl hover:border-slate-300 hover:bg-slate-50/50 transition-all duration-200 group"
          >
            <div class="font-light text-slate-800 group-hover:text-slate-900">{{ choice.label }}</div>
          </button>
        </div>
      </div>

      <!-- Selected Response -->
      <div v-else class="space-y-4">
        <!-- User's Choice -->
        <div class="flex items-start space-x-3 justify-end">
          <div class="flex-1 bg-slate-900 text-white rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-sm">
            <p class="font-light text-sm">{{ selectedChoice.label }}</p>
          </div>
          <div class="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <!-- AI Response -->
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div class="flex-1 bg-white/80 border border-slate-200/60 rounded-2xl rounded-tl-sm p-4 shadow-sm">
            <div class="text-slate-700 font-light leading-relaxed whitespace-pre-line text-sm">
              {{ selectedChoice.response }}
            </div>
            <div v-if="selectedChoice.action === 'view-products'" class="mt-4">
              <router-link
                to="/products"
                class="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-light"
              >
                View Products Now →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="flex justify-center pt-2">
          <button
            @click="resetChoice"
            class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-light border border-slate-200"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-3 bg-slate-50/50 border-t border-slate-200/60">
      <p class="text-xs text-slate-500 font-light text-center">
        💡 This is an informational AI assistant. For real-time chat, please log in.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppointmentStore } from '@/stores/appointments'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const isOpen = ref(false)
const selectedChoice = ref<{ label: string; response: string; action?: string } | null>(null)

const toggleChatbot = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    selectedChoice.value = null
  }
}

const totalAppointments = computed(() => appointmentStore.appointments.length)
const totalUsers = computed(() => authStore.users.length)
const totalClients = computed(() => authStore.users.filter(u => u.role === 'client').length)
const totalStaff = computed(() => authStore.users.filter(u => u.role === 'staff').length)
const pendingAppointments = computed(() => 
  appointmentStore.appointments.filter(a => a.status === 'pending').length
)
const confirmedAppointments = computed(() => 
  appointmentStore.appointments.filter(a => a.status === 'confirmed').length
)

const choices = [
  {
    id: '1',
    label: '📊 System Statistics & Analytics',
    action: 'stats'
  },
  {
    id: '2',
    label: '📅 How to Book an Appointment',
    action: 'book'
  },
  {
    id: '3',
    label: '👥 Understanding User Roles',
    action: 'roles'
  },
  {
    id: '4',
    label: '🔐 Registration Guide',
    action: 'register'
  },
  {
    id: '5',
    label: '💬 Chat System Features',
    action: 'chat'
  },
  {
    id: '6',
    label: '🛍️ Product Market & Purchases',
    action: 'products'
  },
  {
    id: '7',
    label: '🛒 View Available Products',
    action: 'view-products'
  },
  {
    id: '8',
    label: '❓ General Information',
    action: 'info'
  }
]

const handleChoice = (choice: any) => {
  let response = ''

  switch (choice.action) {
    case 'stats':
      response = `📊 System Statistics & Analytics

Current System Overview:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Appointments:
   • Total: ${totalAppointments.value}
   • Pending: ${pendingAppointments.value}
   • Confirmed: ${confirmedAppointments.value}

👥 Users:
   • Total Users: ${totalUsers.value}
   • Clients: ${totalClients.value}
   • Staff/Doctors: ${totalStaff.value}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 These statistics are updated in real-time based on current system activity. The numbers reflect live data from the Healthcare Management System.`
      break
    case 'book':
      response = `📅 How to Book an Appointment

Step-by-Step Guide:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Registration
   • Click "Register as Client" on the home page
   • Fill in your details (name, email, password)
   • Complete the registration form

2️⃣ Login
   • Use your registered credentials
   • Access your client dashboard

3️⃣ Book Appointment
   • Click "Book Appointment" from dashboard
   • Select your preferred date and time
   • Choose payment method (GCash or Cash)
   • Add any special notes or requirements

4️⃣ Confirmation
   • Your request will be reviewed by staff
   • You'll receive confirmation once approved
   • Check appointment status in your dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Tip: You can view and manage all your appointments from the "My Appointments" section.`
      break
    case 'roles':
      response = `👥 Understanding User Roles

Role-Based Access Control:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 ADMINISTRATOR
   • Full system access and control
   • Manage all appointments
   • User management (add/edit/delete)
   • Add staff/doctors to the system
   • View comprehensive statistics
   • Product management
   • Staff chat history monitoring

🟡 STAFF/DOCTOR
   • View and manage appointments
   • Confirm pending appointments
   • Mark appointments as completed
   • Reschedule or cancel appointments
   • Recommend products to clients
   • Chat with clients and admin
   • View appointment history

🟢 CLIENT
   • Book new appointments
   • View personal appointments
   • Cancel own appointments
   • View appointment history
   • Browse and purchase products
   • View purchase history
   • Chat with staff and admin
   • Update profile information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Each role has specific permissions designed to ensure smooth clinic operations.`
      break
    case 'register':
      response = `🔐 Registration Guide

Getting Started:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Access Registration
   • Click "Register" button on home page
   • Or use the "Register as Client" button

2️⃣ Fill Required Information
   • Full Name (as it appears on ID)
   • Email Address (must be unique)
   • Password (minimum 6 characters)
   • Confirm Password

3️⃣ Submit & Verify
   • Review your information
   • Submit the registration form
   • You'll be redirected to login

4️⃣ First Login
   • Use your registered credentials
   • Access your client dashboard
   • Start booking appointments!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Important Notes:
• Registration is only for clients
• Staff and admin accounts are created by administrators
• Use a secure password
• Keep your login credentials safe

💡 Need help? Contact support through the chat system after logging in.`
      break
    case 'chat':
      response = `💬 Chat System Features

Real-Time Communication:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📨 Communication Channels:
   • Clients ↔ Staff/Doctors
   • Clients ↔ Admin
   • Staff ↔ Admin

✨ Key Features:
   • Real-time messaging
   • Private conversations
   • Message history (saved)
   • Search functionality
   • Edit and delete messages (admin)
   • Messenger-style interface

🎯 How to Use:
   1. Log in to your account
   2. Navigate to "Chat" from dashboard
   3. Select a user to start conversation
   4. Type and send messages
   5. View conversation history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Each conversation is isolated and saved, just like modern messaging apps. You can pick up where you left off anytime!`
      break
    case 'products':
      response = `🛍️ Product Market & Purchases

Product Features:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛒 Product Market:
   • Browse available products
   • Search by name, category
   • Filter by status (in stock, low stock)
   • View product details and prices
   • Purchase products directly

💳 Purchase Options:
   • Payment methods: Cash or GCash
   • Real-time inventory updates
   • Purchase history tracking
   • Product recommendations from doctors

📦 Product Management:
   • Admin manages inventory
   • Automatic stock status updates
   • Quantity tracking
   • Category organization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Doctors can recommend products during appointments, which are then recorded in your appointment history.`
      break
    case 'view-products':
      response = `🛒 View Available Products

Browse Our Product Catalog:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You can view all available products in our system without logging in!

✨ Features:
   • Browse complete product catalog
   • Search products by name
   • Filter by category
   • Filter by stock status
   • View prices and descriptions
   • See product availability

🔐 To Purchase:
   • Register as a client, or
   • Login to your account
   • Then you can purchase products directly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 You'll be redirected to view all available products in a moment...`
      // Navigate to products page after showing message
      setTimeout(() => {
        router.push('/products')
      }, 2000)
      break
    case 'info':
      response = `❓ General Information

🏥 Healthcare Management System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A modern, comprehensive healthcare management platform built with cutting-edge technology.

✨ Key Features:
   • Role-based access control
   • Appointment booking & management
   • Real-time chat system
   • Product market & purchases
   • User management
   • Payment tracking
   • Responsive design
   • Modern minimalist UI

🛠️ Technology Stack:
   • Vue 3 with TypeScript
   • Tailwind CSS
   • Pinia State Management
   • Vue Router

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Need Help?
   • Use this AI assistant for quick answers
   • Contact support through chat (after login)
   • Check your dashboard for guides

👨‍💻 Developed by: Raminder Jangao`
      break
  }

  selectedChoice.value = {
    label: choice.label,
    response,
    action: choice.action
  }
}

const resetChoice = () => {
  selectedChoice.value = null
}
</script>

