<template>
  <div class="space-y-4">
    <!-- Current Photo Display -->
    <div v-if="!isEditing" class="flex items-center gap-4">
      <div class="relative">
        <img
          v-if="currentPhoto"
          :src="currentPhoto"
          alt="Current profile picture"
          class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div
          v-else
          class="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg"
        >
          {{ userInitial }}
        </div>
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">Profile Picture</p>
        <Button @click="startEditing" variant="outline" size="sm">
          Change Photo
        </Button>
      </div>
    </div>

    <!-- Upload Interface -->
    <div v-else class="space-y-4">
      <!-- Drag & Drop Area -->
      <div
        @dragover.prevent
        @drop.prevent="handleDrop"
        class="relative border-2 border-dashed rounded-lg p-8 text-center transition-colors"
        :class="isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div v-if="!selectedFile" class="space-y-4">
          <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Camera class="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p class="text-lg font-medium text-gray-900">Drag photos here</p>
            <p class="text-gray-500">or click to select from your computer</p>
          </div>
          <Button variant="primary" size="sm">
            Select from computer
          </Button>
        </div>

        <!-- Preview -->
        <div v-else class="space-y-4">
          <div class="relative inline-block">
            <img
              :src="previewUrl"
              alt="Preview"
              class="max-w-xs max-h-64 rounded-lg object-cover mx-auto"
            />
            <button
              @click.stop="removeFile"
              class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X class="w-3 h-3" />
            </button>
          </div>
          <p class="text-sm text-gray-600">{{ selectedFile.name }}</p>
        </div>
      </div>

      <!-- Upload Progress -->
      <div v-if="uploading" class="space-y-2">
        <div class="flex justify-between text-sm">
          <span>Uploading...</span>
          <span>{{ uploadProgress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3">
        <Button @click="cancelEditing" variant="secondary" :disabled="uploading">
          Cancel
        </Button>
        <Button
          @click="uploadPhoto"
          variant="primary"
          :disabled="!selectedFile || uploading"
        >
          {{ uploading ? 'Uploading...' : 'Upload Photo' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Camera, X } from 'lucide-vue-next'
import Button from './Button.vue'
import api from '@/services/api'

const props = defineProps({
  userId: { type: [Number, String], required: true },
  currentPhoto: { type: String, default: '' }
})

const emit = defineEmits(['uploaded', 'cancel'])

const fileInput = ref(null)
const isEditing = ref(false)
const selectedFile = ref(null)
const previewUrl = ref('')
const uploading = ref(false)
const uploadProgress = ref(0)
const isDragOver = ref(false)

const userInitial = computed(() => {
  // This would come from user store, but for now use first letter
  return 'U'
})

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  selectedFile.value = null
  previewUrl.value = ''
  emit('cancel')
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

const processFile = (file) => {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    alert('File size must be less than 5MB')
    return
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const removeFile = () => {
  selectedFile.value = null
  previewUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const uploadPhoto = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  uploadProgress.value = 0

  try {
    const formData = new FormData()
    formData.append('photo', selectedFile.value)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      uploadProgress.value += Math.random() * 15
      if (uploadProgress.value >= 90) {
        clearInterval(progressInterval)
      }
    }, 200)

    // Mock API call - replace with real upload
    await new Promise(resolve => setTimeout(resolve, 2000))

    uploadProgress.value = 100

    // Mock successful upload
    const mockPhotoUrl = previewUrl.value // In real app, this would be from API response

    emit('uploaded', mockPhotoUrl)
    isEditing.value = false
    selectedFile.value = null
    previewUrl.value = ''

  } catch (error) {
    console.error('Upload failed:', error)
    alert('Upload failed. Please try again.')
  } finally {
    uploading.value = false
    uploadProgress.value = 0
  }
}
</script>