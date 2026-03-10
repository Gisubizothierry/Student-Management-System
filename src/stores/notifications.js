import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])
  const unreadCount = ref(0)

  const fetchNotifications = () => {
    // Mock data – replace with API call
    notifications.value = [
      { id: 1, message: 'New homework assigned in Math', time: new Date(), read: false },
      { id: 2, message: 'Exam schedule updated for Grade 1', time: new Date(), read: false },
      { id: 3, message: 'Parent-teacher meeting on Friday', time: new Date(), read: true },
    ]
    unreadCount.value = notifications.value.filter(n => !n.read).length
  }

  const markAsRead = (id) => {
    const n = notifications.value.find(n => n.id === id)
    if (n) n.read = true
    unreadCount.value = notifications.value.filter(n => !n.read).length
  }

  const markAllRead = () => {
    notifications.value.forEach(n => n.read = true)
    unreadCount.value = 0
  }

  // Poll every 30 seconds
  let interval = null
  const startPolling = () => {
    fetchNotifications()
    interval = setInterval(fetchNotifications, 30000)
  }
  const stopPolling = () => {
    if (interval) clearInterval(interval)
  }

  return { notifications, unreadCount, fetchNotifications, markAsRead, markAllRead, startPolling, stopPolling }
})