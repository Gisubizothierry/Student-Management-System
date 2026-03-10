<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      <div class="bg-indigo-600 px-6 py-8 text-center">
        <h2 class="text-3xl font-bold text-white">Select Your Class</h2>
        <p class="text-indigo-100 mt-2">Welcome, {{ user?.name }}</p>
      </div>
      <div class="p-8">
        <div v-if="loading" class="text-center py-4">Loading classes...</div>
        <div v-else>
          <div v-if="classes.length === 0" class="text-center text-gray-500 py-4">
            No classes assigned.
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="cls in classes"
              :key="cls.id"
              @click="selectClass(cls)"
              class="p-4 border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors"
            >
              <h3 class="font-semibold text-lg">{{ cls.name }}</h3>
              <p class="text-sm text-gray-600">{{ cls.teacher }} • {{ cls.academicYear }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user

const classes = ref([])
const loading = ref(true)

const fetchClasses = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  classes.value = [
    { id: 1, name: 'Grade 1A', teacher: 'Mr. Smith', academicYear: '2025-2026' },
    { id: 2, name: 'Grade 1B', teacher: 'Ms. Jones', academicYear: '2025-2026' },
  ]
  loading.value = false
}

const selectClass = (cls) => {
  authStore.setSelectedClass(cls)
  router.push('/student')
}

onMounted(fetchClasses)
</script>