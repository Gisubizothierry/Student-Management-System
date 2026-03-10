<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 class="text-2xl font-bold">Manage Students</h2>
      <Button @click="openAddModal" variant="primary">
        <Plus class="w-5 h-5 mr-2 inline" />
        Add New Student
      </Button>
    </div>

    <!-- Students Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <Table :columns="columns" :data="students">
        <!-- Photo column -->
        <template #cell-photo="{ item }">
          <img
            v-if="item.photo"
            :src="item.photo"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div
            v-else
            class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600"
          >
            {{ item.fullName?.charAt(0) }}
          </div>
        </template>

        <!-- Status column with badge -->
        <template #cell-status="{ item }">
          <span
            :class="{
              'px-2 py-1 text-xs font-medium rounded-full': true,
              'bg-green-100 text-green-800': item.status === 'active',
              'bg-red-100 text-red-800': item.status === 'inactive',
            }"
          >
            {{ item.status }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ item }">
          <button
            @click="viewStudent(item)"
            class="text-indigo-600 hover:text-indigo-900 mr-3"
            title="View"
          >
            <Eye class="w-5 h-5 inline" />
          </button>
          <button
            @click="editStudent(item)"
            class="text-indigo-600 hover:text-indigo-900 mr-3"
            title="Edit"
          >
            <Edit class="w-5 h-5 inline" />
          </button>
          <button
            @click="toggleStatus(item)"
            class="text-red-600 hover:text-red-900"
            :title="item.status === 'active' ? 'Deactivate' : 'Activate'"
          >
            <component
              :is="item.status === 'active' ? 'UserX' : 'UserCheck'"
              class="w-5 h-5 inline"
            />
          </button>
        </template>
      </Table>
    </div>

    <!-- Add/Edit Modal -->
    <Modal v-model="showModal" :title="modalTitle">
      <form @submit.prevent="saveStudent">
        <!-- Photo Upload -->
        <PhotoUpload
          :user-id="form.id || 'new'"
          :current-photo="form.photo"
          @uploaded="photoUploaded"
          class="mb-6"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input v-model="form.fullName" label="Full Name *" required />
          <Input v-model="form.admissionNo" label="Admission Number *" required />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              v-model="form.gender"
              class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input v-model="form.dob" label="Date of Birth" type="date" />

          <Input v-model="form.address" label="Address" />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
            <select
              v-model="form.classId"
              class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Class</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }}
              </option>
            </select>
          </div>

          <Input v-model="form.parentContacts" label="Parent/Guardian Contacts" />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Enrollment Status</label>
            <select
              v-model="form.status"
              class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {{ error }}
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">Cancel</Button>
          <Button type="submit" variant="primary" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </Button>
        </div>
      </form>
    </Modal>

    <!-- View Modal (read‑only) -->
    <Modal v-model="showViewModal" title="Student Profile">
      <div v-if="viewingStudent" class="space-y-4">
        <div class="flex items-center space-x-4">
          <img
            v-if="viewingStudent.photo"
            :src="viewingStudent.photo"
            class="w-20 h-20 rounded-full object-cover"
          />
          <div v-else class="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl">
            {{ viewingStudent.fullName?.charAt(0) }}
          </div>
          <div>
            <h3 class="text-xl font-semibold">{{ viewingStudent.fullName }}</h3>
            <p class="text-gray-600">Admission: {{ viewingStudent.admissionNo }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div><span class="font-medium">Gender:</span> {{ viewingStudent.gender || 'N/A' }}</div>
          <div><span class="font-medium">Date of Birth:</span> {{ viewingStudent.dob || 'N/A' }}</div>
          <div><span class="font-medium">Address:</span> {{ viewingStudent.address || 'N/A' }}</div>
          <div><span class="font-medium">Class:</span> {{ getClassName(viewingStudent.classId) }}</div>
          <div><span class="font-medium">Parent Contacts:</span> {{ viewingStudent.parentContacts || 'N/A' }}</div>
          <div>
            <span class="font-medium">Status:</span>
            <span
              :class="{
                'ml-2 px-2 py-1 text-xs font-medium rounded-full': true,
                'bg-green-100 text-green-800': viewingStudent.status === 'active',
                'bg-red-100 text-red-800': viewingStudent.status === 'inactive',
              }"
            >
              {{ viewingStudent.status }}
            </span>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <Button variant="secondary" @click="showViewModal = false">Close</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Eye, Edit, UserX, UserCheck } from 'lucide-vue-next'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import PhotoUpload from '@/components/common/PhotoUpload.vue'
import { useStudentsStore } from '@/stores/students'
import { useClassesStore } from '@/stores/classes'
import { useAuthStore } from '@/stores/auth'

// Stores
const studentsStore = useStudentsStore()
const classesStore = useClassesStore()
const authStore = useAuthStore()

// Table columns definition
const columns = [
  { key: 'photo', label: 'Photo' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'admissionNo', label: 'Admission No' },
  { key: 'gender', label: 'Gender' },
  { key: 'classId', label: 'Class' },
  { key: 'status', label: 'Status' },
]

// Computed: students list
const students = computed(() => studentsStore.students)

// Modal state
const showModal = ref(false)
const showViewModal = ref(false)
const modalTitle = ref('Add Student')
const form = ref({
  id: null,
  fullName: '',
  gender: '',
  dob: '',
  address: '',
  classId: '',
  admissionNo: '',
  parentContacts: '',
  photo: '',
  status: 'active',
})
const viewingStudent = ref(null)
const error = ref('')
const loading = ref(false)

// Classes list for dropdown
const classes = computed(() => classesStore.classes)

// Helper to get class name by ID
const getClassName = (classId) => {
  const cls = classes.value.find(c => c.id === classId)
  return cls ? cls.name : 'N/A'
}

// Open add modal
const openAddModal = () => {
  form.value = {
    id: null,
    fullName: '',
    gender: '',
    dob: '',
    address: '',
    classId: '',
    admissionNo: '',
    parentContacts: '',
    photo: '',
    status: 'active',
  }
  modalTitle.value = 'Add Student'
  error.value = ''
  showModal.value = true
}

// Edit student
const editStudent = (student) => {
  form.value = { ...student }
  modalTitle.value = 'Edit Student'
  error.value = ''
  showModal.value = true
}

// View student
const viewStudent = (student) => {
  viewingStudent.value = student
  showViewModal.value = true
}

// Photo upload callback
const photoUploaded = (url) => {
  form.value.photo = url
}

// Save student (add or update)
const saveStudent = async () => {
  // Basic validation
  if (!form.value.fullName || !form.value.admissionNo) {
    error.value = 'Full Name and Admission Number are required.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    if (modalTitle.value === 'Add Student') {
      // Generate a new ID (mock – replace with API call)
      const newStudent = {
        ...form.value,
        id: Date.now(),
      }
      studentsStore.addStudent(newStudent)
    } else {
      studentsStore.updateStudent(form.value)
    }
    showModal.value = false
  } catch (err) {
    error.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

// Toggle active/inactive
const toggleStatus = (student) => {
  const newStatus = student.status === 'active' ? 'inactive' : 'active'
  studentsStore.updateStudent({ ...student, status: newStatus })
}

// Load data on mount
onMounted(async () => {
  await studentsStore.fetchStudents()
  await classesStore.fetchClasses()
})
</script>