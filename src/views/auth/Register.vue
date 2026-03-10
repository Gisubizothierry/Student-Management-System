<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <!-- Main Card -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="w-full max-w-md"
    >
      <!-- Logo / Branding -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          School MS
        </h1>
        <p class="text-gray-500 mt-2">Student Management System</p>
      </div>

      <!-- Registration Form Card -->
      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <form @submit.prevent="handleRegister">
          <!-- Name Field -->
          <div class="mb-4" v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }">
            <input
              v-model="name"
              type="text"
              placeholder="Full Name"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
            />
          </div>

          <!-- Email Field -->
          <div class="mb-4" v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
            />
          </div>

          <!-- Password Field -->
          <div class="mb-4" v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, transition: { delay: 300 } }">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
            />
          </div>

          <!-- Role Selection -->
          <div class="mb-4" v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, transition: { delay: 400 } }">
            <select
              v-model="role"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors"
            >
              <option disabled value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <!-- School/Class Selector (only for students) -->
          <div v-if="role === 'student'" class="mb-4" v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, transition: { delay: 500 } }">
            <select
              v-model="studentClass"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors"
            >
              <option disabled value="">Select Your Class</option>
              <option v-for="cls in classes" :key="cls" :value="cls">{{ cls }}</option>
            </select>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-4 text-sm text-red-500 text-center" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1 }">
            {{ error }}
          </div>

          <!-- Register Button -->
          <div v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Registering...' : 'Register' }}
            </button>
          </div>
        </form>

        <!-- Already have account -->
        <div class="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-indigo-600 font-semibold hover:text-indigo-800 ml-1">
            Log in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const studentClass = ref('')
const error = ref('')
const loading = ref(false)

// Example list of classes
const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4']

const handleRegister = async () => {
  error.value = ''
  loading.value = true

  if (!name.value || !email.value || !password.value || !role.value || (role.value === 'student' && !studentClass.value)) {
    error.value = 'Please fill all required fields.'
    loading.value = false
    return
  }

  const response = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    studentClass: studentClass.value
  })

  loading.value = false

  if (response.success) {
    router.push({ path: '/login', query: { registered: 'true' } })
  } else {
    error.value = response.message
  }
}
</script>

<style scoped>
input::placeholder, select::placeholder {
  color: #8e8e8e;
  font-size: 14px;
}
</style>