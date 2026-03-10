<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Hostel</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <Table :columns="roomColumns" :data="rooms" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/common/Table.vue'
import { useHostelStore } from '@/stores/hostel'

const store = useHostelStore()
const rooms = ref(store.rooms)
const roomColumns = [
  { key: 'number', label: 'Room No' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'occupants', label: 'Occupants' }
]
</script>