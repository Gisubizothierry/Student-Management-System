<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Instagram-style Profile Header -->
    <div class="max-w-4xl mx-auto bg-white">
      <!-- Profile Header Section -->
      <div class="px-4 py-8 md:px-8">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Profile Picture -->
          <div class="relative">
            <div
              v-motion
              :initial="{ scale: 0 }"
              :enter="{ scale: 1 }"
              class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden"
            >
              <img
                v-if="user.photo"
                :src="user.photo"
                alt="Profile"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold"
              >
                {{ user.name?.charAt(0).toUpperCase() }}
              </div>
            </div>

            <!-- Edit Profile Picture Button -->
            <button
              @click="showPhotoUpload = true"
              class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            >
              <Camera class="w-4 h-4" />
            </button>
          </div>

          <!-- Profile Info -->
          <div class="flex-1 text-center md:text-left">
            <!-- Username and Actions -->
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 class="text-2xl font-light">{{ user.name }}</h1>
              <div class="flex gap-2">
                <Button
                  @click="showEditModal = true"
                  variant="outline"
                  size="sm"
                  class="px-6"
                >
                  Edit Profile
                </Button>
                <Button
                  @click="showSettingsModal = true"
                  variant="outline"
                  size="sm"
                  icon="Settings"
                />
                <Button
                  @click="showShareModal = true"
                  variant="outline"
                  size="sm"
                  icon="Share"
                />
              </div>
            </div>

            <!-- Stats Row -->
            <div class="flex justify-center md:justify-start gap-8 mb-4">
              <div class="text-center">
                <span class="font-semibold text-lg">{{ userPosts.length }}</span>
                <span class="text-gray-600 ml-1">posts</span>
              </div>
              <div class="text-center cursor-pointer hover:text-gray-800 transition-colors">
                <span class="font-semibold text-lg">{{ followersCount }}</span>
                <span class="text-gray-600 ml-1">followers</span>
              </div>
              <div class="text-center cursor-pointer hover:text-gray-800 transition-colors">
                <span class="font-semibold text-lg">{{ followingCount }}</span>
                <span class="text-gray-600 ml-1">following</span>
              </div>
            </div>

            <!-- Bio Section -->
            <div class="space-y-2">
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-gray-700 whitespace-pre-line">{{ user.bio || 'Welcome to my profile! 🎓' }}</p>
              <div class="flex flex-wrap gap-2 text-sm text-indigo-600">
                <span v-if="user.role" class="bg-indigo-100 px-2 py-1 rounded-full">
                  {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                </span>
                <span v-if="user.class" class="bg-purple-100 px-2 py-1 rounded-full">
                  Class {{ user.class }}
                </span>
                <span v-if="user.rollNumber" class="bg-green-100 px-2 py-1 rounded-full">
                  Roll: {{ user.rollNumber }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stories/Highlights Section -->
      <div class="px-4 md:px-8 pb-6">
        <div class="flex gap-4 overflow-x-auto pb-2">
          <!-- Add Story Button -->
          <div class="flex flex-col items-center gap-2 cursor-pointer group">
            <div class="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center group-hover:border-gray-400 transition-colors">
              <Plus class="w-6 h-6 text-gray-600" />
            </div>
            <span class="text-xs text-gray-600">Add Story</span>
          </div>

          <!-- Story Highlights -->
          <StoryHighlight
            v-for="highlight in highlights"
            :key="highlight.id"
            :title="highlight.title"
            :emoji="highlight.emoji"
            :has-unseen="highlight.hasUnseen"
            :color="highlight.color"
          />
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-t border-gray-200">
        <div class="flex justify-center">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex items-center gap-2 px-6 py-4 border-t-2 transition-colors"
            :class="activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span class="hidden md:block font-medium">{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto mt-2">
      <!-- Posts Grid -->
      <div v-if="activeTab === 'posts'" class="bg-white">
        <div v-if="userPosts.length === 0" class="text-center py-16">
          <Camera class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-gray-900 mb-2">No posts yet</h3>
          <p class="text-gray-500">Share your first post to get started!</p>
        </div>
        <div v-else class="grid grid-cols-3 gap-1 md:gap-4 p-1 md:p-4">
          <PostCard
            v-for="post in userPosts"
            :key="post.id"
            :post="post"
            @click="openPostModal(post)"
          />
        </div>
      </div>

      <!-- Tagged Posts -->
      <div v-if="activeTab === 'tagged'" class="bg-white p-8 text-center">
        <User class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-900 mb-2">Photos of you</h3>
        <p class="text-gray-500">When people tag you in photos, they'll appear on your profile.</p>
      </div>

      <!-- Saved Posts -->
      <div v-if="activeTab === 'saved'" class="bg-white p-8 text-center">
        <Bookmark class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-900 mb-2">Saved</h3>
        <p class="text-gray-500">Only you can see what you've saved</p>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <Modal v-model="showEditModal" title="Edit Profile">
      <form @submit.prevent="updateProfile" class="space-y-4">
        <Input v-model="profileForm.name" label="Name" required />
        <Input v-model="profileForm.email" label="Email" type="email" required />
        <Input v-model="profileForm.phone" label="Phone" />
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
          <textarea
            v-model="profileForm.bio"
            class="input-modern w-full resize-none"
            rows="3"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
        <div class="flex justify-end gap-3">
          <Button @click="showEditModal = false" variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary" :disabled="profileLoading">
            {{ profileLoading ? 'Saving...' : 'Save' }}
          </Button>
        </div>
      </form>
    </Modal>

    <!-- Settings Modal -->
    <Modal v-model="showSettingsModal" title="Settings">
      <div class="space-y-6">
        <!-- Account Settings -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Account</h3>
          <div class="space-y-3">
            <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              Change Password
            </button>
            <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              Privacy Settings
            </button>
            <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600">
              Delete Account
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Preferences</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span>Dark Mode</span>
              <button
                @click="themeStore.toggleDark"
                class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
                :class="themeStore.isDark ? 'bg-indigo-600' : 'bg-gray-200'"
              >
                <span
                  class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                  :class="themeStore.isDark ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
            <div class="flex items-center justify-between">
              <span>Email Notifications</span>
              <button
                @click="toggleEmailNotifications"
                class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
                :class="preferences.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'"
              >
                <span
                  class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                  :class="preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Photo Upload Modal -->
    <Modal v-model="showPhotoUpload" title="Change Profile Picture">
      <PhotoUpload
        :user-id="user.id"
        :current-photo="user.photo"
        @uploaded="photoUploaded"
        @cancel="showPhotoUpload = false"
      />
    </Modal>

    <!-- Post Modal -->
    <Modal v-model="showPostModal" :title="selectedPost?.caption || 'Post'" size="lg">
      <div v-if="selectedPost" class="space-y-4">
        <img :src="selectedPost.image" :alt="selectedPost.caption" class="w-full rounded-lg" />
        <p class="text-gray-700">{{ selectedPost.caption }}</p>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span>{{ selectedPost.likes }} likes</span>
          <span>{{ selectedPost.comments }} comments</span>
          <span>{{ formatDate(selectedPost.date) }}</span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import {
  Camera, Plus, Grid3X3, User, Bookmark, Heart, MessageCircle, Settings
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import PhotoUpload from '@/components/common/PhotoUpload.vue'
import StoryHighlight from '@/components/features/StoryHighlight.vue'
import PostCard from '@/components/features/PostCard.vue'

// Stores
const authStore = useAuthStore()
const themeStore = useThemeStore()

// User data
const user = computed(() => authStore.user)

// State
const activeTab = ref('posts')
const showEditModal = ref(false)
const showSettingsModal = ref(false)
const showPhotoUpload = ref(false)
const showPostModal = ref(false)
const selectedPost = ref(null)

// Profile form
const profileForm = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  bio: user.value?.bio || ''
})
const profileLoading = ref(false)

// Preferences
const preferences = reactive({
  emailNotifications: localStorage.getItem('emailNotifications') === 'true'
})

// Tabs
const tabs = [
  { id: 'posts', label: 'Posts', icon: Grid3X3 },
  { id: 'tagged', label: 'Tagged', icon: User },
  { id: 'saved', label: 'Saved', icon: Bookmark }
]

// Mock data
const highlights = [
  { id: 1, title: 'School', emoji: '🎓', hasUnseen: false, color: 'blue' },
  { id: 2, title: 'Sports', emoji: '⚽', hasUnseen: true, color: 'green' },
  { id: 3, title: 'Achievements', emoji: '🏆', hasUnseen: false, color: 'yellow' },
  { id: 4, title: 'Friends', emoji: '👥', hasUnseen: false, color: 'purple' },
  { id: 5, title: 'Projects', emoji: '💼', hasUnseen: true, color: 'red' },
  { id: 6, title: 'Events', emoji: '🎉', hasUnseen: false, color: 'gradient' }
]

const userPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    caption: 'Back to school! 📚 #FirstDay #StudentLife',
    likes: 24,
    comments: 5,
    date: new Date(Date.now() - 86400000),
    type: 'image'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    caption: 'Study session complete! 💪 #StudyMotivation',
    likes: 18,
    comments: 3,
    date: new Date(Date.now() - 172800000),
    type: 'image'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    caption: 'Group project time! 👥 #TeamWork',
    likes: 31,
    comments: 8,
    date: new Date(Date.now() - 259200000),
    type: 'image'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    caption: 'Library vibes 📖 #Reading',
    likes: 15,
    comments: 2,
    date: new Date(Date.now() - 345600000),
    type: 'image'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400',
    caption: 'Science experiment day! 🔬 #STEM',
    likes: 27,
    comments: 6,
    date: new Date(Date.now() - 432000000),
    type: 'image'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    caption: 'Sports day! 🏃‍♂️ #Fitness',
    likes: 42,
    comments: 12,
    date: new Date(Date.now() - 518400000),
    type: 'image'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
    caption: 'Class presentation ready! 🎤 #PublicSpeaking',
    likes: 19,
    comments: 4,
    date: new Date(Date.now() - 604800000),
    type: 'image'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    caption: 'Art class masterpiece! 🎨 #Creativity',
    likes: 35,
    comments: 9,
    date: new Date(Date.now() - 691200000),
    type: 'image'
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
    caption: 'Music practice session 🎵 #Music',
    likes: 22,
    comments: 3,
    date: new Date(Date.now() - 777600000),
    type: 'video'
  }
]

