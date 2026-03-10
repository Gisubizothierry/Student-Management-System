<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Analytics</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Attendance Trends</h3>
        <AttendanceChart :data="attendanceData" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Grade Distribution</h3>
        <GradeChart :data="gradeData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AttendanceChart from '@/components/features/AttendanceChart.vue'
import GradeChart from '@/components/features/GradeChart.vue'

const attendanceData = ref([
  { month: 'Jan', present: 85, absent: 15 },
  { month: 'Feb', present: 88, absent: 12 },
  { month: 'Mar', present: 90, absent: 10 }
])

const gradeData = ref([
  { grade: 'A', count: 30 },
  { grade: 'B', count: 45 },
  { grade: 'C', count: 20 },
  { grade: 'D', count: 5 }
])
</script>