import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Appointment } from '@/types'

export const useAppointmentStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([])

  function loadAppointments() {
    const stored = localStorage.getItem('appointments')
    if (stored) {
      appointments.value = JSON.parse(stored)
    }
  }

  function saveAppointments() {
    localStorage.setItem('appointments', JSON.stringify(appointments.value))
  }

  function addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    appointments.value.push(newAppointment)
    saveAppointments()
    return newAppointment
  }

  function updateAppointment(id: string, updates: Partial<Appointment>) {
    const index = appointments.value.findIndex(a => a.id === id)
    if (index !== -1) {
      appointments.value[index] = {
        ...appointments.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveAppointments()
      return appointments.value[index]
    }
    return null
  }

  function deleteAppointment(id: string) {
    const index = appointments.value.findIndex(a => a.id === id)
    if (index !== -1) {
      appointments.value.splice(index, 1)
      saveAppointments()
      return true
    }
    return false
  }

  function getAppointmentById(id: string) {
    return appointments.value.find(a => a.id === id)
  }

  function getAppointmentsByClient(clientId: string) {
    return appointments.value.filter(a => a.clientId === clientId)
  }

  loadAppointments()

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    getAppointmentsByClient,
    loadAppointments
  }
})

