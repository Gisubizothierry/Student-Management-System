import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeachersStore = defineStore('teachers', () => {
  const teachers = ref([])

  const fetchTeachers = async () => {
    teachers.value = [
      { id: 1, fullName: 'Mr. Smith', email: 'smith@school.com', phone: '555-1111', subjects: ['Math', 'Physics'], photo: null, status: 'active' },
      { id: 2, fullName: 'Ms. Jones', email: 'jones@school.com', phone: '555-2222', subjects: ['English'], photo: null, status: 'active' }
    ]
  }

  const addTeacher = (teacher) => {
    teacher.id = Date.now()
    teachers.value.push(teacher)
  }

  const updateTeacher = (updated) => {
    const index = teachers.value.findIndex(t => t.id === updated.id)
    if (index !== -1) teachers.value[index] = updated
  }

  const deleteTeacher = (id) => {
    const teacher = teachers.value.find(t => t.id === id)
    if (teacher) teacher.status = 'inactive'
  }

  return { teachers, fetchTeachers, addTeacher, updateTeacher, deleteTeacher }
})