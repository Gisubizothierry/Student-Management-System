import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/demo',
    name: 'DemoRequest',
    component: () => import('@/views/public/DemoRequest.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SchoolSignup',
    component: () => import('@/views/public/SchoolSignup.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/select-class',
    name: 'SelectClass',
    component: () => import('@/views/auth/SelectClass.vue'),
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/',
    component: () => import('@/components/layout/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      // Admin routes
      {
        path: 'admin',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/students',
        name: 'ManageStudents',
        component: () => import('@/views/admin/ManageStudents.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/teachers',
        name: 'ManageTeachers',
        component: () => import('@/views/admin/ManageTeachers.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/classes',
        name: 'ManageClasses',
        component: () => import('@/views/admin/ManageClasses.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/timetable',
        name: 'Timetable',
        component: () => import('@/views/admin/Timetable.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/announcements',
        name: 'ManageAnnouncements',
        component: () => import('@/views/admin/ManageAnnouncements.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/fees',
        name: 'ManageFees',
        component: () => import('@/views/admin/ManageFees.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/library',
        name: 'ManageLibrary',
        component: () => import('@/views/admin/ManageLibrary.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/transport',
        name: 'ManageTransport',
        component: () => import('@/views/admin/ManageTransport.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/hostel',
        name: 'ManageHostel',
        component: () => import('@/views/admin/ManageHostel.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/analytics',
        name: 'Analytics',
        component: () => import('@/views/admin/Analytics.vue'),
        meta: { role: 'admin' }
      },
      {
        path: 'admin/reports',
        name: 'Reports',
        component: () => import('@/views/admin/Reports.vue'),
        meta: { role: 'admin' }
      },
      // Teacher routes
      {
        path: 'teacher',
        name: 'TeacherDashboard',
        component: () => import('@/views/teacher/TeacherDashboard.vue'),
        meta: { role: 'teacher' }
      },
      {
        path: 'teacher/attendance',
        name: 'TakeAttendance',
        component: () => import('@/views/teacher/TakeAttendance.vue'),
        meta: { role: 'teacher' }
      },
      {
        path: 'teacher/marks',
        name: 'EnterMarks',
        component: () => import('@/views/teacher/EnterMarks.vue'),
        meta: { role: 'teacher' }
      },
      {
        path: 'teacher/exams/create',
        name: 'CreateExam',
        component: () => import('@/views/teacher/CreateExam.vue'),
        meta: { role: 'teacher' }
      },
      {
        path: 'teacher/homework',
        name: 'TeacherHomework',
        component: () => import('@/views/teacher/Homework.vue'),
        meta: { role: 'teacher' }
      },
      {
        path: 'teacher/leave-requests',
        name: 'TeacherLeaveRequests',
        component: () => import('@/views/teacher/LeaveRequests.vue'),
        meta: { role: 'teacher' }
      },
      // Student routes
      {
        path: 'student',
        name: 'StudentDashboard',
        component: () => import('@/views/student/StudentDashboard.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/attendance',
        name: 'MyAttendance',
        component: () => import('@/views/student/MyAttendance.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/grades',
        name: 'MyGrades',
        component: () => import('@/views/student/MyGrades.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/report-card',
        name: 'ReportCard',
        component: () => import('@/views/student/ReportCard.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/fees',
        name: 'StudentFees',
        component: () => import('@/views/student/Fees.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/library',
        name: 'StudentLibrary',
        component: () => import('@/views/student/Library.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/transport',
        name: 'StudentTransport',
        component: () => import('@/views/student/Transport.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/hostel',
        name: 'StudentHostel',
        component: () => import('@/views/student/Hostel.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/homework',
        name: 'StudentHomework',
        component: () => import('@/views/student/Homework.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/leave-requests',
        name: 'StudentLeaveRequests',
        component: () => import('@/views/student/LeaveRequests.vue'),
        meta: { role: 'student' }
      },
      {
        path: 'student/calendar',
        name: 'StudentCalendar',
        component: () => import('@/views/student/Calendar.vue'),
        meta: { role: 'student' }
      },
      // Parent routes
      {
        path: 'parent',
        name: 'ParentDashboard',
        component: () => import('@/views/parent/ParentDashboard.vue'),
        meta: { role: 'parent' }
      },
      {
        path: 'parent/child-progress',
        name: 'ChildProgress',
        component: () => import('@/views/parent/ChildProgress.vue'),
        meta: { role: 'parent' }
      },
      {
        path: 'parent/fees',
        name: 'ParentFees',
        component: () => import('@/views/parent/Fees.vue'),
        meta: { role: 'parent' }
      },
      // Shared routes
      {
        path: 'messages',
        name: 'Messages',
        component: () => import('@/views/messages/Inbox.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: { requiresAuth: true }
      },
      // Default redirect
      {
        path: '',
        redirect: to => {
          const authStore = useAuthStore()
          if (authStore.role === 'admin') return '/admin'
          if (authStore.role === 'teacher') return '/teacher'
          if (authStore.role === 'student') return '/student'
          if (authStore.role === 'parent') return '/parent'
          return '/login'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRole = to.meta.role

  if (requiresAuth && !authStore.token) {
    next('/login')
  } else if (requiresAuth && requiredRole && authStore.role !== requiredRole) {
    // Redirect to appropriate dashboard
    if (authStore.role === 'admin') next('/admin')
    else if (authStore.role === 'teacher') next('/teacher')
    else if (authStore.role === 'student') next('/student')
    else if (authStore.role === 'parent') next('/parent')
    else next('/login')
  } else if (requiresAuth && authStore.role === 'student' && !authStore.selectedClass && to.path !== '/select-class') {
    next('/select-class')
  } else {
    next()
  }
})

export default router