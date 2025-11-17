import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatMessage } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])

  function loadMessages() {
    const stored = localStorage.getItem('chatMessages')
    if (stored) {
      messages.value = JSON.parse(stored)
    }
  }

  function saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(messages.value))
  }

  function addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    messages.value.push(newMessage)
    saveMessages()
    return newMessage
  }

  function getMessagesForUser(userId: string) {
    return messages.value.filter(
      m => m.senderId === userId || m.receiverId === userId || !m.receiverId
    )
  }

  function getAllMessages() {
    return messages.value
  }

  function updateMessage(messageId: string, newMessage: string) {
    const messageIndex = messages.value.findIndex(m => m.id === messageId)
    if (messageIndex !== -1) {
      messages.value[messageIndex].message = newMessage
      messages.value[messageIndex].updatedAt = new Date().toISOString()
      saveMessages()
      return messages.value[messageIndex]
    }
    return null
  }

  function deleteMessage(messageId: string) {
    const messageIndex = messages.value.findIndex(m => m.id === messageId)
    if (messageIndex !== -1) {
      messages.value.splice(messageIndex, 1)
      saveMessages()
      return true
    }
    return false
  }

  loadMessages()

  return {
    messages,
    addMessage,
    getMessagesForUser,
    getAllMessages,
    updateMessage,
    deleteMessage
  }
})

