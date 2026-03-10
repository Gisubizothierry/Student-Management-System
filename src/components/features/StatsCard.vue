<template>
  <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group">
    <div class="flex items-center">
      <div :class="`p-3 bg-${color}-100 rounded-full group-hover:scale-110 transition`">
        <component :is="iconComponent" :class="`w-6 h-6 text-${color}-600`" />
      </div>
      <div class="ml-4">
        <p class="text-sm text-gray-500">{{ title }}</p>
        <p class="text-2xl font-bold">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  title: String,
  value: [Number, String],
  icon: String,
  color: { type: String, default: 'indigo' }
})

const iconComponent = computed(() => icons[props.icon])
</script>