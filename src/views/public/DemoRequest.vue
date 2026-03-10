<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      <div class="bg-gradient-brand px-6 py-8 text-center">
        <h2 class="text-3xl font-bold text-white">Request a Demo</h2>
        <p class="text-indigo-100 mt-2">See how School MS can digitize your school</p>
      </div>
      <div class="p-8">
        <form @submit.prevent="submitDemo">
          <Input v-model="form.schoolName" label="School Name" class="mb-4" />
          <Input v-model="form.email" label="Email" type="email" class="mb-4" />
          <Input v-model="form.phone" label="Phone" class="mb-4" />
          <Input v-model="form.country" label="Country" class="mb-4" />
          <Input v-model="form.students" label="Number of Students" type="number" class="mb-4" />
          <div v-if="success" class="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            Demo request sent! We'll contact you shortly.
          </div>
          <Button type="submit" variant="gradient" class="w-full">Submit Request</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const form = ref({ schoolName: '', email: '', phone: '', country: '', students: '' })
const success = ref(false)

const submitDemo = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  success.value = true
}
</script>