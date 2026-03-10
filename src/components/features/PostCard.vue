<template>
  <div
    v-motion
    :initial="{ opacity: 0, scale: 0.8 }"
    :enter="{ opacity: 1, scale: 1 }"
    class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group"
    @click="$emit('click')"
  >
    <img
      :src="post.image"
      :alt="post.caption"
      class="w-full h-full object-cover"
    />

    <!-- Hover overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-6 text-white">
        <div class="flex items-center gap-1">
          <Heart class="w-5 h-5 fill-white" />
          <span class="font-semibold">{{ post.likes }}</span>
        </div>
        <div class="flex items-center gap-1">
          <MessageCircle class="w-5 h-5" />
          <span class="font-semibold">{{ post.comments }}</span>
        </div>
      </div>
    </div>

    <!-- Multiple images indicator -->
    <div v-if="post.images && post.images.length > 1" class="absolute top-2 right-2">
      <div class="w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
        <span class="text-white text-xs font-bold">{{ post.images.length }}</span>
      </div>
    </div>

    <!-- Video indicator -->
    <div v-if="post.type === 'video'" class="absolute top-2 left-2">
      <div class="w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
        <Play class="w-3 h-3 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Heart, MessageCircle, Play } from 'lucide-vue-next'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>