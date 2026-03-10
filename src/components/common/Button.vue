<template>
  <button
    v-motion
    :initial="{ opacity: 0, scale: 0.95 }"
    :enter="{ opacity: 1, scale: 1 }"
    :type="type"
    :class="[
      'font-medium rounded-lg transition-all duration-300 flex items-center gap-2',
      'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses[variant]
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <component v-if="icon" :is="icon" :class="iconSize" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger', 'gradient', 'success', 'outline'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  icon: Object,
  disabled: Boolean
})

const sizeClasses = computed(() => ({
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg'
}))

const iconSize = computed(() => ({
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}))

const variantClasses = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md',
  gradient: 'bg-gradient-brand text-white hover:bg-gradient-brand-hover focus:ring-indigo-500 animate-gradient bg-[length:200%_200%] shadow-lg',
  outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500'
}
</script>