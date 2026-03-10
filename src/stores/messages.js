import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messages', () => {
  const conversations = ref([
    { id: 1, participants: [2, 3], lastMessage: 'Hello', updatedAt: new Date() },
    { id: 2, participants: [1, 3], lastMessage: 'Meeting at 3pm', updatedAt: new Date() }
  ])
  const messages = ref({})

  const loadMessages = (conversationId) => {
    if (!messages.value[conversationId]) {
      messages.value[conversationId] = [
        { id: 1, senderId: 2, text: 'Hello, how can I help?', time: new Date() },
        { id: 2, senderId: 3, text: 'I have a question', time: new Date() }
      ]
    }
  }

  const sendMessage = (conversationId, senderId, text) => {
    if (!messages.value[conversationId]) messages.value[conversationId] = []
    messages.value[conversationId].push({
      id: Date.now(),
      senderId,
      text,
      time: new Date()
    })
  }

  const getConversationsForUser = (userId) => {
    return conversations.value.filter(c => c.participants.includes(userId))
  }

  return { conversations, messages, loadMessages, sendMessage, getConversationsForUser }
})