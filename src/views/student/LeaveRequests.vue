<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Leave Requests</h2>
      <Button @click="openModal" variant="primary">
        <Plus class="w-5 h-5 mr-2 inline" />
        New Request
      </Button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="columns" :data="requests">
        <template #cell-status="{ item }">
          <span :class="statusClass(item.status)">{{ item.status }}</span>
        </template>
      </Table>
    </div>

    <Modal v-model="showModal" title="New Leave Request">
      <form @submit.prevent="submitRequest">
        <Input v-model="form.reason" label="Reason" class="mb-4" />
        <div class="grid grid-cols-2 gap-4">
          <Input v-model="form.startDate" type="date" label="Start Date" />
          <Input v-model="form.endDate" type="date" label="End Date" />
        </div>
        <div class="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">Cancel</Button>
          <Button type="submit" variant="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import { useLeaveRequestsStore } from '@/stores/leaveRequests'

const store = useLeaveRequestsStore()
const requests = ref(store.requests.filter(r => r.studentId === 3)) // filter for current student

const columns = [
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

const showModal = ref(false)
const form = ref({ reason: '', startDate: '', endDate: '' })

const submitRequest = () => {
  store.addRequest({ ...form.value, studentId: 3 })
  requests.value = store.requests.filter(r => r.studentId === 3)
  showModal.value = false
}
</script>