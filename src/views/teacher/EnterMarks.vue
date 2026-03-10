<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Enter Marks</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select v-model="selectedExam" class="border rounded-lg px-3 py-2">
          <option value="">Select Exam</option>
          <option v-for="exam in exams" :key="exam.id" :value="exam.id">
            {{ exam.name }} - {{ exam.subject }}
          </option>
        </select>
      </div>

      <Table v-if="students.length" :columns="marksColumns" :data="students">
        <template #cell-marks="{ item }">
          <input v-model.number="item.marks" type="number" class="border rounded px-2 py-1 w-20" />
        </template>
      </Table>

      <Button @click="submitMarks" class="mt-6" variant="primary">Submit Marks</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'

const marksColumns = [
  { key: 'name', label: 'Student Name' },
  { key: 'marks', label: 'Marks' }
]

const exams = ref([
  { id: 1, name: 'Midterm', subject: 'Math' },
  { id: 2, name: 'Final', subject: 'English' }
])
const selectedExam = ref('')
const students = ref([])

watch(selectedExam, () => {
  if (selectedExam.value) {
    students.value = [
      { id: 1, name: 'John Doe', marks: 0 },
      { id: 2, name: 'Jane Smith', marks: 0 }
    ]
  } else {
    students.value = []
  }
})

const submitMarks = () => {
  console.log('Marks:', students.value)
  alert('Marks saved (mock)')
}
</script>