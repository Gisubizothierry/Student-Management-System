<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Fee Management</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Fee Structures</h3>
      <Table :columns="structureColumns" :data="feeStructures">
        <template #actions="{ item }">
          <button @click="editStructure(item)" class="text-indigo-600 mr-3">Edit</button>
          <button @click="deleteStructure(item.id)" class="text-red-600">Delete</button>
        </template>
      </Table>
      <Button @click="openModal" variant="primary" class="mt-4">Add Fee Structure</Button>
    </div>

    <Modal v-model="showModal" :title="modalTitle">
      <form @submit.prevent="saveStructure">
        <Input v-model="form.term" label="Term" class="mb-4" />
        <Input v-model.number="form.amount" label="Amount" type="number" class="mb-4" />
        <Input v-model="form.dueDate" label="Due Date" type="date" class="mb-4" />
        <div class="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import { useFeesStore } from '@/stores/fees'

const store = useFeesStore()
const feeStructures = ref([])
const structureColumns = [
  { key: 'term', label: 'Term' },
  { key: 'amount', label: 'Amount' },
  { key: 'dueDate', label: 'Due Date' }
]

const showModal = ref(false)
const modalTitle = ref('Add Fee Structure')
const form = ref({ term: '', amount: 0, dueDate: '' })

onMounted(async () => {
  await store.fetchFeeStructures()
  feeStructures.value = store.feeStructures
})

const openModal = () => {
  form.value = { term: '', amount: 0, dueDate: '' }
  modalTitle.value = 'Add Fee Structure'
  showModal.value = true
}

const editStructure = (item) => {
  form.value = { ...item }
  modalTitle.value = 'Edit Fee Structure'
  showModal.value = true
}

const saveStructure = () => {
  if (modalTitle.value === 'Add Fee Structure') {
    store.feeStructures.push({ id: Date.now(), ...form.value })
  } else {
    const idx = store.feeStructures.findIndex(f => f.id === form.value.id)
    if (idx !== -1) store.feeStructures[idx] = { ...form.value }
  }
  feeStructures.value = store.feeStructures
  showModal.value = false
}

const deleteStructure = (id) => {
  if (confirm('Delete?')) {
    store.feeStructures = store.feeStructures.filter(f => f.id !== id)
    feeStructures.value = store.feeStructures
  }
}
</script>