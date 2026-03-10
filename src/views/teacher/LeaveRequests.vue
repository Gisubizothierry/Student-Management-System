<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Leave Requests</h2>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="columns" :data="requests">
        <template #cell-status="{ item }">
          <span :class="statusClass(item.status)">{{ item.status }}</span>
        </template>
        <template #actions="{ item }">
          <button v-if="item.status === 'pending'" @click="updateStatus(item.id, 'approved')" class="text-green-600 mr-3">Approve</button>
          <button v-if="item.status === 'pending'" @click="updateStatus(item.id, 'rejected')" class="text-red-600">Reject</button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/common/Table.vue'
import { useLeaveRequestsStore } from '@/stores/leaveRequests'

const store = useLeaveRequestsStore()
const requests = ref([])

const columns = [
  { key: 'studentName', label: 'Student' },
  { key: 'reason', label: 'Reason' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'status', label: 'Status' }
]

const statusClass = (status) => ({
  pending: 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800',
  approved: 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800',
  rejected: 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
}[status])

const updateStatus = (id, status) => {
  store.updateStatus(id, status)
  requests.value = store.requests
}

onMounted(() => {
  requests.value = store.requests
})
</script>