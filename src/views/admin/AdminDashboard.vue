<template>
  <div>
    <!-- Page Title -->
    <h2 class="text-3xl font-bold text-gradient-brand mb-6">Admin Dashboard</h2>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          :value="stats.totalStudents"
          icon="Users"
          color="indigo"
        />
        <StatsCard
          title="Total Teachers"
          :value="stats.totalTeachers"
          icon="GraduationCap"
          color="purple"
        />
        <StatsCard
          title="Classes"
          :value="stats.totalClasses"
          icon="School"
          color="pink"
        />
        <StatsCard
          title="Subjects"
          :value="stats.totalSubjects"
          icon="BookOpen"
          color="indigo"
        />
      </div>

      <!-- Performance Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2 flex items-center">
            <TrendingUp class="w-5 h-5 mr-2 text-indigo-600" />
            Attendance Overview
          </h3>
          <p class="text-3xl font-bold text-indigo-600">{{ stats.avgAttendance }}%</p>
          <p class="text-sm text-gray-500">Average attendance this month</p>
          <div class="divider-gradient-purple my-4"></div>
          <AttendanceChart :data="attendanceData" height="200px" />
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2 flex items-center">
            <Award class="w-5 h-5 mr-2 text-purple-600" />
            Grade Distribution
          </h3>
          <p class="text-3xl font-bold text-purple-600">{{ stats.passRate }}%</p>
          <p class="text-sm text-gray-500">Overall pass rate</p>
          <div class="divider-gradient-purple my-4"></div>
          <GradeChart :data="gradeData" height="200px" />
        </div>
      </div>

      <!-- Recent Activities & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activities -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <Clock class="w-5 h-5 mr-2 text-indigo-600" />
            Recent Activities
          </h3>
          <ul class="space-y-4">
            <li v-for="act in activities" :key="act.id" class="flex items-start">
              <div class="w-2 h-2 mt-2 rounded-full bg-gradient-brand mr-3"></div>
              <div class="flex-1">
                <p class="text-sm text-gray-800">{{ act.text }}</p>
                <p class="text-xs text-gray-500">{{ act.time }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <Zap class="w-5 h-5 mr-2 text-purple-600" />
            Quick Actions
          </h3>
          <div class="grid grid-cols-1 gap-3">
            <router-link
              to="/admin/students"
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group"
            >
              <Users class="w-5 h-5 mr-3 text-indigo-600 group-hover:text-indigo-700" />
              <span class="text-sm font-medium">Manage Students</span>
            </router-link>
            <router-link
              to="/admin/teachers"
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group"
            >
              <GraduationCap class="w-5 h-5 mr-3 text-purple-600 group-hover:text-purple-700" />
              <span class="text-sm font-medium">Manage Teachers</span>
            </router-link>
            <router-link
              to="/admin/classes"
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group"
            >
              <School class="w-5 h-5 mr-3 text-pink-600 group-hover:text-pink-700" />
              <span class="text-sm font-medium">Manage Classes</span>
            </router-link>
            <router-link
              to="/admin/attendance"
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group"
            >
              <CalendarCheck class="w-5 h-5 mr-3 text-indigo-600 group-hover:text-indigo-700" />
              <span class="text-sm font-medium">View Attendance</span>
            </router-link>
            <router-link
              to="/admin/exams"
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group"
            >
              <FileText class="w-5 h-5 mr-3 text-purple-600 group-hover:text-purple-700" />
              <span class="text-sm font-medium">Manage Exams</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Users, GraduationCap, School, BookOpen, TrendingUp, Award, Clock, Zap, CalendarCheck, FileText
} from 'lucide-vue-next'
import StatsCard from '@/components/features/StatsCard.vue'
import AttendanceChart from '@/components/features/AttendanceChart.vue'
import GradeChart from '@/components/features/GradeChart.vue'

// Import stores – ensure no duplicates
import { useStudentsStore } from '@/stores/students'
import { useTeachersStore } from '@/stores/teachers'
import { useClassesStore } from '@/stores/classes'
import { useAttendanceStore } from '@/stores/attendance'
import { useGradesStore } from '@/stores/grades'

