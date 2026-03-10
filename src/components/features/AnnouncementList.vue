<template>
  <div>
    <div v-for="ann in announcements" :key="ann.id" class="border-b last:border-0 py-2">
      <p class="font-medium">{{ ann.title }}</p>
      <p class="text-sm text-gray-600">{{ ann.content }}</p>
      <p class="text-xs text-gray-400">{{ ann.createdAt }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  announcements: Array,
  limit: { type: Number, default: 0 }
})
</script>