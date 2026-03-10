<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Take Attendance</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select v-model="selectedClass" class="border rounded-lg px-3 py-2">
          <option value="">Select Class</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
        </select>
        <select v-model="selectedSubject" class="border rounded-lg px-3 py-2">
          <option value="">Select Subject</option>
          <option value="math">Mathematics</option>
          <option value="eng">English</option>
        </select>
        <input type="date" v-model="attendanceDate" class="border rounded-lg px-3 py-2" />
      </div>

      <Table v-if="classStudents.length" :columns="attendanceColumns" :data="classStudents">
        <template #cell-status="{ item }">
          <select v-model="item.attendance" class="border rounded px-2 py-1">
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </template>
      </Table>

      <Button @click="submitAttendance" class="mt-6" variant="primary">
        Submit Attendance
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'

const selectedClass = ref('')
const selectedSubject = ref('')
const attendanceDate = ref(new Date().toISOString().split('T')[0])

const attendanceColumns = [
  { key: 'name', label: 'Student Name' },
  { key: 'status', label: 'Status' }
]

const classStudents = ref([])

watch(selectedClass, (newVal) => {
  if (newVal) {
    classStudents.value = [
      { id: 1, name: 'John Doe', attendance: 'present' },
      { id: 2, name: 'Jane Smith', attendance: 'present' },
    ]
  } else {
    classStudents.value = []
  }
})

const submitAttendance = () => {
  console.log('Attendance submitted', {
    class: selectedClass.value,
    subject: selectedSubject.value,
    date: attendanceDate.value,
    students: classStudents.value
  })
  alert('Attendance recorded (mock)')
}
</script>