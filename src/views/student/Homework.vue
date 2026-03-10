<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">My Homework</h2>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="homeworkColumns" :data="homeworkList">
        <template #cell-dueDate="{ item }">
          {{ new Date(item.dueDate).toLocaleDateString() }}
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/common/Table.vue'
import { useHomeworkStore } from '@/stores/homework'

const store = useHomeworkStore()
const homeworkList = ref(store.homeworkList.filter(h => h.classId === 1)) // filter for student's class
const homeworkColumns = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'subject', label: 'Subject' },
  { key: 'dueDate', label: 'Due Date' }
]
</script>