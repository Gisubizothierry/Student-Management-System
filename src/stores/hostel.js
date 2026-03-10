import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHostelStore = defineStore('hostel', () => {
  const rooms = ref([
    { id: 1, number: '101', capacity: 2, occupants: ['John'] }
  ])

  return { rooms }
})