// Mock API endpoints implementation for development
import {
  mockStudents, mockTeachers, mockClasses, mockAttendance, mockGrades,
  mockAnnouncements, mockFees, mockHomework, mockMessages, mockEvents,
  mockNotifications, mockLibrary, mockTransport, mockHostel, mockTimetable,
  mockLeaveRequests
} from './mockData'

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// Error handling helper
const throwError = (message, status = 400) => {
  const error = new Error(message)
  error.response = { status, data: { message } }
  throw error
}

// ==================== STUDENTS ====================
export const getStudents = async () => {
  await delay(400)
  return { data: mockStudents, success: true }
}

export const getStudent = async (id) => {
  await delay(300)
  const student = mockStudents.find(s => s.id === parseInt(id))
  if (!student) throwError('Student not found', 404)
  return { data: student, success: true }
}

export const createStudent = async (data) => {
  await delay(400)
  const newStudent = { id: Date.now(), ...data, status: 'active' }
  mockStudents.push(newStudent)
  return { data: newStudent, success: true }
}

export const updateStudent = async (id, data) => {
  await delay(400)
  const student = mockStudents.find(s => s.id === parseInt(id))
  if (!student) throwError('Student not found', 404)
  Object.assign(student, data)
  return { data: student, success: true }
}

export const deleteStudent = async (id) => {
  await delay(300)
  const index = mockStudents.findIndex(s => s.id === parseInt(id))
  if (index === -1) throwError('Student not found', 404)
  mockStudents.splice(index, 1)
  return { success: true }
}

// ==================== TEACHERS ====================
export const getTeachers = async () => {
  await delay(400)
  return { data: mockTeachers, success: true }
}

export const getTeacher = async (id) => {
  await delay(300)
  const teacher = mockTeachers.find(t => t.id === parseInt(id))
  if (!teacher) throwError('Teacher not found', 404)
  return { data: teacher, success: true }
}

export const createTeacher = async (data) => {
  await delay(400)
  const newTeacher = { id: Date.now(), ...data, status: 'active' }
  mockTeachers.push(newTeacher)
  return { data: newTeacher, success: true }
}

export const updateTeacher = async (id, data) => {
  await delay(400)
  const teacher = mockTeachers.find(t => t.id === parseInt(id))
  if (!teacher) throwError('Teacher not found', 404)
  Object.assign(teacher, data)
  return { data: teacher, success: true }
}

// ==================== CLASSES ====================
export const getClasses = async () => {
  await delay(400)
  return { data: mockClasses, success: true }
}

export const getClass = async (id) => {
  await delay(300)
  const cls = mockClasses.find(c => c.id === parseInt(id))
  if (!cls) throwError('Class not found', 404)
  return { data: cls, success: true }
}

export const createClass = async (data) => {
  await delay(400)
  const newClass = { id: Date.now(), ...data }
  mockClasses.push(newClass)
  return { data: newClass, success: true }
}

// ==================== ATTENDANCE ====================
export const getAttendance = async (filter = {}) => {
  await delay(400)
  let filtered = mockAttendance
  if (filter.studentId) filtered = filtered.filter(a => a.studentId === filter.studentId)
  if (filter.date) filtered = filtered.filter(a => a.date === filter.date)
  return { data: filtered, success: true }
}

export const markAttendance = async (data) => {
  await delay(300)
  const record = mockAttendance.find(a => a.studentId === data.studentId && a.date === data.date)
  if (record) Object.assign(record, data)
  else mockAttendance.push({ id: Date.now(), ...data })
  return { success: true }
}

// ==================== GRADES ====================
export const getGrades = async (filter = {}) => {
  await delay(400)
  let filtered = mockGrades
  if (filter.studentId) filtered = filtered.filter(g => g.studentId === filter.studentId)
  return { data: filtered, success: true }
}

export const updateGrades = async (data) => {
  await delay(400)
  const grade = mockGrades.find(g => g.id === data.id)
  if (grade) Object.assign(grade, data)
  else mockGrades.push({ id: Date.now(), ...data })
  return { data: grade || { id: Date.now(), ...data }, success: true }
}

// ==================== ANNOUNCEMENTS ====================
export const getAnnouncements = async () => {
  await delay(400)
  return { data: mockAnnouncements, success: true }
}

export const createAnnouncement = async (data) => {
  await delay(400)
  const newAnnouncement = {
    id: Date.now(),
    ...data,
    date: new Date().toISOString().split('T')[0]
  }
  mockAnnouncements.unshift(newAnnouncement)
  return { data: newAnnouncement, success: true }
}

export const updateAnnouncement = async (id, data) => {
  await delay(400)
  const announcement = mockAnnouncements.find(a => a.id === parseInt(id))
  if (!announcement) throwError('Announcement not found', 404)
  Object.assign(announcement, data)
  return { data: announcement, success: true }
}

export const deleteAnnouncement = async (id) => {
  await delay(300)
  const index = mockAnnouncements.findIndex(a => a.id === parseInt(id))
  if (index === -1) throwError('Announcement not found', 404)
  mockAnnouncements.splice(index, 1)
  return { success: true }
}

// ==================== FEES ====================
export const getFees = async (filter = {}) => {
  await delay(400)
  let filtered = mockFees
  if (filter.studentId) filtered = filtered.filter(f => f.studentId === filter.studentId)
  return { data: filtered, success: true }
}

