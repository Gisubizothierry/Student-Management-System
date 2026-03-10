<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-gradient-brand mb-6">My Profile</h2>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <div v-else class="space-y-6">
      <!-- Personal Information Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gradient-brand px-6 py-4">
          <h3 class="text-lg font-semibold text-white flex items-center">
            <User class="w-5 h-5 mr-2" />
            Personal Information
          </h3>
        </div>
        <div class="p-6">
          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input v-model="profileForm.name" label="Full Name" />
              <Input v-model="profileForm.email" label="Email" type="email" />
              <Input v-model="profileForm.phone" label="Phone" />
              <div class="md:col-span-2">
                <PhotoUpload
                  :user-id="user.id"
                  :current-photo="user.photo"
                  @uploaded="photoUploaded"
                />
              </div>
            </div>
            <div v-if="profileSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Profile updated successfully!
            </div>
            <div class="mt-4 flex justify-end">
              <Button type="submit" variant="gradient" :disabled="profileLoading">
                {{ profileLoading ? 'Saving...' : 'Save Changes' }}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <!-- Change Password Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gradient-brand px-6 py-4">
          <h3 class="text-lg font-semibold text-white flex items-center">
            <Lock class="w-5 h-5 mr-2" />
            Change Password
          </h3>
        </div>
        <div class="p-6">
          <form @submit.prevent="changePassword">
            <div class="grid grid-cols-1 gap-4">
              <Input v-model="passwordForm.current" label="Current Password" type="password" />
              <Input v-model="passwordForm.new" label="New Password" type="password" />
              <Input v-model="passwordForm.confirm" label="Confirm New Password" type="password" />
            </div>
            <div v-if="passwordError" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {{ passwordError }}
            </div>
            <div v-if="passwordSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Password changed successfully!
            </div>
            <div class="mt-4 flex justify-end">
              <Button type="submit" variant="gradient" :disabled="passwordLoading">
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <!-- Preferences Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gradient-brand px-6 py-4">
          <h3 class="text-lg font-semibold text-white flex items-center">
            <Settings class="w-5 h-5 mr-2" />
            Preferences
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <!-- Dark Mode Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Dark Mode</p>
              <p class="text-sm text-gray-500">Switch between light and dark theme</p>
            </div>
            <button
              @click="themeStore.toggleDark"
              class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :class="themeStore.isDark ? 'bg-indigo-600' : 'bg-gray-200'"
            >
              <span
                class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                :class="themeStore.isDark ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>

          <!-- Notification Preferences -->
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Email Notifications</p>
              <p class="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <button
              @click="toggleEmailNotifications"
              class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :class="preferences.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'"
            >
              <span
                class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                :class="preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Push Notifications</p>
              <p class="text-sm text-gray-500">Receive in-app notifications</p>
            </div>
            <button
              @click="togglePushNotifications"
              class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :class="preferences.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'"
            >
              <span
                class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                :class="preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity Card -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gradient-brand px-6 py-4">
          <h3 class="text-lg font-semibold text-white flex items-center">
            <Clock class="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
        </div>
        <div class="p-6">
          <ul class="space-y-4">
            <li v-for="notif in recentNotifications" :key="notif.id" class="flex items-start">
              <div class="w-2 h-2 mt-2 rounded-full bg-gradient-brand mr-3"></div>
              <div class="flex-1">
                <p class="text-sm text-gray-800">{{ notif.message }}</p>
                <p class="text-xs text-gray-500">{{ formatTime(notif.time) }}</p>
              </div>
            </li>
            <li v-if="recentNotifications.length === 0" class="text-gray-500 text-sm">
              No recent activity
            </li>
          </ul>
        </div>
      </div>

      <!-- Account Status (admin only) -->
      <div v-if="user.role === 'admin'" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gradient-brand px-6 py-4">
          <h3 class="text-lg font-semibold text-white flex items-center">
            <Shield class="w-5 h-5 mr-2" />
            Account Status
          </h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Account Type</p>
              <p class="font-medium capitalize">{{ user.role }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <span
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ user.status || 'active' }}
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-500">Member Since</p>
              <p class="font-medium">{{ user.createdAt || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Last Login</p>
              <p class="font-medium">{{ user.lastLogin || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { User, Lock, Settings, Clock, Shield } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useNotificationsStore } from '@/stores/notifications'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import PhotoUpload from '@/components/common/PhotoUpload.vue'

// Stores
const authStore = useAuthStore()
const themeStore = useThemeStore()
const notificationsStore = useNotificationsStore()

// User data
const user = computed(() => authStore.user)

// State
const loading = ref(false)
const error = ref(null)

// Profile form
const profileForm = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || ''
})
const profileLoading = ref(false)
const profileSuccess = ref(false)

// Password form
const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})
const passwordLoading = ref(false)
const passwordError = ref('')
const passwordSuccess = ref(false)

// Preferences
const preferences = reactive({
  emailNotifications: localStorage.getItem('emailNotifications') === 'true',
  pushNotifications: localStorage.getItem('pushNotifications') === 'true'
})

// Recent notifications
const recentNotifications = computed(() => {
  return notificationsStore.notifications.slice(0, 5)
})

// Update profile
const updateProfile = async () => {
  profileLoading.value = true
  profileSuccess.value = false
  error.value = null

  try {
    await authStore.updateProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    })
    profileSuccess.value = true
    setTimeout(() => { profileSuccess.value = false }, 3000)
  } catch (err) {
    error.value = 'Failed to update profile'
  } finally {
    profileLoading.value = false
  }
}

// Photo uploaded callback
const photoUploaded = (url) => {
  authStore.updateProfile({ photo: url })
}

// Change password
const changePassword = async () => {
  passwordError.value = ''
  passwordSuccess.value = false

  // Validation
  if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
    passwordError.value = 'All fields are required'
    return
  }
  if (passwordForm.new !== passwordForm.confirm) {
    passwordError.value = 'New passwords do not match'
    return
  }
  if (passwordForm.new.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return
  }

  passwordLoading.value = true
  try {
    // Mock API call – replace with real
    await new Promise(resolve => setTimeout(resolve, 500))
    // Simulate success
    passwordSuccess.value = true
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
    setTimeout(() => { passwordSuccess.value = false }, 3000)
  } catch (err) {
    passwordError.value = 'Current password is incorrect'
  } finally {
    passwordLoading.value = false
  }
}

// Toggle preferences
const toggleEmailNotifications = () => {
  preferences.emailNotifications = !preferences.emailNotifications
  localStorage.setItem('emailNotifications', preferences.emailNotifications)
}

const togglePushNotifications = () => {
  preferences.pushNotifications = !preferences.pushNotifications
  localStorage.setItem('pushNotifications', preferences.pushNotifications)
}

// Format time for notifications
const formatTime = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now - d) / 60000) // minutes
  if (diff < 1) return 'Just now'
  if (diff < 60) return `${diff} min ago`
  if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`
  return d.toLocaleDateString()
}

// Load notifications
onMounted(() => {
  notificationsStore.fetchNotifications()
})
</script>