<template>
  <div class="space-y-6">
    <!-- Header with Welcome -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      class="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white shadow-2xl"
    >
      <h1 class="text-4xl font-bold mb-2">School Administration Dashboard</h1>
      <p class="text-slate-300">Manage students, teachers, classes, and more</p>
      <div class="mt-4 text-sm text-slate-400">
        📅 {{ currentDate }} | 👥 {{ stats.totalStudents }} Students | 👨‍🏫 {{ stats.totalTeachers }} Teachers
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Students"
        :value="stats.totalStudents"
        icon="Users"
        color="blue"
        subtitle="Active students"
        trend="3.2"
        delay="100"
      />
      <StatsCard
        title="Total Teachers"
        :value="stats.totalTeachers"
        icon="GraduationCap"
        color="purple"
        subtitle="Faculty members"
        trend="1.5"
        delay="200"
      />
      <StatsCard
        title="Classes"
        :value="stats.totalClasses"
        icon="School"
        color="green"
        subtitle="Running classes"
        delay="300"
      />
      <StatsCard
        title="Pending Fees"
        :value="stats.pendingFees"
        icon="CreditCard"
        color="red"
        subtitle="Outstanding payments"
        trend="-2.1"
        delay="400"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column (2/3) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Recent Activities -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="card-interactive"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity class="w-5 h-5 text-indigo-600" />
              Recent Activities
            </h3>
            <router-link
              to="/admin/reports"
              class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View Reports →
            </router-link>
          </div>
          <div class="divider-gradient-brand"></div>
          <div class="mt-4 space-y-3">
            <div
              v-for="(activity, idx) in recentActivities"
              :key="activity.id"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 250 + idx * 50 } }"
              class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
            >
              <div :class="activityIconBg(activity.type)" class="p-3 rounded-full">
                <component :is="activityIcon(activity.type)" :class="activityIconColor(activity.type)" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-600">{{ activity.description }}</p>
              </div>
              <span class="text-xs text-gray-500">{{ activity.time }}</span>
            </div>
          </div>
        </div>

        <!-- Management Sections -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="card-interactive"
        >
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap class="w-5 h-5 text-purple-600" />
            Quick Management
          </h3>
          <div class="divider-gradient-brand"></div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            <router-link
              to="/admin/students"
              class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition group border border-blue-200"
            >
              <Users class="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition" />
              <p class="font-semibold text-gray-900 text-sm">Manage Students</p>
            </router-link>
            <router-link
              to="/admin/teachers"
              class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-lg transition group border border-purple-200"
            >
              <GraduationCap class="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition" />
              <p class="font-semibold text-gray-900 text-sm">Manage Teachers</p>
            </router-link>
            <router-link
              to="/admin/classes"
              class="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition group border border-green-200"
            >
              <School class="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition" />
              <p class="font-semibold text-gray-900 text-sm">Manage Classes</p>
            </router-link>
            <router-link
              to="/admin/announcements"
              class="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg hover:shadow-lg transition group border border-yellow-200"
            >
              <Megaphone class="w-8 h-8 text-yellow-600 mb-2 group-hover:scale-110 transition" />
              <p class="font-semibold text-gray-900 text-sm">Announcements</p>
            </router-link>
            <router-link
              to="/admin/fees"
              class="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:shadow-lg transition group border border-pink-200"
            >
              <DollarSign class="w-8 h-8 text-pink-600 mb-2 group-hover:scale-110 transition" />
              <p class="font-semibold text-gray-900 text-sm">Fee Management</p>
            </router-link>
            <router-link
              to="/admin/analytics"
              class="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-lg transition group border border-indigo-200"
            >
              <BarChart3 class="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition" />
              <p class="font-semibold text-gray-900 text-sm">Analytics</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Right Column (1/3) -->
      <div class="space-y-6">
        <!-- Key Metrics -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 250 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Key Metrics</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-700 font-medium">Avg. Attendance</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="w-3/4 h-full bg-gradient-success rounded-full"></div>
                </div>
                <span class="font-bold text-green-600">92%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700 font-medium">Fees Collection</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="w-4/5 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                </div>
                <span class="font-bold text-yellow-600">85%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700 font-medium">Leave Approvals</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="w-2/3 h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                </div>
                <span class="font-bold text-purple-600">67%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Approvals -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 350 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock class="w-5 h-5 text-orange-600" />
            Pending
          </h3>
          <div class="space-y-3">
            <div class="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p class="font-medium text-gray-900">Leave Requests</p>
              <p class="text-2xl font-bold text-orange-600 mt-1">5</p>
            </div>
            <div class="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p class="font-medium text-gray-900">Outstanding Fees</p>
              <p class="text-2xl font-bold text-red-600 mt-1">₹45,000</p>
            </div>
            <div class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p class="font-medium text-gray-900">Messages</p>
              <p class="text-2xl font-bold text-blue-600 mt-1">12</p>
            </div>
          </div>
        </div>

        <!-- Recent Announcements -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          class="card-interactive"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Announcements</h3>
          <div class="space-y-2">
            <div
              v-for="ann in announcements.slice(0, 3)"
              :key="ann.id"
              class="p-2 text-sm bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500"
            >
              <p class="font-semibold text-gray-900">{{ ann.title }}</p>
              <p class="text-xs text-gray-600 mt-0.5">{{ ann.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Users, GraduationCap, School, Activity, Zap, Megaphone,
  DollarSign, BarChart3, Clock
} from 'lucide-vue-next'
import StatsCard from '@/components/features/StatsCard.vue'

const currentDate = new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})

// Stats
const stats = computed(() => ({
  totalStudents: 127,
  totalTeachers: 24,
  totalClasses: 8,
  pendingFees: 12
}))

// Mock recent activities
const recentActivities = [
  { id: 1, type: 'student', title: 'New Student Enrolled', description: 'Rohit Kumar enrolled in Class 10-A', time: '2 mins ago' },
  { id: 2, type: 'teacher', title: 'Leave Request Approved', description: 'John Teacher approved for 3 days', time: '1 hour ago' },
  { id: 3, type: 'fee', title: 'Fee Payment Received', description: '₹5,000 received from Jane Student', time: '3 hours ago' },
  { id: 4, type: 'announcement', title: 'New Announcement Posted', description: 'Annual Sports Day announced', time: '5 hours ago' }
]

const announcements = [
  { id: 1, title: 'Annual Sports Day', date: 'March 20, 2025' },
  { id: 2, title: 'Parent-Teacher Meeting', date: 'March 25, 2025' },
  { id: 3, title: 'Final Exams Begin', date: 'April 1, 2025' }
]

// Helper functions
const activityIcon = (type) => ({
  student: 'UserPlus',
  teacher: 'CheckCircle',
  fee: 'DollarSign',
  announcement: 'Megaphone'
}[type])

const activityIconBg = (type) => ({
  student: 'bg-blue-100',
  teacher: 'bg-green-100',
  fee: 'bg-yellow-100',
  announcement: 'bg-purple-100'
}[type])

const activityIconColor = (type) => ({
  student: 'text-blue-600',
  teacher: 'text-green-600',
  fee: 'text-yellow-600',
  announcement: 'text-purple-600'
}[type])
</script>
