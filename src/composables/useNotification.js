import { ref } from 'vue'

const notifications = ref([])

export const useNotification = () => {
  const add = (notification) => {
    const id = Date.now()
    const fullNotification = {
      id,
      ...notification,
      duration: notification.duration || 3000
    }

    notifications.value.push(fullNotification)

    if (fullNotification.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, fullNotification.duration)
    }

    return id
  }

  const remove = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message, options = {}) => {
    return add({
      type: 'success',
      title: options.title || 'Success',
      message,
      ...options
    })
  }

  const error = (message, options = {}) => {
    return add({
      type: 'error',
      title: options.title || 'Error',
      message,
      ...options
    })
  }

  const warning = (message, options = {}) => {
    return add({
      type: 'warning',
      title: options.title || 'Warning',
      message,
      ...options
    })
  }

  const info = (message, options = {}) => {
    return add({
      type: 'info',
      title: options.title || 'Info',
      message,
      ...options
    })
  }

  const clear = () => {
    notifications.value = []
  }

  return {
    notifications,
    add,
    remove,
    success,
    error,
    warning,
    info,
    clear
  }
}
