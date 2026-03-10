<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Manage Classes</h2>
      <Button @click="openAddModal" variant="primary">
        <Plus class="w-5 h-5 mr-2 inline" />
        Add Class
      </Button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="columns" :data="classes">
        <template #actions="{ item }">
          <button @click="editClass(item)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
          <button @click="deleteClass(item)" class="text-red-600 hover:text-red-900">Delete</button>
        </template>
      </Table>
    </div>

    <Modal v-model="showModal" :title="modalTitle">
      <form @submit.prevent="saveClass">
        <Input v-model="form.name" label="Class Name" class="mb-4" />
        <Input v-model="form.level" label="Level" type="number" class="mb-4" />
        <Input v-model="form.academicYear" label="Academic Year" class="mb-4" />
        <div class="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
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

const columns = [
  { key: 'name', label: 'Class Name' },
  { key: 'level', label: 'Level' },
  { key: 'academicYear', label: 'Academic Year' }
]

const classes = ref([
  { id: 1, name: 'Grade 1', level: 1, academicYear: '2025-2026' },
  { id: 2, name: 'Grade 2', level: 2, academicYear: '2025-2026' },
  { id: 3, name: 'Grade 3', level: 3, academicYear: '2025-2026' },
])

const showModal = ref(false)
const modalTitle = ref('Add Class')
const form = ref({ name: '', level: '', academicYear: '' })

const openAddModal = () => {
  form.value = { name: '', level: '', academicYear: '' }
  modalTitle.value = 'Add Class'
  showModal.value = true
}

const editClass = (cls) => {
  form.value = { ...cls }
  modalTitle.value = 'Edit Class'
  showModal.value = true
}

const saveClass = () => {
  if (modalTitle.value === 'Add Class') {
    classes.value.push({ id: Date.now(), ...form.value })
  } else {
    const index = classes.value.findIndex(c => c.id === form.value.id)
    if (index !== -1) classes.value[index] = { ...classes.value[index], ...form.value }
  }
  showModal.value = false
}

const deleteClass = (cls) => {
  if (confirm('Are you sure you want to delete this class?')) {
    classes.value = classes.value.filter(c => c.id !== cls.id)
  }
}
</script>