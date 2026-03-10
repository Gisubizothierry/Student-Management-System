import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransportStore = defineStore('transport', () => {
  const routes = ref([
    { id: 1, name: 'Route A', stops: ['Stop 1', 'Stop 2'], driver: 'Mr. X' }
  ])

  return { routes }
})