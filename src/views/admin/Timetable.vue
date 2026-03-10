<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Timetable Management</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="mb-4 flex gap-4">
        <select v-model="selectedClass" class="border rounded-lg px-3 py-2">
          <option value="">Select Class</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
        </select>
        <Button @click="addEntry" variant="primary">Add Entry</Button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2">Day</th>
              <th class="px-4 py-2">Start</th>
              <th class="px-4 py-2">End</th>
              <th class="px-4 py-2">Subject</th>
              <th class="px-4 py-2">Teacher</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, idx) in timetable" :key="idx">
              <td class="border px-4 py-2">
                <select v-model="entry.day" class="border rounded px-2 py-1">
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                </select>
              </td>
              <td class="border px-4 py-2">
                <input v-model="entry.start" type="time" class="border rounded px-2 py-1" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="entry.end" type="time" class="border rounded px-2 py-1" />
              </td>
              <td class="border px-4 py-2">
                <select v-model="entry.subject" class="border rounded px-2 py-1">
                  <option value="math">Mathematics</option>
                  <option value="eng">English</option>
                  <option value="sci">Science</option>
                </select>
              </td>
              <td class="border px-4 py-2">
                <select v-model="entry.teacher" class="border rounded px-2 py-1">
                  <option value="1">Mr. Smith</option>
                  <option value="2">Ms. Jones</option>
                  <option value="3">Dr. Brown</option>
                </select>
              </td>
              <td class="border px-4 py-2">
                <button @click="removeEntry(idx)" class="text-red-600">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button @click="saveTimetable" class="mt-4" variant="primary">Save Timetable</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/common/Button.vue'

const selectedClass = ref('')
const timetable = ref([])

const addEntry = () => {
  timetable.value.push({
    day: '1',
    start: '08:00',
    end: '09:00',
    subject: '',
    teacher: ''
  })
}

const removeEntry = (idx) => {
  timetable.value.splice(idx, 1)
}

const saveTimetable = async () => {
  console.log('Saving timetable for class', selectedClass.value, timetable.value)
  // await api.post(`/timetable/${selectedClass.value}`, timetable.value)
  alert('Timetable saved (mock)')
}
</script>