<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <!-- Main Card -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="w-full max-w-sm"
    >
      <!-- Registration success message (Instagram‑style) -->
      <div
        v-if="registered"
        v-motion
        :initial="{ opacity: 0, y: -10 }"
        :enter="{ opacity: 1, y: 0 }"
        class="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm text-center"
      >
        Registration successful! Please log in.
      </div>

      <!-- Logo / Branding -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          School MS
        </h1>
        <p class="text-gray-500 mt-2">Student Management System</p>
      </div>

      <!-- Login Form Card -->
      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <form @submit.prevent="handleLogin">
          <!-- Email Field -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -10 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
            class="mb-4"
          >
            <input
              v-model="email"
              type="text"
              placeholder="Email"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
            />
          </div>

          <!-- Password Field -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -10 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 300 } }"
            class="mb-4"
          >
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :enter="{ opacity: 1, scale: 1 }"
            class="mb-4 text-sm text-red-500 text-center"
          >
            {{ error }}
          </div>

          <!-- Login Button -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          >
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Logging in...' : 'Log In' }}
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-1 h-px bg-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">OR</span>
          <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <!-- Forgot Password -->
        <div class="text-center">
          <a
            href="#"
            @click.prevent="forgotPassword"
            class="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 500 } }"
        class="mt-4 bg-white border border-gray-200 rounded-lg p-4 text-center"
      >
        <span class="text-gray-600">Don't have an account?</span>
        <router-link
          to="/register"
          class="ml-1 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const registered = ref(route.query.registered === 'true')

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  const response = await authStore.login(email.value, password.value)
  loading.value = false
  if (response.success) {
    const role = response.user.role
    if (role === 'admin') router.push('/admin')
    else if (role === 'teacher') router.push('/teacher')
    else router.push('/select-class')
  } else {
    error.value = response.message
  }
}

const forgotPassword = () => {
  alert('Password reset feature coming soon!')
}
</script>

<style scoped>
input::placeholder {
  color: #8e8e8e;
  font-size: 14px;
}
</style>