import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClassesStore = defineStore('classes', () => {
  const classes = ref([])
  const subjects = ref([])
  const assignments = ref([])

  const fetchClasses = async () => {
    classes.value = [
      { id: 1, name: 'Grade 1', level: 1, academicYear: '2025-2026' },
      { id: 2, name: 'Grade 2', level: 2, academicYear: '2025-2026' }
    ]
  }

  const fetchSubjects = async () => {
    subjects.value = [
      { id: 1, name: 'Mathematics', code: 'MATH' },
      { id: 2, name: 'English', code: 'ENG' },
      { id: 3, name: 'Science', code: 'SCI' }
    ]
  }

  const addClass = (cls) => {
    cls.id = Date.now()
    classes.value.push(cls)
  }

  const updateClass = (updated) => {
    const index = classes.value.findIndex(c => c.id === updated.id)
    if (index !== -1) classes.value[index] = updated
  }

  const deleteClass = (id) => {
    classes.value = classes.value.filter(c => c.id !== id)
  }

  const addSubject = (subject) => {
    subject.id = Date.now()
    subjects.value.push(subject)
  }

  const assignTeacher = (teacherId, subjectId, classId) => {
    assignments.value.push({ id: Date.now(), teacherId, subjectId, classId })
  }

  return {
    classes, subjects, assignments,
    fetchClasses, fetchSubjects,
    addClass, updateClass, deleteClass,
    addSubject, assignTeacher
  }
})