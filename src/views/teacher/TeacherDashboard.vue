<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      class="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-xl p-8 text-white shadow-lg"
    >
      <h1 class="text-3xl font-bold mb-2">Welcome, {{ user?.name }}! 👨‍🏫</h1>
      <p class="text-green-100">Department: {{ user?.department }} | {{ myClasses.length }} Classes</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Classes Teaching"
        :value="myClasses.length"
        icon="School"
        color="green"
        subtitle="Active classes"
        delay="100"
      />
      <StatsCard
        title="Total Students"
        value="120"
        icon="Users"
        color="blue"
        subtitle="All classes combined"
        delay="200"
      />
      <StatsCard
        title="Pending Marks"
        value="5"
        icon="FileText"
        color="yellow"
        subtitle="To be submitted"
        delay="300"
      />
      <StatsCard
        title="Attendance Rate"
        value="94%"
        icon="CheckCircle"
        color="purple"
        subtitle="Average this month"
        delay="400"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- My Classes -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="card-interactive"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <School class="w-5 h-5 text-green-600" />
              My Classes
            </h3>
            <router-link
              to="/teacher/attendance"
              class="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Manage →
            </router-link>
          </div>
          <div class="divider-gradient-brand"></div>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(cls, idx) in myClasses"
              :key="cls.id"
              v-motion
              :initial="{ opacity: 0, scale: 0.95 }"
              :enter="{ opacity: 1, scale: 1, transition: { delay: 250 + idx * 50 } }"
              class="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition cursor-pointer"
            >
              <div class="flex items-start justify-between">
                <div>
                  <p class="font-bold text-gray-900">{{ cls.name }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ cls.subjects.join(', ') }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ cls.strength }} Students</p>
                </div>
                <div class="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  {{ cls.strength }}
                </div>
              </div>
              <div class="mt-3 flex gap-2">
                <router-link
                  :to="`/teacher/attendance?class=${cls.id}`"
                  class="flex-1 text-center py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition"
                >
                  Attendance
                </router-link>
                <router-link
                  :to="`/teacher/marks?class=${cls.id}`"
                  class="flex-1 text-center py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded hover:bg-green-200 transition"
                >
                  Marks
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Homework -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="card-interactive"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText class="w-5 h-5 text-blue-600" />
              Homework Given
            </h3>
            <router-link
              to="/teacher/homework"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </router-link>
          </div>
          <div class="divider-gradient-brand"></div>
          <div class="mt-4 space-y-3">
            <div
              v-for="hw in recentHomework"
              :key="hw.id"
              class="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg hover:shadow-md transition"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900">{{ hw.title }}</h4>
                  <p class="text-sm text-gray-600 mt-1">Class: {{ hw.class }} | Due: {{ hw.dueDate }}</p>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-xs font-medium text-blue-700">{{ hw.submittedCount }}/{{ hw.totalStudents }} Submitted</span>
                    <div class="w-20 h-1.5 bg-blue-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        :style="{ width: `${(hw.submittedCount / hw.totalStudents) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
                <span :class="hwStatusBadge(hw.status)">{{ hw.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 250 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <router-link
              to="/teacher/attendance"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition group border border-green-200"
            >
              <CheckSquare class="w-5 h-5 text-green-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Take Attendance</span>
            </router-link>
            <router-link
              to="/teacher/marks"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition group border border-blue-200"
            >
              <BarChart3 class="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Enter Marks</span>
            </router-link>
            <router-link
              to="/teacher/homework"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition group border border-purple-200"
            >
              <FileText class="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Set Homework</span>
            </router-link>
            <router-link
              to="/teacher/leave-requests"
              class="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:shadow-md transition group border border-orange-200"
            >
              <Calendar class="w-5 h-5 text-orange-600 group-hover:scale-110 transition" />
              <span class="font-medium text-gray-800">Leave Requests</span>
            </router-link>
          </div>
        </div>

        <!-- Today's Schedule -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 350 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock class="w-5 h-5 text-purple-600" />
            Today's Schedule
          </h3>
          <div class="space-y-3">
            <div
              v-for="(slot, idx) in todaySchedule"
              :key="idx"
              class="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-lg"
            >
              <p class="font-semibold text-gray-900">{{ slot.time }}</p>
              <p class="text-sm text-gray-600">{{ slot.class }} - {{ slot.subject }}</p>
              <p class="text-xs text-purple-600 mt-1">{{ slot.room }}</p>
            </div>
          </div>
        </div>

        <!-- Leave Requests -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Leave Requests</h3>
          <div class="space-y-2">
            <div class="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p class="font-medium text-gray-900">Pending</p>
              <p class="text-2xl font-bold text-yellow-600 mt-1">2</p>
            </div>
            <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p class="font-medium text-gray-900">Approved</p>
              <p class="text-2xl font-bold text-green-600 mt-1">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  School, Users, FileText, CheckCircle, CheckSquare, BarChart3,
  Calendar, Clock
} from 'lucide-vue-next'
import StatsCard from '@/components/features/StatsCard.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Mock data
const myClasses = [
  { id: 1, name: 'Class 10-A', subjects: ['Mathematics', 'Physics'], strength: 45 },
  { id: 2, name: 'Class 10-B', subjects: ['Mathematics'], strength: 42 },
]

const recentHomework = [
  {
    id: 1,
    title: 'Chapter 5 - Quadratic Equations',
    class: '10-A',
    dueDate: '2025-03-12',
    status: 'active',
    submittedCount: 38,
    totalStudents: 45
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    class: '10-A',
    dueDate: '2025-03-15',
    status: 'active',
    submittedCount: 25,
    totalStudents: 45
  }
]

const todaySchedule = [
  { time: '09:00 - 10:00', class: '10-A', subject: 'Mathematics', room: 'Room 101' },
  { time: '10:00 - 11:00', class: '10-B', subject: 'Mathematics', room: 'Room 102' },
  { time: '11:30 - 12:30', class: '10-A', subject: 'Physics', room: 'Lab A' }
]

const hwStatusBadge = (status) => ({
  active: 'badge-primary',
  completed: 'badge-success',
  closed: 'badge-danger'
}[status])
</script>
