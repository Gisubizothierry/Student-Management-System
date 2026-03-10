<template>
  <router-link :to="to" class="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center">
    <component :is="iconComponent" class="w-8 h-8 text-indigo-600 mr-3" />
    <span>{{ title }}</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  to: String,
  icon: String,
  title: String
})

const iconComponent = computed(() => icons[props.icon])
</script>