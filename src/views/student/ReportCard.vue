<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">My Report Card</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="mb-4 flex justify-between">
        <div>
          <p class="text-lg font-semibold">{{ student.name }}</p>
          <p class="text-gray-600">Class: {{ student.class }} | Admission: {{ student.admissionNo }}</p>
        </div>
        <Button @click="downloadPDF" variant="secondary">Download PDF</Button>
      </div>

      <div v-for="exam in exams" :key="exam.id" class="mb-6">
        <h3 class="text-lg font-semibold mb-2">{{ exam.name }} ({{ exam.date }})</h3>
        <Table :columns="gradeColumns" :data="exam.grades" />
        <p class="mt-2 text-right font-medium">Total: {{ exam.total }} / {{ exam.maxMarks }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'

const student = ref({})
const exams = ref([])
const gradeColumns = [
  { key: 'subject', label: 'Subject' },
  { key: 'marks', label: 'Marks Obtained' },
  { key: 'grade', label: 'Grade' }
]

onMounted(() => {
  student.value = { name: 'Jane Student', class: 'Grade 1', admissionNo: 'S001' }
  exams.value = [
    {
      id: 1,
      name: 'Midterm',
      date: '2025-03-15',
      grades: [
        { subject: 'Mathematics', marks: 85, grade: 'A' },
        { subject: 'English', marks: 78, grade: 'B' }
      ],
      total: 163,
      maxMarks: 200
    }
  ]
})

const downloadPDF = () => alert('PDF download (mock)')
</script>