import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSchoolsStore = defineStore('schools', () => {
  const schools = ref([])

  const registerSchool = async (schoolData) => {
    const school = {
      id: Date.now(),
      ...schoolData,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    schools.value.push(school)
    return { success: true, school }
  }

  return { schools, registerSchool }
})