// Initialize stores
const studentsStore = useStudentsStore()
const teachersStore = useTeachersStore()
const classesStore = useClassesStore()
const attendanceStore = useAttendanceStore()
const gradesStore = useGradesStore()

// State
const loading = ref(true)
const error = ref(null)
const stats = ref({
  totalStudents: 0,
  totalTeachers: 0,
  totalClasses: 0,
  totalSubjects: 0,
  avgAttendance: 0,
  passRate: 0
})
const attendanceData = ref([])
const gradeData = ref([])
const activities = ref([])

// Load all data
const loadDashboardData = async () => {
  try {
    loading.value = true
    error.value = null

    // Fetch all required data in parallel
    await Promise.all([
      studentsStore.fetchStudents(),
      teachersStore.fetchTeachers(),
      classesStore.fetchClasses(),
      classesStore.fetchSubjects(),
      attendanceStore.fetchAttendance(),
      gradesStore.fetchGrades()
    ])

    // Calculate stats
    stats.value = {
      totalStudents: studentsStore.students.length,
      totalTeachers: teachersStore.teachers.length,
      totalClasses: classesStore.classes.length,
      totalSubjects: classesStore.subjects.length,
      avgAttendance: calculateAvgAttendance(),
      passRate: calculatePassRate()
    }

    // Prepare chart data
    attendanceData.value = generateAttendanceChartData()
    gradeData.value = generateGradeChartData()
    activities.value = generateActivities()

  } catch (err) {
    error.value = 'Failed to load dashboard data. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Helper: calculate average attendance
const calculateAvgAttendance = () => {
  const records = attendanceStore.records
  if (!records.length) return 0
  const presentCount = records.filter(r => r.status === 'present').length
  return Math.round((presentCount / records.length) * 100)
}

// Helper: calculate pass rate (marks >= 50)
const calculatePassRate = () => {
  const grades = gradesStore.grades
  if (!grades.length) return 0
  const passCount = grades.filter(g => g.marksObtained >= 50).length
  return Math.round((passCount / grades.length) * 100)
}

// Helper: generate attendance chart data from real records
const generateAttendanceChartData = () => {
  // Group by month (simplified mock – replace with real grouping)
  return [
    { month: 'Jan', present: 85, absent: 15 },
    { month: 'Feb', present: 88, absent: 12 },
    { month: 'Mar', present: 90, absent: 10 },
    { month: 'Apr', present: 87, absent: 13 },
  ]
}

// Helper: generate grade distribution from real grades
const generateGradeChartData = () => {
  const grades = gradesStore.grades
  const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0 }
  grades.forEach(g => {
    if (g.marksObtained >= 90) distribution.A++
    else if (g.marksObtained >= 75) distribution.B++
    else if (g.marksObtained >= 60) distribution.C++
    else if (g.marksObtained >= 50) distribution.D++
    else distribution.F++
  })
  return Object.entries(distribution).map(([grade, count]) => ({ grade, count }))
}

// Helper: generate recent activities from all stores
const generateActivities = () => {
  const acts = []
  // Add new students
  studentsStore.students.slice(-3).forEach(s => {
    acts.push({
      id: `s-${s.id}`,
      text: `New student registered: ${s.fullName}`,
      time: 'Just now' // would need actual timestamps
    })
  })
  // Add recent attendance
  attendanceStore.records.slice(-3).forEach(a => {
    acts.push({
      id: `a-${a.id}`,
      text: `Attendance taken for class ${a.classId}`,
      time: 'Recently'
    })
  })
  // Add recent grades
  gradesStore.grades.slice(-3).forEach(g => {
    acts.push({
      id: `g-${g.id}`,
      text: `Grades entered for student ${g.studentId}`,
      time: 'Recently'
    })
  })
  return acts.slice(0, 5) // limit to 5
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.divider-gradient-purple {
  height: 2px;
  background: linear-gradient(90deg, transparent, #a855f7, #c084fc, #a855f7, transparent);
}
</style>