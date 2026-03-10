<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Child Progress</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <p>Student: Jane Student (Grade 1)</p>
      <div class="mt-4">
        <h3 class="font-semibold">Attendance</h3>
        <Table :columns="attColumns" :data="attendance" />
      </div>
      <div class="mt-4">
        <h3 class="font-semibold">Grades</h3>
        <Table :columns="gradeColumns" :data="grades" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/common/Table.vue'

const attColumns = [
  { key: 'date', label: 'Date' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' }
]
const attendance = ref([
  { date: '2025-03-01', subject: 'Math', status: 'present' }
])

const gradeColumns = [
  { key: 'subject', label: 'Subject' },
  { key: 'marks', label: 'Marks' }
]
const grades = ref([
  { subject: 'Math', marks: 85 }
])
</script>