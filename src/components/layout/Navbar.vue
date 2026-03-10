<template>
  <header class="bg-gradient-brand text-white shadow-lg animate-gradient bg-[length:200%_200%]">
    <div class="px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">{{ pageTitle }}</h1>
      <div class="flex items-center space-x-4">
        <!-- Notification Bell (optional) -->
        <NotificationBell v-if="false" /> <!-- Hide if not needed -->

        <!-- Settings Icon (links to profile) -->
        <router-link to="/profile" class="hover:bg-white/10 p-2 rounded-full transition">
          <Settings class="w-6 h-6" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Settings } from 'lucide-vue-next'
// import NotificationBell from '@/components/features/NotificationBell.vue' // optional

const route = useRoute()

const pageTitle = computed(() => {
  const name = route.name
  const titles = {
    AdminDashboard: 'Admin Dashboard',
    ManageStudents: 'Manage Students',
    ManageTeachers: 'Manage Teachers',
    ManageClasses: 'Manage Classes',
    ManageAttendance: 'All Attendance',
    ManageExams: 'Manage Exams',
    ManageTimetable: 'Manage Timetable',
    TeacherDashboard: 'Teacher Dashboard',
    TakeAttendance: 'Take Attendance',
    EnterMarks: 'Enter Marks',
    TeacherTimetable: 'My Timetable',
    StudentDashboard: 'Student Dashboard',
    MyAttendance: 'My Attendance',
    MyGrades: 'My Grades',
    MyTimetable: 'My Timetable',
    Profile: 'Profile'
  }
  return titles[name] || 'Dashboard'
})
</script>