import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messages', () => {
  const conversations = ref([
    { id: 1, with: 'Mr. Smith (Teacher)', lastMessage: 'Hello', unread: 0 },
    { id: 2, with: 'Admin', lastMessage: 'Meeting at 3pm', unread: 0 }
  ])
  const messages = ref({})

  const loadMessages = (conversationId) => {
    // Mock messages
    messages.value[conversationId] = [
      { id: 1, sender: 'other', text: 'Hello, how can I help?', time: new Date() },
      { id: 2, sender: 'me', text: 'I have a question about homework', time: new Date() }
    ]
  }

  const sendMessage = (conversationId, text) => {
    if (!messages.value[conversationId]) messages.value[conversationId] = []
    messages.value[conversationId].push({
      id: Date.now(),
      sender: 'me',
      text,
      time: new Date()
    })
  }

  // Simulate incoming messages
  let interval = null
  const startListening = () => {
    interval = setInterval(() => {
      const convId = conversations.value[0]?.id
      if (convId) {
        if (!messages.value[convId]) messages.value[convId] = []
        messages.value[convId].push({
          id: Date.now(),
          sender: 'other',
          text: 'Auto-reply: Your request is being processed',
          time: new Date()
        })
      }
    }, 20000)
  }
  const stopListening = () => {
    if (interval) clearInterval(interval)
  }

  return { conversations, messages, loadMessages, sendMessage, startListening, stopListening }
})