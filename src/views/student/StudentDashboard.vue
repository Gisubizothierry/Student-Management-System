<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Student Dashboard</h2>
    <div class="mb-4 p-4 bg-indigo-50 rounded-lg">
      <p class="text-lg font-medium">Class: {{ selectedClass?.name }}</p>
      <p class="text-gray-600">Teacher: {{ selectedClass?.teacher }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Profile Card -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">My Profile</h3>
        <div class="flex items-center">
          <div class="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl">
            {{ user?.name?.charAt(0) }}
          </div>
          <div class="ml-4">
            <p class="font-medium">{{ user?.name }}</p>
            <p class="text-gray-600">{{ selectedClass?.name }}</p>
            <p class="text-gray-600">Admission: S001</p>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
        <div class="space-y-2">
          <router-link to="/student/attendance" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            View Attendance
          </router-link>
          <router-link to="/student/grades" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            View Grades
          </router-link>
          <router-link to="/student/report-card" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            Report Card
          </router-link>
        </div>
      </div>

      <!-- Recent Attendance (filtered by class) -->
      <div class="bg-white p-6 rounded-lg shadow md:col-span-2">
        <h3 class="text-lg font-semibold mb-4">Recent Attendance</h3>
        <Table :columns="attendanceColumns" :data="filteredAttendance">
          <template #cell-status="{ item }">
            <span :class="statusClass(item.status)">{{ item.status }}</span>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Table from '@/components/common/Table.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const selectedClass = computed(() => authStore.selectedClass)

const attendanceColumns = [
  { key: 'date', label: 'Date' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' }
]

const allAttendance = [
  { id: 1, date: '2025-03-01', subject: 'Mathematics', status: 'present', classId: 1 },
  { id: 2, date: '2025-03-02', subject: 'English', status: 'late', classId: 1 },
  { id: 3, date: '2025-03-03', subject: 'Science', status: 'absent', classId: 2 },
  { id: 4, date: '2025-03-04', subject: 'History', status: 'present', classId: 1 },
]

const filteredAttendance = computed(() => {
  if (!selectedClass.value) return []
  return allAttendance.filter(a => a.classId === selectedClass.value.id)
})

const statusClass = (status) => ({
  present: 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800',
  absent: 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800',
  late: 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800'
}[status])
</script>