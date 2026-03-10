<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  data: Array,
  height: { type: String, default: '300px' }
})

const chartData = computed(() => ({
  labels: props.data.map(d => d.grade),
  datasets: [
    {
      label: 'Number of Students',
      data: props.data.map(d => d.count),
      backgroundColor: [
        'rgba(79, 70, 229, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(249, 115, 22, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderColor: [
        '#4f46e5',
        '#a855f7',
        '#ec4899',
        '#f97316',
        '#ef4444',
      ],
      borderWidth: 1,
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true }
  }
}
</script>