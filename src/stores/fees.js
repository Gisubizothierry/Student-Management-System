import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useFeesStore = defineStore('fees', () => {
  const feeStructures = ref([])
  const payments = ref([])

  const fetchFeeStructures = async () => {
    feeStructures.value = [
      { id: 1, term: 'Term 1', amount: 5000, dueDate: '2025-04-10' },
      { id: 2, term: 'Term 2', amount: 5000, dueDate: '2025-08-10' }
    ]
  }

  const fetchPayments = async (studentId) => {
    payments.value = [
      { id: 1, date: '2025-04-05', amount: 5000, receiptNo: 'RCP001' }
    ]
  }

  const recordPayment = async (data) => {
    const newPayment = { id: Date.now(), ...data }
    payments.value.push(newPayment)
  }

  return { feeStructures, payments, fetchFeeStructures, fetchPayments, recordPayment }
})