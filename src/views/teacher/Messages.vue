<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Messages</h2>
    <div class="bg-white rounded-lg shadow flex h-[600px]">
      <div class="w-1/3 border-r p-4">
        <h3 class="font-semibold mb-2">Conversations</h3>
        <ul>
          <li v-for="convo in conversations" :key="convo.id"
              @click="selectConversation(convo)"
              class="p-2 hover:bg-gray-100 cursor-pointer rounded"
              :class="{ 'bg-indigo-50': selected?.id === convo.id }">
            {{ convo.with }}
          </li>
        </ul>
      </div>
      <div class="w-2/3 p-4 flex flex-col">
        <div v-if="selected" class="flex-1 overflow-y-auto mb-4">
          <div v-for="msg in currentMessages" :key="msg.id" class="mb-2">
            <div :class="msg.sender === 'me' ? 'text-right' : ''">
              <span class="inline-block p-2 rounded-lg" 
                    :class="msg.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-gray-200'">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import { useMessagesStore } from '@/stores/messages'

const store = useMessagesStore()
const conversations = store.conversations
const selected = ref(null)
const newMessage = ref('')

const currentMessages = computed(() => selected.value ? store.messages[selected.value.id] || [] : [])

const selectConversation = (convo) => {
  selected.value = convo
  store.loadMessages(convo.id)
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selected.value) return
  store.sendMessage(selected.value.id, newMessage.value)
  newMessage.value = ''
}

const formatTime = (date) => {
  const d = new Date(date)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  store.startListening()
})

onUnmounted(() => {
  store.stopListening()
})
</script>