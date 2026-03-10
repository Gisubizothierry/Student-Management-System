<template>
  <div class="bg-white p-4 rounded shadow">
    <div class="grid grid-cols-7 gap-1 text-center font-semibold">
      <div v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="day">{{ day }}</div>
    </div>
    <div class="grid grid-cols-7 gap-1 mt-2">
      <div v-for="(day, idx) in days" :key="idx"
           class="p-2 border rounded"
           :class="{ 'bg-indigo-100': hasEvent(day.date) }">
        {{ day.day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  events: Array,
  year: Number,
  month: Number // 1-12
})

const days = computed(() => {
  // generate days for the month – simplified mock
  return Array.from({ length: 30 }, (_, i) => ({ date: `2025-04-${i+1}`, day: i+1 }))
})

const hasEvent = (date) => {
  return props.events?.some(e => e.date === date)
}
</script>