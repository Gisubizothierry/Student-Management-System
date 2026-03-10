<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto p-4 space-y-2">
      <div v-for="msg in messages" :key="msg.id" :class="msg.sender === 'me' ? 'text-right' : ''">
        <span class="inline-block p-2 rounded-lg" :class="msg.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-gray-200'">
          {{ msg.text }}
        </span>
        <div class="text-xs text-gray-500 mt-1">{{ msg.time }}</div>
      </div>
    </div>
    <div class="p-2 border-t flex">
      <Input v-model="newMessage" placeholder="Type..." class="flex-1 mr-2" @keyup.enter="send" />
      <Button @click="send">Send</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  messages: Array
})
const emit = defineEmits(['send'])

const newMessage = ref('')
const send = () => {
  if (newMessage.value.trim()) {
    emit('send', newMessage.value)
    newMessage.value = ''
  }
}
</script>