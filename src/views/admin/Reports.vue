<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Reports & Analytics</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Attendance Trends</h3>
        <AttendanceChart :data="attendanceData" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Grade Distribution</h3>
        <GradeChart :data="gradeData" />
      </div>
    </div>
    <div class="flex justify-end">
      <Button @click="exportPDF" variant="primary">Export as PDF</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/common/Button.vue'
import AttendanceChart from '@/components/features/AttendanceChart.vue'
import GradeChart from '@/components/features/GradeChart.vue'
import html2pdf from 'html2pdf.js'

const attendanceData = ref([
  { month: 'Jan', present: 85, absent: 15 },
  { month: 'Feb', present: 88, absent: 12 },
  { month: 'Mar', present: 90, absent: 10 },
])

const gradeData = ref([
  { grade: 'A', count: 30 },
  { grade: 'B', count: 45 },
  { grade: 'C', count: 20 },
  { grade: 'D', count: 5 },
])

const exportPDF = () => {
  const element = document.querySelector('.grid') // or a more specific container
  html2pdf().from(element).set({
    margin: 1,
    filename: 'report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
  }).save()
}
</script>