<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Transport</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <Table :columns="routeColumns" :data="routes" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/common/Table.vue'
import { useTransportStore } from '@/stores/transport'

const store = useTransportStore()
const routes = ref(store.routes)
const routeColumns = [
  { key: 'name', label: 'Route Name' },
  { key: 'stops', label: 'Stops' },
  { key: 'driver', label: 'Driver' }
]
</script>