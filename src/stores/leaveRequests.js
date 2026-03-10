import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaveRequestsStore = defineStore('leaveRequests', () => {
  const requests = ref([
    { id: 1, studentId: 3, studentName: 'Jane Student', reason: 'Sick', startDate: '2025-04-05', endDate: '2025-04-06', status: 'pending' }
  ])

  const addRequest = (request) => {
    requests.value.push({ id: Date.now(), ...request, status: 'pending' })
    // Mock email to teacher
    console.log('Email sent to teacher about new leave request')
  }

  const updateStatus = (id, status) => {
    const req = requests.value.find(r => r.id === id)
    if (req) {
      req.status = status
      // Mock email to student
      console.log(`Email sent to student: Your leave request has been ${status}`)
    }
  }

  return { requests, addRequest, updateStatus }
})