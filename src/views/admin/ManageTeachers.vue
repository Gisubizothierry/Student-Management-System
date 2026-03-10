<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Manage Teachers</h2>
      <Button @click="openAddModal" variant="primary">
        <Plus class="w-5 h-5 mr-2 inline" />
        Add Teacher
      </Button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="columns" :data="teachers">
        <template #cell-photo="{ item }">
          <img v-if="item.photo" :src="item.photo" class="h-10 w-10 rounded-full object-cover" />
          <div v-else class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            {{ item.name.charAt(0) }}
          </div>
        </template>
        <template #cell-status="{ item }">
          <span :class="statusClass(item.status)">{{ item.status }}</span>
        </template>
        <template #actions="{ item }">
          <button @click="editTeacher(item)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
          <button @click="toggleStatus(item)" class="text-red-600 hover:text-red-900">
            {{ item.status === 'active' ? 'Deactivate' : 'Activate' }}
          </button>
        </template>
      </Table>
    </div>

    <Modal v-model="showModal" :title="modalTitle">
      <form @submit.prevent="saveTeacher">
        <Input v-model="form.name" label="Full Name" class="mb-4" />
        <Input v-model="form.email" label="Email" type="email" class="mb-4" />
        <Input v-model="form.phone" label="Phone" class="mb-4" />
        <Input v-model="form.subject" label="Subject" class="mb-4" />
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
  { key: 'photo', label: 'Photo' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' }
]

const teachers = ref([
  { id: 1, name: 'John Teacher', email: 'john@school.com', phone: '1234567890', subject: 'Math', status: 'active', photo: null },
  { id: 2, name: 'Jane Teacher', email: 'jane@school.com', phone: '0987654321', subject: 'English', status: 'active', photo: null },
])

const showModal = ref(false)
const modalTitle = ref('Add Teacher')
const form = ref({ name: '', email: '', phone: '', subject: '' })

const openAddModal = () => {
  form.value = { name: '', email: '', phone: '', subject: '' }
  modalTitle.value = 'Add Teacher'
  showModal.value = true
}

const editTeacher = (teacher) => {
  form.value = { ...teacher }
  modalTitle.value = 'Edit Teacher'
  showModal.value = true
}

const saveTeacher = () => {
  if (modalTitle.value === 'Add Teacher') {
    teachers.value.push({ id: Date.now(), ...form.value, status: 'active', photo: null })
  } else {
    const index = teachers.value.findIndex(t => t.id === form.value.id)
    if (index !== -1) teachers.value[index] = { ...teachers.value[index], ...form.value }
  }
  showModal.value = false
}

const toggleStatus = (teacher) => {
  teacher.status = teacher.status === 'active' ? 'inactive' : 'active'
}

const statusClass = (status) => {
  return status === 'active'
    ? 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'
    : 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
}
</script>