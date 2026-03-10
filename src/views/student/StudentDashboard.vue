<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      class="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-lg"
    >
      <h1 class="text-3xl font-bold mb-2">Welcome, {{ user?.name }}! 👋</h1>
      <p class="text-indigo-100">Class {{ selectedClass?.name }} • Excited to learn today?</p>
    </div>

    <!-- Class Info Card -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
      class="card-interactive"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Your Class</h3>
          <p class="text-2xl font-bold text-indigo-600">{{ selectedClass?.name }}</p>
          <p class="text-gray-600 mt-2">Class Teacher: {{ selectedClass?.classTeacher }}</p>
        </div>
        <School class="w-12 h-12 text-indigo-600 opacity-20" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Attendance"
        value="92%"
        icon="CheckCircle"
        color="green"
        subtitle="Present this month"
        trend="2.5"
        delay="100"
      />
      <StatsCard
        title="Average Grade"
        value="A-"
        icon="Award"
        color="blue"
        subtitle="Current semester"
        trend="5"
        delay="200"
      />
      <StatsCard
        title="Pending Homework"
        value="3"
        icon="FileText"
        color="yellow"
        subtitle="Due this week"
        delay="300"
      />
      <StatsCard
        title="Fees Status"
        value="Paid"
        icon="CheckCircle"
        color="purple"
        subtitle="Current month"
        delay="400"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Attendance Summary -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="card-interactive"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Attendance Records</h3>
            <router-link
              to="/student/attendance"
              class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View All →
            </router-link>
          </div>
          <div class="divider-gradient-brand"></div>
          <div class="mt-4 space-y-3">
            <div
              v-for="(item, idx) in filteredAttendance.slice(0, 5)"
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 300 + idx * 50 } }"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div class="flex items-center gap-3">
                <div :class="statusIconBg(item.status)" class="p-2 rounded-full">
                  <component :is="statusIcon(item.status)" :class="statusIconColor(item.status)" class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ item.date }}</p>
                  <p class="text-sm text-gray-600">{{ item.subject }}</p>
                </div>
              </div>
              <span :class="statusBadge(item.status)">{{ item.status }}</span>
            </div>
          </div>
        </div>

        <!-- Upcoming Assignments -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="card-interactive"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Upcoming Homework</h3>
            <router-link
              to="/student/homework"
              class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View All →
            </router-link>
          </div>
          <div class="divider-gradient-brand"></div>
          <div class="mt-4 space-y-3">
            <div
              v-for="hw in homeworks.slice(0, 3)"
              :key="hw.id"
              class="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-lg hover:shadow-md transition"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900">{{ hw.title }}</h4>
                  <p class="text-sm text-gray-600 mt-1">{{ hw.description }}</p>
                  <p class="text-xs text-indigo-600 font-medium mt-2">Due: {{ hw.dueDate }}</p>
                </div>
                <span class="badge-primary">{{ hw.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Quick Access -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 250 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Access</h3>
          <div class="space-y-3">
            <router-link
              to="/student/grades"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition group"
            >
              <Award class="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">My Grades</span>
            </router-link>
            <router-link
              to="/student/calendar"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition group"
            >
              <Calendar class="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Calendar</span>
            </router-link>
            <router-link
              to="/student/fees"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition group"
            >
              <CreditCard class="w-5 h-5 text-green-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Fees</span>
            </router-link>
            <router-link
              to="/student/messages"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:shadow-md transition group"
            >
              <MessageSquare class="w-5 h-5 text-orange-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Messages</span>
            </router-link>
          </div>
        </div>

        <!-- Announcements -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 350 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Latest Announcements</h3>
          <div class="space-y-3">
            <div
              v-for="ann in announcements.slice(0, 3)"
              :key="ann.id"
              class="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg"
            >
              <p class="font-medium text-gray-900 text-sm">{{ ann.title }}</p>
              <p class="text-xs text-gray-600 mt-1">{{ ann.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  School, CheckCircle, Award, FileText, CreditCard, MessageSquare,
  Calendar, Check, X, Clock
} from 'lucide-vue-next'
import StatsCard from '@/components/features/StatsCard.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const selectedClass = computed(() => authStore.selectedClass)

// Mock data
const filteredAttendance = [
  { id: 1, date: '2025-03-10', subject: 'Mathematics', status: 'present' },
  { id: 2, date: '2025-03-09', subject: 'English', status: 'present' },
  { id: 3, date: '2025-03-08', subject: 'Science', status: 'present' },
  { id: 4, date: '2025-03-07', subject: 'History', status: 'absent' },
  { id: 5, date: '2025-03-06', subject: 'Geography', status: 'present' }
]

const homeworks = [
  {
    id: 1,
    title: 'Math Chapter 5 Exercises',
    description: 'Solve exercises 5.1 to 5.5 from textbook',
    dueDate: '2025-03-12',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    description: 'Complete the physics experiment report',
    dueDate: '2025-03-15',
    status: 'pending'
  },
  {
    id: 3,
    title: 'English Essay',
    description: 'Write an essay on "My Hometown"',
    dueDate: '2025-03-11',
    status: 'completed'
  }
]

const announcements = [
  {
    id: 1,
    title: 'Annual Sports Day - March 20th',
    date: '2025-03-08'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting on March 25th',
    date: '2025-03-07'
  },
  {
    id: 3,
    title: 'Final exams schedule released',
    date: '2025-03-05'
  }
]

// Helper functions
const statusIcon = (status) => ({
  present: Check,
  absent: X,
  late: Clock
}[status])

const statusIconBg = (status) => ({
  present: 'bg-green-100',
  absent: 'bg-red-100',
  late: 'bg-yellow-100'
}[status])

const statusIconColor = (status) => ({
  present: 'text-green-600',
  absent: 'text-red-600',
  late: 'text-yellow-600'
}[status])

const statusBadge = (status) => ({
  present: 'badge-success',
  absent: 'badge-danger',
  late: 'badge-warning'
}[status])
</script>