// Computed properties
const followersCount = computed(() => {
  // Mock followers count based on role
  const baseFollowers = user.value?.role === 'student' ? 45 : user.value?.role === 'teacher' ? 120 : 200
  return Math.floor(baseFollowers + Math.random() * 50)
})

const followingCount = computed(() => {
  const baseFollowing = user.value?.role === 'student' ? 32 : user.value?.role === 'teacher' ? 85 : 150
  return Math.floor(baseFollowing + Math.random() * 30)
})

// Methods
const updateProfile = async () => {
  profileLoading.value = true
  try {
    await authStore.updateProfile(profileForm)
    showEditModal.value = false
  } catch (error) {
    console.error('Failed to update profile:', error)
  } finally {
    profileLoading.value = false
  }
}

const photoUploaded = (url) => {
  authStore.updateProfile({ photo: url })
  showPhotoUpload.value = false
}

const toggleEmailNotifications = () => {
  preferences.emailNotifications = !preferences.emailNotifications
  localStorage.setItem('emailNotifications', preferences.emailNotifications)
}

const openPostModal = (post) => {
  selectedPost.value = post
  showPostModal.value = true
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Initialize
onMounted(() => {
  // Load user data
  Object.assign(profileForm, {
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    bio: user.value?.bio || ''
  })
})
</script>