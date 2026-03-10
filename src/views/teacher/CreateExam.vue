<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Create Exam</h2>
    <div class="bg-white p-6 rounded-lg shadow max-w-lg">
      <form @submit.prevent="handleSubmit">
        <Input v-model="form.name" label="Exam Name" class="mb-4" />
        <div class="grid grid-cols-2 gap-4 mb-4">
          <select v-model="form.classId" class="border rounded-lg px-3 py-2">
            <option value="">Select Class</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
          </select>
          <select v-model="form.subjectId" class="border rounded-lg px-3 py-2">
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="eng">English</option>
          </select>
        </div>
        <Input v-model="form.date" type="date" label="Exam Date" class="mb-4" />
        <Input v-model.number="form.maxMarks" type="number" label="Maximum Marks" class="mb-4" />
        <Button type="submit" variant="primary">Create Exam</Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const form = ref({
  name: '',
  classId: '',
  subjectId: '',
  date: '',
  maxMarks: 100
})

const handleSubmit = async () => {
  console.log('Create exam:', form.value)
  // await api.post('/exams', form.value)
  alert('Exam created (mock)')
}
</script>