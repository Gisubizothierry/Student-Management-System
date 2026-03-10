<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">My Grades</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <Table :columns="gradesColumns" :data="grades" />
    </div>
  </div>
</template>

<script setup>
import Table from '@/components/common/Table.vue'

const gradesColumns = [
  { key: 'subject', label: 'Subject' },
  { key: 'exam', label: 'Exam' },
  { key: 'marks', label: 'Marks' },
  { key: 'grade', label: 'Grade' }
]

const grades = [
  { id: 1, subject: 'Mathematics', exam: 'Midterm', marks: 85, grade: 'A' },
  { id: 2, subject: 'English', exam: 'Midterm', marks: 78, grade: 'B' },
  { id: 3, subject: 'Science', exam: 'Midterm', marks: 92, grade: 'A' },
  { id: 4, subject: 'History', exam: 'Midterm', marks: 67, grade: 'C' },
]
</script>