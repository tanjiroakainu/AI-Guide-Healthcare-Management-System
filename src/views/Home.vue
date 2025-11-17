<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-lg sm:text-xl font-light tracking-tight text-slate-800">Healthcare Management System</h1>
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-4 tracking-tight">Welcome to Our Clinic</h1>
        <p class="text-lg sm:text-xl text-slate-600 mb-12 font-light max-w-2xl mx-auto">Book appointments, manage your health, and connect with our medical team</p>
        
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <router-link
            to="/register"
            class="px-8 py-3.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-base transition-all duration-200 flex items-center space-x-2 group"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Register as Client</span>
          </router-link>
          <router-link
            to="/login"
            class="px-8 py-3.5 bg-white text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 font-medium text-base transition-all duration-200"
          >
            Login to Your Account
          </router-link>
        </div>
        
        <div class="bg-white/60 backdrop-blur-sm border border-slate-200/80 p-5 rounded-xl max-w-2xl mx-auto mb-12 shadow-sm">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-slate-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-left">
              <p class="font-medium text-slate-900 mb-1">New to our clinic?</p>
              <p class="text-sm text-slate-600 leading-relaxed">Register as a client to book appointments, view your medical history, and chat with our doctors. Registration is quick and free!</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-16 pt-8 border-t border-slate-200/50 text-center">
        <p class="text-sm text-slate-500 font-light">
          Developed by <span class="font-medium text-slate-800">Raminder Jangao</span>
        </p>
      </div>
    </div>

    <!-- Floating AI Assistant -->
    <Chatbot />
  </div>
</template>

<script setup lang="ts">
import Chatbot from '@/components/Chatbot.vue'
</script>


