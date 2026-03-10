import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGradesStore = defineStore('grades', () => {
  const grades = ref([])

  const fetchGrades = async () => {
    grades.value = [
      { id: 1, studentId: 1, examId: 1, marksObtained: 85, remarks: 'Good' },
      { id: 2, studentId: 2, examId: 1, marksObtained: 92, remarks: 'Excellent' }
    ]
  }

  const addGrade = (grade) => {
    grade.id = Date.now()
    grades.value.push(grade)
  }

  const updateGrade = (updated) => {
    const index = grades.value.findIndex(g => g.id === updated.id)
    if (index !== -1) grades.value[index] = updated
  }

  const getGradesByStudent = (studentId) => {
    return grades.value.filter(g => g.studentId === studentId)
  }

  return { grades, fetchGrades, addGrade, updateGrade, getGradesByStudent }
})