<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: delay } }"
    class="card-interactive bg-white"
  >
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ formattedValue }}</p>
        <p v-if="subtitle" class="text-xs text-gray-500">{{ subtitle }}</p>
      </div>
      <div
        :class="`p-4 rounded-2xl ${bgColorClass}`"
        class="group-hover:scale-110 transition-transform duration-300"
      >
        <component :is="iconComponent" :class="`w-8 h-8 ${iconColorClass}`" />
      </div>
    </div>

    <!-- Trend indicator -->
    <div v-if="trend" class="mt-4 flex items-center gap-2 text-sm">
      <component
        :is="trend > 0 ? 'TrendingUp' : 'TrendingDown'"
        :class="trend > 0 ? 'text-green-500' : 'text-red-500'"
        class="w-4 h-4"
      />
      <span :class="trend > 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
        {{ Math.abs(trend) }}% {{ trend > 0 ? 'increase' : 'decrease' }}
      </span>
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
  color: { type: String, default: 'indigo' },
  subtitle: String,
  trend: Number,
  delay: {
    type: Number,
    default: 0
  }
})

const colorMap = {
  indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600' },
  green: { bg: 'bg-green-100', icon: 'text-green-600' },
  blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  pink: { bg: 'bg-pink-100', icon: 'text-pink-600' },
  yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
  red: { bg: 'bg-red-100', icon: 'text-red-600' }
}

const bgColorClass = computed(() => colorMap[props.color]?.bg || colorMap.indigo.bg)
const iconColorClass = computed(() => colorMap[props.color]?.icon || colorMap.indigo.icon)

const iconComponent = computed(() => icons[props.icon] || icons.Activity)

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})
</script>