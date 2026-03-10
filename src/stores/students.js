import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  const fetchStudents = async () => {
    students.value = [
      { id: 1, fullName: 'John Doe', gender: 'Male', dob: '2010-05-15', address: '123 Main St', classId: 1, admissionNo: 'S001', parentContacts: '555-1234', photo: null, status: 'active' },
      { id: 2, fullName: 'Jane Smith', gender: 'Female', dob: '2011-08-22', address: '456 Oak Ave', classId: 1, admissionNo: 'S002', parentContacts: '555-5678', photo: null, status: 'active' }
    ]
  }

  const addStudent = (student) => {
    student.id = Date.now()
    students.value.push(student)
  }

  const updateStudent = (updated) => {
    const index = students.value.findIndex(s => s.id === updated.id)
    if (index !== -1) students.value[index] = updated
  }

  const deleteStudent = (id) => {
    const student = students.value.find(s => s.id === id)
    if (student) student.status = 'inactive'
  }

  return { students, fetchStudents, addStudent, updateStudent, deleteStudent }
})