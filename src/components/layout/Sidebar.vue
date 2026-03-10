<template>
  <aside class="w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white flex flex-col">
    <div class="p-4 text-2xl font-bold border-b border-indigo-700">
      School MS
    </div>
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-2">
        <!-- Role‑based links remain the same, but active class now uses gradient -->
        <li v-for="link in filteredLinks" :key="link.to">
          <router-link
            :to="link.to"
            class="flex items-center p-2 hover:bg-indigo-700 rounded transition"
            active-class="bg-gradient-to-r from-pink-500 to-purple-600"
          >
            <component :is="link.icon" class="w-5 h-5 mr-3" />
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t border-indigo-700">
      <button @click="logout" class="flex items-center w-full p-2 hover:bg-indigo-700 rounded">
        <LogOut class="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import {
  LayoutDashboard, Users, GraduationCap, School, CalendarCheck, FileText, CalendarRange,
  ClipboardCheck, ClipboardList, Award, User, LogOut
} from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const role = computed(() => authStore.role)

const linksByRole = {
  admin: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/students', icon: Users, label: 'Students' },
    { to: '/admin/teachers', icon: GraduationCap, label: 'Teachers' },
    { to: '/admin/classes', icon: School, label: 'Classes' },
    { to: '/admin/attendance', icon: CalendarCheck, label: 'Attendance' },
    { to: '/admin/exams', icon: FileText, label: 'Exams' },
    { to: '/admin/timetable', icon: CalendarRange, label: 'Timetable' },
    { to: '/profile', icon: User, label: 'Profile' },
  ],
  teacher: [
    { to: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/teacher/attendance', icon: ClipboardCheck, label: 'Take Attendance' },
    { to: '/teacher/marks', icon: ClipboardList, label: 'Enter Marks' },
    { to: '/teacher/timetable', icon: CalendarRange, label: 'My Timetable' },
    { to: '/profile', icon: User, label: 'Profile' },
  ],
  student: [
    { to: '/student', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/attendance', icon: CalendarCheck, label: 'My Attendance' },
    { to: '/student/grades', icon: Award, label: 'My Grades' },
    { to: '/student/timetable', icon: CalendarRange, label: 'My Timetable' },
    { to: '/profile', icon: User, label: 'Profile' },
  ],
}

const filteredLinks = computed(() => linksByRole[role.value] || [])

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>