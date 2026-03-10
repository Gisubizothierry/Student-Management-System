<template>
  <div class="relative">
    <button @click="toggleDropdown" class="relative p-2 text-gray-600 hover:text-indigo-600 focus:outline-none">
      <Bell class="w-6 h-6" />
      <span v-if="unreadCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
        {{ unreadCount }}
      </span>
    </button>
    <div v-if="showDropdown" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
      <div class="p-3 border-b flex justify-between items-center">
        <h3 class="font-semibold">Notifications</h3>
        <button @click="markAllRead" class="text-sm text-indigo-600 hover:text-indigo-800">Mark all read</button>
      </div>
      <div class="max-h-96 overflow-y-auto">
        <div v-for="notif in notifications" :key="notif.id" 
             class="p-3 border-b hover:bg-gray-50 cursor-pointer"
             :class="{ 'bg-indigo-50': !notif.read }"
             @click="markAsRead(notif.id)">
          <p class="text-sm">{{ notif.message }}</p>
          <p class="text-xs text-gray-500">{{ formatTime(notif.time) }}</p>
        </div>
        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
          No notifications
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Bell } from 'lucide-vue-next'
import { useNotificationsStore } from '@/stores/notifications'

const store = useNotificationsStore()
const notifications = store.notifications
const unreadCount = store.unreadCount
const showDropdown = ref(false)

const toggleDropdown = () => showDropdown.value = !showDropdown.value

const markAsRead = (id) => store.markAsRead(id)
const markAllRead = () => store.markAllRead()

const formatTime = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now - d) / 60000) // minutes
  if (diff < 1) return 'Just now'
  if (diff < 60) return `${diff} min ago`
  if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`
  return d.toLocaleDateString()
}

onMounted(() => {
  store.startPolling()
  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.relative')) showDropdown.value = false
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    store.stopPolling()
  })
})
</script>