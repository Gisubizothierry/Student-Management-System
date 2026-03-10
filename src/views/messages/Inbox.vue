<template>
  <div>
    <h2 class="text-2xl font-bold text-gradient-brand mb-6">Messages</h2>
    <div class="bg-white rounded-lg shadow flex h-[600px]">
      <div class="w-1/3 border-r p-4">
        <h3 class="font-semibold mb-2">Conversations</h3>
        <input v-model="search" placeholder="Search..." class="w-full p-2 border rounded mb-4" />
        <ul>
          <li v-for="convo in filteredConversations" :key="convo.id"
              @click="selectConversation(convo)"
              class="p-2 hover:bg-gray-100 cursor-pointer rounded"
              :class="{ 'bg-indigo-50': selected?.id === convo.id }">
            <p class="font-medium">{{ getOtherParticipant(convo).name }}</p>
            <p class="text-xs text-gray-500 truncate">{{ convo.lastMessage }}</p>
          </li>
        </ul>
      </div>
      <div class="w-2/3 p-4 flex flex-col">
        <div v-if="selected" class="flex-1 overflow-y-auto mb-4">
          <div v-for="msg in currentMessages" :key="msg.id" class="mb-2">
            <div :class="msg.senderId === currentUser.id ? 'text-right' : ''">
              <span class="inline-block p-2 rounded-lg"
                    :class="msg.senderId === currentUser.id ? 'bg-indigo-600 text-white' : 'bg-gray-200'">
                {{ msg.text }}
              </span>
              <div class="text-xs text-gray-500 mt-1">{{ formatTime(msg.time) }}</div>
            </div>
          </div>
        </div>
        <div v-if="selected" class="flex">
          <Input v-model="newMessage" placeholder="Type a message..." class="flex-1 mr-2" @keyup.enter="sendMessage" />
          <Button @click="sendMessage">Send</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import { useAuthStore } from '@/stores/auth'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const messagesStore = useMessagesStore()
const authStore = useAuthStore()
const currentUser = authStore.user

const conversations = computed(() => messagesStore.getConversationsForUser(currentUser.id))
const search = ref('')
const filteredConversations = computed(() => {
  if (!search.value) return conversations.value
  return conversations.value.filter(c =>
    getOtherParticipant(c).name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const selected = ref(null)
const currentMessages = computed(() => selected.value ? messagesStore.messages[selected.value.id] || [] : [])
const newMessage = ref('')

const getOtherParticipant = (convo) => {
  const otherId = convo.participants.find(id => id !== currentUser.id)
  // Mock user lookup – replace with real user store later
  const mockUsers = { 1: { name: 'Admin' }, 2: { name: 'Mr. Smith' }, 3: { name: 'Jane Student' }, 4: { name: 'Robert Parent' } }
  return { id: otherId, name: mockUsers[otherId]?.name || 'User' }
}

const selectConversation = (convo) => {
  selected.value = convo
  messagesStore.loadMessages(convo.id)
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selected.value) return
  messagesStore.sendMessage(selected.value.id, currentUser.id, newMessage.value)
  newMessage.value = ''
}

const formatTime = (date) => {
  const d = new Date(date)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>