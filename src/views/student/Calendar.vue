<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Academic Calendar</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: [
    { title: 'Math Exam', start: '2025-04-15', color: '#ef4444' },
    { title: 'Science Fair', start: '2025-04-20', end: '2025-04-22', color: '#3b82f6' },
    { title: 'Parent Meeting', start: '2025-04-25T10:00:00', color: '#10b981' },
    { title: 'Holiday', start: '2025-05-01', color: '#f59e0b' }
  ],
  dateClick: (info) => {
    alert('Date: ' + info.dateStr)
  },
  eventClick: (info) => {
    alert('Event: ' + info.event.title)
  },
  height: 600
}
</script>