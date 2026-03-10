<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Fee Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Fee Structure</h3>
        <Table :columns="structureColumns" :data="feeStructures" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Payment History</h3>
        <Table :columns="paymentColumns" :data="payments" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/common/Table.vue'
import { useFeesStore } from '@/stores/fees'

const store = useFeesStore()
const feeStructures = ref([])
const payments = ref([])
const structureColumns = [
  { key: 'term', label: 'Term' },
  { key: 'amount', label: 'Amount' },
  { key: 'dueDate', label: 'Due Date' }
]
const paymentColumns = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'receiptNo', label: 'Receipt No' }
]

onMounted(async () => {
  await store.fetchFeeStructures()
  await store.fetchPayments(3) // student id
  feeStructures.value = store.feeStructures
  payments.value = store.payments
})
</script>