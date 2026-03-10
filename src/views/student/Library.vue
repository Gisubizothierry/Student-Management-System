<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Library</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="mb-4 flex gap-4">
        <Input v-model="search" placeholder="Search by title or author" class="flex-1" />
        <Button @click="searchBooks">Search</Button>
      </div>
      <Table :columns="bookColumns" :data="filteredBooks">
        <template #cell-available="{ item }">
          <span :class="item.available ? 'text-green-600' : 'text-red-600'">
            {{ item.available ? 'Yes' : 'No' }}
          </span>
        </template>
        <template #actions="{ item }">
          <Button v-if="item.available" @click="borrowBook(item)" variant="primary" size="sm">Borrow</Button>
          <span v-else class="text-gray-500">Unavailable</span>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'
import { useLibraryStore } from '@/stores/library'

const store = useLibraryStore()
const search = ref('')
const bookColumns = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'isbn', label: 'ISBN' },
  { key: 'available', label: 'Available' }
]

const filteredBooks = computed(() => {
  if (!search.value) return store.books
  const s = search.value.toLowerCase()
  return store.books.filter(b => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s))
})

const borrowBook = (book) => {
  store.borrowBook(book.id)
}
</script>