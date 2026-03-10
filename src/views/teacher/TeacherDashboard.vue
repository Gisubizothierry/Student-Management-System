<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Teacher Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">My Classes</h3>
        <ul class="space-y-2">
          <li v-for="cls in myClasses" :key="cls.id" class="p-2 bg-gray-50 rounded">
            {{ cls.name }} - {{ cls.subject }}
          </li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
        <div class="space-y-2">
          <router-link to="/teacher/attendance" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            Take Attendance
          </router-link>
          <router-link to="/teacher/marks" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            Enter Marks
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const myClasses = ref([
  { id: 1, name: 'Grade 1', subject: 'Mathematics' },
  { id: 2, name: 'Grade 2', subject: 'English' },
])
</script>