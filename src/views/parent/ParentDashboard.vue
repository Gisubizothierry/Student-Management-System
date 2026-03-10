<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Parent Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">My Children</h3>
        <ul>
          <li v-for="child in children" :key="child.id" class="p-2 border-b last:border-0 flex justify-between">
            <span>{{ child.name }} ({{ child.class }})</span>
            <Button size="sm" @click="viewChild(child.id)">View Progress</Button>
          </li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Recent Announcements</h3>
        <AnnouncementList :announcements="announcements" :limit="5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'
import AnnouncementList from '@/components/features/AnnouncementList.vue'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const children = ref([
  { id: 3, name: 'Jane Student', class: 'Grade 1' }
])
const announcements = ref([])

const viewChild = (id) => {
  router.push(`/parent/child-progress?childId=${id}`)
}

const notifStore = useNotificationsStore()
onMounted(async () => {
  await notifStore.fetchAnnouncements()
  announcements.value = notifStore.announcements.filter(a => a.target === 'all' || a.target === 'parents')
})
</script>