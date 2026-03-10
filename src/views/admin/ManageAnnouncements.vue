<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Announcements</h2>
      <Button @click="openModal" variant="primary">
        <Plus class="w-5 h-5 mr-2 inline" />
        New Announcement
      </Button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="columns" :data="announcements">
        <template #cell-content="{ item }">
          <div class="max-w-md truncate">{{ item.content }}</div>
        </template>
        <template #cell-target="{ item }">
          <span :class="targetClass(item.target)">{{ item.target }}</span>
        </template>
        <template #cell-createdAt="{ item }">
          {{ new Date(item.createdAt).toLocaleDateString() }}
        </template>
        <template #actions="{ item }">
          <button @click="deleteAnnouncement(item.id)" class="text-red-600 hover:text-red-900">Delete</button>
        </template>
      </Table>
    </div>

    <Modal v-model="showModal" title="New Announcement">
      <form @submit.prevent="saveAnnouncement">
        <Input v-model="form.title" label="Title" class="mb-4" />
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea v-model="form.content" rows="4" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Target</label>
          <select v-model="form.target" class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="all">All</option>
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="parents">Parents</option>
          </select>
        </div>
        <div class="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">Cancel</Button>
          <Button type="submit" variant="primary">Publish</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import { useNotificationsStore } from '@/stores/notifications'

const store = useNotificationsStore()
const announcements = ref([])

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'content', label: 'Content' },
  { key: 'target', label: 'Target' },
  { key: 'createdAt', label: 'Date' }
]

const showModal = ref(false)
const form = ref({ title: '', content: '', target: 'all' })

const targetClass = (target) => ({
  all: 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800',
  students: 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800',
  teachers: 'px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800',
  parents: 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800'
}[target])

const openModal = () => {
  form.value = { title: '', content: '', target: 'all' }
  showModal.value = true
}

const saveAnnouncement = async () => {
  await store.addAnnouncement(form.value)
  showModal.value = false
  await store.fetchAnnouncements()
  announcements.value = store.announcements
}

const deleteAnnouncement = async (id) => {
  if (confirm('Are you sure?')) {
    await store.deleteAnnouncement(id)
    announcements.value = store.announcements
  }
}

onMounted(async () => {
  await store.fetchAnnouncements()
  announcements.value = store.announcements
})
</script>