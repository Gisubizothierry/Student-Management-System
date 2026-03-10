<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">My Attendance</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <Table :columns="attendanceColumns" :data="filteredAttendance">
        <template #cell-status="{ item }">
          <span :class="statusClass(item.status)">{{ item.status }}</span>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Table from '@/components/common/Table.vue'

const authStore = useAuthStore()
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