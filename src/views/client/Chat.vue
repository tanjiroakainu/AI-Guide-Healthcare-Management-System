<template>
  <Layout>
    <div class="space-y-6">
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
        <h1 class="text-xl sm:text-2xl font-light text-slate-900 tracking-tight">Chat System</h1>
      </div>
      <Chat />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import Chat from '@/components/Chat.vue'
</script>

