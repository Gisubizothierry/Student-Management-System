import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const events = ref([
    { id: 1, title: 'Holiday', date: '2025-04-10', type: 'holiday' },
    { id: 2, title: 'Exam', date: '2025-04-15', type: 'exam' }
  ])

  return { events }
})