<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Library Management</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <Table :columns="bookColumns" :data="books">
        <template #cell-available="{ item }">
          <span :class="item.available ? 'text-green-600' : 'text-red-600'">
            {{ item.available ? 'Yes' : 'No' }}
          </span>
        </template>
        <template #actions="{ item }">
          <button @click="toggleAvailability(item)" class="text-indigo-600 mr-3">
            {{ item.available ? 'Mark Unavailable' : 'Mark Available' }}
          </button>
          <button @click="deleteBook(item.id)" class="text-red-600">Delete</button>
        </template>
      </Table>
      <Button @click="openModal" variant="primary" class="mt-4">Add Book</Button>
    </div>

    <Modal v-model="showModal" title="Add Book">
      <form @submit.prevent="addBook">
        <Input v-model="form.title" label="Title" class="mb-4" />
        <Input v-model="form.author" label="Author" class="mb-4" />
        <Input v-model="form.isbn" label="ISBN" class="mb-4" />
        <div class="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">Cancel</Button>
          <Button type="submit" variant="primary">Add</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import { useLibraryStore } from '@/stores/library'

const store = useLibraryStore()
const books = ref(store.books)
const bookColumns = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'isbn', label: 'ISBN' },
  { key: 'available', label: 'Available' }
]

const showModal = ref(false)
const form = ref({ title: '', author: '', isbn: '' })

const openModal = () => {
  form.value = { title: '', author: '', isbn: '' }
  showModal.value = true
}

const addBook = () => {
  store.books.push({ id: Date.now(), ...form.value, available: true })
  books.value = store.books
  showModal.value = false
}

const toggleAvailability = (book) => {
  book.available = !book.available
}

const deleteBook = (id) => {
  if (confirm('Delete book?')) {
    store.books = store.books.filter(b => b.id !== id)
    books.value = store.books
  }
}
</script>