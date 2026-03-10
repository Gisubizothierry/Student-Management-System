<template>
  <div>
    <div class="flex items-center space-x-4">
      <img
        v-if="preview"
        :src="preview"
        class="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
      />
      <div
        v-else
        class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
      >
        No Photo
      </div>
      <div>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleFileChange"
          class="hidden"
        />
        <Button type="button" @click="$refs.fileInput.click()" variant="secondary">
          Choose Photo
        </Button>
        <p v-if="uploading" class="text-sm text-gray-500 mt-1">Uploading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from './Button.vue'
import api from '@/services/api'

const props = defineProps({
  userId: { type: [Number, String], required: true },
  currentPhoto: { type: String, default: '' }
})
const emit = defineEmits(['uploaded'])
const fileInput = ref(null)
const preview = ref(props.currentPhoto)
const uploading = ref(false)

const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  preview.value = URL.createObjectURL(file)
  uploading.value = true
  const formData = new FormData()
  formData.append('photo', file)
  try {
    const response = await api.post(`/users/${props.userId}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    emit('uploaded', response.data.photoUrl)
  } catch (error) {
    console.error('Upload failed', error)
  } finally {
    uploading.value = false
  }
}
</script>