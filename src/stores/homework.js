import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeworkStore = defineStore('homework', () => {
  const homeworkList = ref([
    { id: 1, title: 'Math Worksheet', description: 'Page 10', classId: 1, subject: 'Math', dueDate: '2025-04-15' }
  ])

  const addHomework = (hw) => {
    homeworkList.value.push({ id: Date.now(), ...hw })
  }

  const deleteHomework = (id) => {
    homeworkList.value = homeworkList.value.filter(h => h.id !== id)
  }

  return { homeworkList, addHomework, deleteHomework }
})