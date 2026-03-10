<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 pointer-events-none">
      <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          v-motion
          :initial="{ opacity: 0, x: 400 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 300 } }"
          :leave="{ opacity: 0, x: 400, transition: { duration: 200 } }"
          :class="[
            'p-4 rounded-lg shadow-lg flex items-start gap-3 max-w-md pointer-events-auto backdrop-blur-sm',
            notificationTypeClass(notification.type)
          ]"
        >
          <!-- Icon -->
          <div :class="iconBgClass(notification.type)" class="p-2 rounded-full flex-shrink-0">
            <component :is="notificationIcon(notification.type)" :class="iconColorClass(notification.type)" class="w-5 h-5" />
          </div>

          <!-- Content -->
          <div class="flex-1">
            <p v-if="notification.title" class="font-semibold" :class="titleColorClass(notification.type)">
              {{ notification.title }}
            </p>
            <p :class="messageColorClass(notification.type)" class="text-sm mt-1">
              {{ notification.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            @click="removeNotification(notification.id)"
            class="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const { notifications, remove: removeNotification } = useNotification()

const notificationIcon = (type) => ({
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}[type])

const notificationTypeClass = (type) => ({
  success: 'bg-green-50 border border-green-200',
  error: 'bg-red-50 border border-red-200',
  warning: 'bg-yellow-50 border border-yellow-200',
  info: 'bg-blue-50 border border-blue-200'
}[type])

const iconBgClass = (type) => ({
  success: 'bg-green-100',
  error: 'bg-red-100',
  warning: 'bg-yellow-100',
  info: 'bg-blue-100'
}[type])

const iconColorClass = (type) => ({
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600'
}[type])

const titleColorClass = (type) => ({
  success: 'text-green-900',
  error: 'text-red-900',
  warning: 'text-yellow-900',
  info: 'text-blue-900'
}[type])

const messageColorClass = (type) => ({
  success: 'text-green-700',
  error: 'text-red-700',
  warning: 'text-yellow-700',
  info: 'text-blue-700'
}[type])
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
