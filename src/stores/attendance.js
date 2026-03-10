import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttendanceStore = defineStore('attendance', () => {
  const records = ref([])

  const fetchAttendance = async () => {
    records.value = [
      { id: 1, studentId: 1, classId: 1, subjectId: 1, date: '2025-04-01', status: 'present', time: '09:00' },
      { id: 2, studentId: 2, classId: 1, subjectId: 1, date: '2025-04-01', status: 'absent', time: '09:00' },
      { id: 3, studentId: 1, classId: 1, subjectId: 2, date: '2025-04-02', status: 'late', time: '10:30' }
    ]
  }

  const addAttendance = (record) => {
    record.id = Date.now()
    records.value.push(record)
  }

  const updateAttendance = (id, status) => {
    const rec = records.value.find(r => r.id === id)
    if (rec) rec.status = status
  }

  const getAttendanceByStudent = (studentId) => {
    return records.value.filter(r => r.studentId === studentId)
  }

  return { records, fetchAttendance, addAttendance, updateAttendance, getAttendanceByStudent }
})