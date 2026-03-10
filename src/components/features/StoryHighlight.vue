<template>
  <div class="flex flex-col items-center gap-2 cursor-pointer group">
    <div
      :class="[
        'w-16 h-16 rounded-full border-2 p-0.5 transition-all duration-200',
        hasUnseen ? 'border-pink-500' : 'border-gray-300 group-hover:border-gray-400'
      ]"
    >
      <div
        :class="[
          'w-full h-full rounded-full flex items-center justify-center overflow-hidden',
          bgClass
        ]"
      >
        <img
          v-if="image"
          :src="image"
          :alt="title"
          class="w-full h-full object-cover"
        />
        <span v-else :class="textClass" class="text-lg">{{ emoji }}</span>
      </div>
    </div>
    <span class="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
      {{ title }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  emoji: String,
  image: String,
  hasUnseen: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'gradient'
  }
})

const bgClass = computed(() => {
  const colors = {
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  }
  return colors[props.color] || colors.gradient
})

const textClass = computed(() => {
  return props.color === 'gradient' ? 'text-white' : 'text-white'
})
</script>