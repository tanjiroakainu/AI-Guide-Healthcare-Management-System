import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole } from '@/types'
import router from '@/router'

// Default users
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'staff@gmail.com',
    password: 'staff123',
    role: 'staff',
    name: 'Staff User'
  },
  {
    id: '3',
    email: 'client@gmail.com',
    password: 'client123',
    role: 'client',
    name: 'Client User'
  }
]

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const users = ref<User[]>([...defaultUsers])
  const appointments = ref<any[]>([])

  const isAuthenticated = computed(() => currentUser.value !== null)
  const userRole = computed(() => currentUser.value?.role || null)

  function login(email: string, password: string): boolean {
    // Ensure users are loaded
    if (users.value.length === 0) {
      loadUsers()
    }
    
    // Normalize email and password (trim whitespace, lowercase email)
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()
    
    const user = users.value.find(
      u => u.email.trim().toLowerCase() === normalizedEmail && u.password.trim() === normalizedPassword
    )
    
    if (user) {
      currentUser.value = { ...user }
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
      return true
    }
    return false
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  function checkAuth() {
    const stored = localStorage.getItem('currentUser')
    if (stored) {
      const user = JSON.parse(stored)
      // If the stored user is a student, log them out
      if (user.email && user.email.toLowerCase() === 'student@gmail.com') {
        localStorage.removeItem('currentUser')
        currentUser.value = null
      } else {
        currentUser.value = user
      }
    }
  }

  function hasRole(role: UserRole): boolean {
    return currentUser.value?.role === role
  }

  function canAccess(roles: UserRole[]): boolean {
    return currentUser.value ? roles.includes(currentUser.value.role) : false
  }

  function register(name: string, email: string, password: string): { success: boolean; message: string } {
    // Normalize inputs (trim whitespace, lowercase email)
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()
    const normalizedName = name.trim()
    
    // Validate inputs
    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return { success: false, message: 'All fields are required' }
    }
    
    if (normalizedPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }
    
    // Check if email already exists (case-insensitive)
    if (users.value.find(u => u.email.trim().toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Email already exists' }
    }

    // Only allow client registration
    const newUser: User = {
      id: Date.now().toString(),
      email: normalizedEmail,
      password: normalizedPassword,
      role: 'client',
      name: normalizedName
    }

    users.value.push(newUser)
    saveUsers()
    return { success: true, message: 'Registration successful' }
  }

  function addStaff(name: string, email: string, password: string): { success: boolean; message: string } {
    // Normalize inputs (trim whitespace, lowercase email)
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()
    const normalizedName = name.trim()
    
    // Validate inputs
    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return { success: false, message: 'All fields are required' }
    }
    
    if (normalizedPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }
    
    // Check if email already exists (case-insensitive)
    if (users.value.find(u => u.email.trim().toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Email already exists' }
    }

    const newStaff: User = {
      id: Date.now().toString(),
      email: normalizedEmail,
      password: normalizedPassword,
      role: 'staff',
      name: normalizedName
    }

    users.value.push(newStaff)
    saveUsers()
    return { success: true, message: 'Staff member added successfully' }
  }

  function updateUser(userId: string, updates: { name?: string; email?: string; password?: string; role?: UserRole }): { success: boolean; message: string } {
    const userIndex = users.value.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return { success: false, message: 'User not found' }
    }

    // Normalize email if provided
    if (updates.email) {
      const normalizedEmail = updates.email.trim().toLowerCase()
      // Check if email already exists (excluding current user, case-insensitive)
      if (users.value.find(u => u.email.trim().toLowerCase() === normalizedEmail && u.id !== userId)) {
        return { success: false, message: 'Email already exists' }
      }
      users.value[userIndex].email = normalizedEmail
    }

    // Update user
    if (updates.name) users.value[userIndex].name = updates.name.trim()
    if (updates.password) {
      const normalizedPassword = updates.password.trim()
      if (normalizedPassword.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' }
      }
      users.value[userIndex].password = normalizedPassword
    }
    if (updates.role) users.value[userIndex].role = updates.role

    // Update current user if it's the same user
    if (currentUser.value?.id === userId) {
      currentUser.value = { ...users.value[userIndex] }
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    }

    saveUsers()
    return { success: true, message: 'User updated successfully' }
  }

  function deleteUser(userId: string): { success: boolean; message: string } {
    // Prevent deleting current user
    if (currentUser.value?.id === userId) {
      return { success: false, message: 'Cannot delete your own account' }
    }

    const userIndex = users.value.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return { success: false, message: 'User not found' }
    }

    // Prevent deleting default admin user
    if (userId === '1') {
      return { success: false, message: 'Cannot delete default admin user' }
    }

    users.value.splice(userIndex, 1)
    saveUsers()
    return { success: true, message: 'User deleted successfully' }
  }

  function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  function loadUsers() {
    const stored = localStorage.getItem('users')
    if (stored) {
      try {
        const loadedUsers = JSON.parse(stored)
        // Normalize existing users (trim and lowercase emails, trim passwords and names)
        const normalizedUsers = loadedUsers.map((u: User) => ({
          ...u,
          email: u.email.trim().toLowerCase(),
          password: u.password.trim(),
          name: u.name.trim()
        }))
        
        // Remove any student users (student@gmail.com)
        const filteredUsers = normalizedUsers.filter((u: User) => 
          u.email.toLowerCase() !== 'student@gmail.com'
        )
        
        // Merge with default users to ensure defaults are always present
        const defaultUserEmails = defaultUsers.map(u => u.email.toLowerCase())
        const existingUsers = filteredUsers.filter((u: User) => !defaultUserEmails.includes(u.email.toLowerCase()))
        users.value = [...defaultUsers, ...existingUsers]
      } catch (e) {
        // If parsing fails, use default users
        users.value = [...defaultUsers]
      }
    } else {
      users.value = [...defaultUsers]
    }
    // Always save to ensure consistency (this will normalize all users and remove student)
    saveUsers()
  }

  // Initialize users
  loadUsers()

  return {
    currentUser,
    users,
    appointments,
    isAuthenticated,
    userRole,
    login,
    logout,
    checkAuth,
    hasRole,
    canAccess,
    register,
    addStaff,
    updateUser,
    deleteUser
  }
})

