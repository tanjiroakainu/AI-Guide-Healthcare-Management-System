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
          <h1 class="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">User Management</h1>
        </div>
        <button
          @click="showAddStaffModal = true"
          class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors font-light"
        >
          Add Staff/Doctor
        </button>
      </div>

      <!-- Add Staff Modal -->
      <div v-if="showAddStaffModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Add New Staff/Doctor</h2>
          <form @submit.prevent="handleAddStaff" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="staffForm.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter staff name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="staffForm.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                v-model="staffForm.password"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter password (min 6 characters)"
              />
            </div>
            <div v-if="addStaffError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ addStaffError }}
            </div>
            <div v-if="addStaffSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {{ addStaffSuccess }}
            </div>
            <div class="flex space-x-3">
              <button
                type="submit"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Add Staff
              </button>
              <button
                type="button"
                @click="closeAddStaffModal"
                class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit User Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Edit User</h2>
          <form @submit.prevent="handleUpdateUser" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="staffForm.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter staff name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="staffForm.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                v-model="staffForm.password"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter password (min 6 characters)"
              />
            </div>
            <div v-if="addStaffError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ addStaffError }}
            </div>
            <div v-if="addStaffSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {{ addStaffSuccess }}
            </div>
            <div class="flex space-x-3">
              <button
                type="submit"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Add Staff
              </button>
              <button
                type="button"
                @click="closeAddStaffModal"
                class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ user.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRoleClass(user.role)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.role.toUpperCase() }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="openEditModal(user)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(user)"
                    :disabled="user.id === authStore.currentUser?.id || user.id === '1'"
                    :class="[
                      user.id === authStore.currentUser?.id || user.id === '1'
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:text-red-900'
                    ]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Layout from '@/components/Layout.vue'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types'

const authStore = useAuthStore()

const users = computed(() => authStore.users)
const showAddStaffModal = ref(false)
const showEditModal = ref(false)
const addStaffError = ref('')
const addStaffSuccess = ref('')
const editError = ref('')
const editSuccess = ref('')
const deletingUserId = ref<string | null>(null)

const staffForm = ref({
  name: '',
  email: '',
  password: ''
})

const editForm = ref({
  id: '',
  name: '',
  email: '',
  role: 'client' as UserRole,
  password: ''
})

const getRoleClass = (role: UserRole) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800',
    staff: 'bg-blue-100 text-blue-800',
    client: 'bg-green-100 text-green-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const handleAddStaff = () => {
  addStaffError.value = ''
  addStaffSuccess.value = ''

  if (staffForm.value.password.length < 6) {
    addStaffError.value = 'Password must be at least 6 characters'
    return
  }

  const result = authStore.addStaff(
    staffForm.value.name,
    staffForm.value.email,
    staffForm.value.password
  )

  if (result.success) {
    addStaffSuccess.value = result.message
    staffForm.value = { name: '', email: '', password: '' }
    setTimeout(() => {
      closeAddStaffModal()
    }, 1500)
  } else {
    addStaffError.value = result.message
  }
}

const closeAddStaffModal = () => {
  showAddStaffModal.value = false
  staffForm.value = { name: '', email: '', password: '' }
  addStaffError.value = ''
  addStaffSuccess.value = ''
}

const openEditModal = (user: any) => {
  editForm.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    password: ''
  }
  showEditModal.value = true
  editError.value = ''
  editSuccess.value = ''
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = { id: '', name: '', email: '', role: 'client', password: '' }
  editError.value = ''
  editSuccess.value = ''
}

const handleUpdateUser = () => {
  editError.value = ''
  editSuccess.value = ''

  const updates: any = {
    name: editForm.value.name,
    email: editForm.value.email,
    role: editForm.value.role
  }

  if (editForm.value.password) {
    updates.password = editForm.value.password
  }

  const result = authStore.updateUser(editForm.value.id, updates)

  if (result.success) {
    editSuccess.value = result.message
    setTimeout(() => {
      closeEditModal()
    }, 1500)
  } else {
    editError.value = result.message
  }
}

const confirmDelete = (user: any) => {
  if (user.id === authStore.currentUser?.id) {
    alert('Cannot delete your own account')
    return
  }
  if (user.id === '1') {
    alert('Cannot delete default admin user')
    return
  }
  
  if (confirm(`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`)) {
    deletingUserId.value = user.id
    const result = authStore.deleteUser(user.id)
    
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
    deletingUserId.value = null
  }
}
</script>

