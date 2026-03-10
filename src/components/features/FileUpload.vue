<template>
  <div>
    <div class="flex items-center space-x-4">
      <div class="flex-1">
        <div v-if="uploadedFile" class="p-2 bg-gray-100 rounded flex items-center">
          <FileText class="w-5 h-5 text-gray-500 mr-2" />
          <span class="text-sm truncate">{{ uploadedFile.name }}</span>
          <button @click="removeFile" class="ml-auto text-red-500 hover:text-red-700">
            <X class="w-4 h-4" />
          </button>
        </div>
        <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
          <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />
          <button type="button" @click="$refs.fileInput.click()" class="text-indigo-600 hover:text-indigo-800">
            <Upload class="w-6 h-6 mx-auto mb-2" />
            <span class="text-sm">Click to upload or drag and drop</span>
          </button>
        </div>
      </div>
    </div>
    <p v-if="uploading" class="text-sm text-gray-500 mt-1">Uploading...</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileText, X, Upload } from 'lucide-vue-next'
import api from '@/services/api'

const props = defineProps({
  uploadUrl: { type: String, required: true }
})

const emit = defineEmits(['uploaded'])

const fileInput = ref(null)
const uploadedFile = ref(null)
const uploading = ref(false)

const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  uploadedFile.value = file
  uploading.value = true

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await api.post(props.uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    emit('uploaded', response.data.fileUrl)
  } catch (error) {
    console.error('Upload failed', error)
  } finally {
    uploading.value = false
  }
}

const removeFile = () => {
  uploadedFile.value = null
  fileInput.value.value = ''
}
</script>