export const updateFeeStatus = async (id, status) => {
  await delay(300)
  const fee = mockFees.find(f => f.id === parseInt(id))
  if (!fee) throwError('Fee record not found', 404)
  fee.status = status
  if (status === 'paid') fee.paidDate = new Date().toISOString().split('T')[0]
  return { data: fee, success: true }
}

// ==================== HOMEWORK ====================
export const getHomework = async (filter = {}) => {
  await delay(400)
  let filtered = mockHomework
  if (filter.class) filtered = filtered.filter(h => h.class === filter.class)
  return { data: filtered, success: true }
}

export const createHomework = async (data) => {
  await delay(400)
  const newHomework = {
    id: Date.now(),
    ...data,
    status: 'pending',
    submissionDate: null
  }
  mockHomework.push(newHomework)
  return { data: newHomework, success: true }
}

// ==================== MESSAGES ====================
export const getMessages = async (filter = {}) => {
  await delay(400)
  let filtered = mockMessages
  if (filter.userId) {
    filtered = filtered.filter(m => m.senderId === filter.userId || m.recipientId === filter.userId)
  }
  return { data: filtered, success: true }
}

export const sendMessage = async (data) => {
  await delay(300)
  const newMessage = {
    id: Date.now(),
    ...data,
    timestamp: new Date(),
    read: false
  }
  mockMessages.push(newMessage)
  return { data: newMessage, success: true }
}

export const markMessageAsRead = async (id) => {
  await delay(200)
  const message = mockMessages.find(m => m.id === parseInt(id))
  if (message) message.read = true
  return { success: true }
}

// ==================== EVENTS ====================
export const getEvents = async () => {
  await delay(400)
  return { data: mockEvents, success: true }
}

export const createEvent = async (data) => {
  await delay(400)
  const newEvent = { id: Date.now(), ...data }
  mockEvents.push(newEvent)
  return { data: newEvent, success: true }
}

// ==================== NOTIFICATIONS ====================
export const getNotifications = async (userId) => {
  await delay(400)
  return { data: mockNotifications, success: true }
}

export const markNotificationAsRead = async (id) => {
  await delay(200)
  const notification = mockNotifications.find(n => n.id === parseInt(id))
  if (notification) notification.read = true
  return { success: true }
}

// ==================== LIBRARY ====================
export const getLibraryBooks = async () => {
  await delay(400)
  return { data: mockLibrary, success: true }
}

export const borrowBook = async (bookId, studentId) => {
  await delay(300)
  const book = mockLibrary.find(b => b.id === parseInt(bookId))
  if (!book) throwError('Book not found', 404)
  if (book.availableCopies <= 0) throwError('No copies available', 400)
  book.availableCopies--
  return { success: true, message: 'Book borrowed successfully' }
}

export const returnBook = async (bookId) => {
  await delay(300)
  const book = mockLibrary.find(b => b.id === parseInt(bookId))
  if (!book) throwError('Book not found', 404)
  book.availableCopies++
  return { success: true, message: 'Book returned successfully' }
}

// ==================== TRANSPORT ====================
export const getTransport = async () => {
  await delay(400)
  return { data: mockTransport, success: true }
}

// ==================== HOSTEL ====================
export const getHostel = async () => {
  await delay(400)
  return { data: mockHostel, success: true }
}

// ==================== TIMETABLE ====================
export const getTimetable = async () => {
  await delay(400)
  return { data: mockTimetable, success: true }
}

// ==================== LEAVE REQUESTS ====================
export const getLeaveRequests = async (filter = {}) => {
  await delay(400)
  let filtered = mockLeaveRequests
  if (filter.userId) filtered = filtered.filter(l => l.userId === filter.userId)
  if (filter.status) filtered = filtered.filter(l => l.status === filter.status)
  return { data: filtered, success: true }
}

export const createLeaveRequest = async (data) => {
  await delay(400)
  const newRequest = {
    id: Date.now(),
    ...data,
    status: 'pending'
  }
  mockLeaveRequests.push(newRequest)
  return { data: newRequest, success: true }
}

export const updateLeaveRequestStatus = async (id, status) => {
  await delay(300)
  const request = mockLeaveRequests.find(l => l.id === parseInt(id))
  if (!request) throwError('Leave request not found', 404)
  request.status = status
  return { data: request, success: true }
}

// ==================== DASHBOARD STATS ====================
export const getDashboardStats = async () => {
  await delay(400)
  return {
    data: {
      totalStudents: mockStudents.length,
      totalTeachers: mockTeachers.length,
      totalClasses: mockClasses.length,
      pendingFees: mockFees.filter(f => f.status === 'pending').length,
      averageAttendance: 92.5,
      pendingLeaveRequests: mockLeaveRequests.filter(l => l.status === 'pending').length
    },
    success: true
  }
}

export default {
  getStudents, getStudent, createStudent, updateStudent, deleteStudent,
  getTeachers, getTeacher, createTeacher, updateTeacher,
  getClasses, getClass, createClass,
  getAttendance, markAttendance,
  getGrades, updateGrades,
  getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
  getFees, updateFeeStatus,
  getHomework, createHomework,
  getMessages, sendMessage, markMessageAsRead,
  getEvents, createEvent,
  getNotifications, markNotificationAsRead,
  getLibraryBooks, borrowBook, returnBook,
  getTransport,
  getHostel,
  getTimetable,
  getLeaveRequests, createLeaveRequest, updateLeaveRequestStatus,
  getDashboardStats
}
