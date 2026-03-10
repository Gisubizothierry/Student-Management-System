<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      <div class="bg-gradient-brand px-6 py-8 text-center">
        <h2 class="text-3xl font-bold text-white">School Sign Up</h2>
        <p class="text-indigo-100 mt-2">Create your school account</p>
      </div>
      <div class="p-8">
        <form @submit.prevent="handleSignup">
          <Input v-model="form.schoolName" label="School Name" class="mb-4" />
          <Input v-model="form.adminName" label="Admin Name" class="mb-4" />
          <Input v-model="form.email" label="Email" type="email" class="mb-4" />
          <Input v-model="form.password" label="Password" type="password" class="mb-4" />
          <Input v-model="form.confirmPassword" label="Confirm Password" type="password" class="mb-6" />
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{{ error }}</div>
          <div v-if="success" class="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            School registered! Check your email for activation.
          </div>
          <Button type="submit" variant="gradient" class="w-full">Register School</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import { useSchoolsStore } from '@/stores/schools'

const router = useRouter()
const schoolsStore = useSchoolsStore()
const form = ref({ schoolName: '', adminName: '', email: '', password: '', confirmPassword: '' })
const error = ref('')
const success = ref(false)

const handleSignup = async () => {
  error.value = ''
  if (!form.value.schoolName || !form.value.adminName || !form.value.email || !form.value.password) {
    error.value = 'All fields required'
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  const response = await schoolsStore.registerSchool(form.value)
  if (response.success) {
    success.value = true
    setTimeout(() => router.push('/login'), 2000)
  } else {
    error.value = 'Registration failed'
  }
}
</script>