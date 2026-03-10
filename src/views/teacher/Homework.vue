<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Homework Assignments</h2>
      <Button @click="openModal" variant="primary">
        <Plus class="w-5 h-5 mr-2 inline" />
        Assign Homework
      </Button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="homeworkColumns" :data="homeworkList">
        <template #cell-dueDate="{ item }">
          {{ new Date(item.dueDate).toLocaleDateString() }}
        </template>
        <template #actions="{ item }">
          <button @click="editHomework(item)" class="text-indigo-600 mr-3">Edit</button>
          <button @click="deleteHomework(item.id)" class="text-red-600">Delete</button>
        </template>
      </Table>
    </div>

    <Modal v-model="showModal" :title="modalTitle">
      <form @submit.prevent="saveHomework">
        <Input v-model="form.title" label="Title" class="mb-4" />
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea v-model="form.description" rows="3" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <select v-model="form.classId" class="border rounded-lg px-3 py-2">
            <option value="">Select Class</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
          </select>
          <select v-model="form.subject" class="border rounded-lg px-3 py-2">
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
          </select>
        </div>
        <Input v-model="form.dueDate" type="date" label="Due Date" class="mb-4" />
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
import { useHomeworkStore } from '@/stores/homework'

const store = useHomeworkStore()
const homeworkList = ref(store.homeworkList)
const homeworkColumns = [
  { key: 'title', label: 'Title' },
  { key: 'classId', label: 'Class' },
  { key: 'subject', label: 'Subject' },
  { key: 'dueDate', label: 'Due Date' }
]

const showModal = ref(false)
const modalTitle = ref('Assign Homework')
const form = ref({ title: '', description: '', classId: '', subject: '', dueDate: '' })

const openModal = () => {
  form.value = { title: '', description: '', classId: '', subject: '', dueDate: '' }
  modalTitle.value = 'Assign Homework'
  showModal.value = true
}

const editHomework = (hw) => {
  form.value = { ...hw }
  modalTitle.value = 'Edit Homework'
  showModal.value = true
}

const saveHomework = () => {
  if (modalTitle.value === 'Assign Homework') {
    store.addHomework({ ...form.value, id: Date.now() })
  } else {
    const idx = store.homeworkList.findIndex(h => h.id === form.value.id)
    if (idx !== -1) store.homeworkList[idx] = { ...form.value }
  }
  homeworkList.value = store.homeworkList
  showModal.value = false
}

const deleteHomework = (id) => {
  if (confirm('Delete?')) {
    store.deleteHomework(id)
    homeworkList.value = store.homeworkList
  }
}
</script>