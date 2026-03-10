// Comprehensive mock data for the entire application

export const mockStudents = [
  {
    id: 1,
    name: 'Jane Student',
    email: 'student@school.com',
    class: '10-A',
    rollNumber: 'STU001',
    dateOfBirth: '2010-03-15',
    gender: 'Female',
    phone: '+1-555-0103',
    address: '789 Student Ave',
    parentName: 'Parent User',
    parentPhone: '+1-555-0104',
    admissionDate: '2023-06-01',
    status: 'active'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@school.com',
    class: '10-A',
    rollNumber: 'STU002',
    dateOfBirth: '2010-05-20',
    gender: 'Male',
    phone: '+1-555-0105',
    address: '101 Main Street',
    parentName: 'Michael Doe',
    parentPhone: '+1-555-0106',
    admissionDate: '2023-06-01',
    status: 'active'
  },
  {
    id: 3,
    name: 'Alice Smith',
    email: 'alice.smith@school.com',
    class: '9-B',
    rollNumber: 'STU003',
    dateOfBirth: '2011-07-10',
    gender: 'Female',
    phone: '+1-555-0107',
    address: '202 Oak Road',
    parentName: 'Sarah Smith',
    parentPhone: '+1-555-0108',
    admissionDate: '2024-06-01',
    status: 'active'
  }
]

export const mockTeachers = [
  {
    id: 1,
    name: 'John Teacher',
    email: 'teacher@school.com',
    department: 'STEM',
    subjects: ['Mathematics', 'Physics'],
    phone: '+1-555-0102',
    address: '456 Teacher Lane',
    qualifications: 'B.Ed, M.Sc Physics',
    experience: 8,
    joinDate: '2016-07-01',
    status: 'active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@school.com',
    department: 'Languages',
    subjects: ['English', 'Hindi'],
    phone: '+1-555-0109',
    address: '303 Pine Lane',
    qualifications: 'B.Ed, MA English',
    experience: 5,
    joinDate: '2019-07-01',
    status: 'active'
  }
]

export const mockClasses = [
  { id: 1, name: '10-A', section: 'A', standard: 10, strength: 45, classTeacher: 'John Teacher' },
  { id: 2, name: '10-B', section: 'B', standard: 10, strength: 42, classTeacher: 'Sarah Johnson' },
  { id: 3, name: '9-A', section: 'A', standard: 9, strength: 48, classTeacher: 'Robert Lee' },
  { id: 4, name: '9-B', section: 'B', standard: 9, strength: 44, classTeacher: 'Emily Brown' }
]

export const mockAttendance = [
  { id: 1, studentId: 1, date: '2025-03-10', status: 'present', remarks: '' },
  { id: 2, studentId: 1, date: '2025-03-09', status: 'present', remarks: '' },
  { id: 3, studentId: 2, date: '2025-03-10', status: 'absent', remarks: 'Sick leave' },
  { id: 4, studentId: 2, date: '2025-03-09', status: 'present', remarks: '' },
  { id: 5, studentId: 3, date: '2025-03-10', status: 'present', remarks: '' }
]

export const mockGrades = [
  { id: 1, studentId: 1, subjectId: 1, exam: 'Midterm', marks: 92, totalMarks: 100, grade: 'A+' },
  { id: 2, studentId: 1, subjectId: 2, exam: 'Midterm', marks: 88, totalMarks: 100, grade: 'A' },
  { id: 3, studentId: 2, subjectId: 1, exam: 'Midterm', marks: 78, totalMarks: 100, grade: 'B' },
  { id: 4, studentId: 2, subjectId: 2, exam: 'Midterm', marks: 85, totalMarks: 100, grade: 'A' }
]

export const mockAnnouncements = [
  {
    id: 1,
    title: 'Annual Sports Day',
    description: 'Join us for our annual sports day on March 20th',
    content: 'We invite all students and parents to participate in our Annual Sports Day. Various events will be conducted including running races, relay races, and field events.',
    author: 'Admin User',
    date: '2025-03-08',
    priority: 'high',
    targetAudience: 'all'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    description: 'Quarterly PTM scheduled for March 25th',
    content: 'Parents are requested to meet with their ward\'s class teacher to discuss academic progress.',
    author: 'Admin User',
    date: '2025-03-07',
    priority: 'medium',
    targetAudience: 'parents'
  },
  {
    id: 3,
    title: 'Exam Schedule Released',
    description: 'Final exams will be held from April 1st to April 15th',
    content: 'The final examination schedule has been released. Students are advised to start their preparations.',
    author: 'John Teacher',
    date: '2025-03-05',
    priority: 'high',
    targetAudience: 'students'
  }
]

export const mockFees = [
  {
    id: 1,
    studentId: 1,
    month: 'March 2025',
    feeType: 'Tuition',
    amount: 5000,
    dueDate: '2025-03-15',
    status: 'pending',
    description: 'Monthly tuition fee'
  },
  {
    id: 2,
    studentId: 1,
    month: 'February 2025',
    feeType: 'Tuition',
    amount: 5000,
    dueDate: '2025-02-15',
    status: 'paid',
    paidDate: '2025-02-14',
    description: 'Monthly tuition fee'
  },
  {
    id: 3,
    studentId: 2,
    month: 'March 2025',
    feeType: 'Tuition',
    amount: 5000,
    dueDate: '2025-03-15',
    status: 'paid',
    paidDate: '2025-03-10',
    description: 'Monthly tuition fee'
  }
]

export const mockHomework = [
  {
    id: 1,
    subjectId: 1,
    teacherId: 1,
    title: 'Chapter 5 - Quadratic Equations',
    description: 'Solve exercises 5.1 to 5.5 from textbook',
    dueDate: '2025-03-12',
    submissionDate: '2025-03-10',
    status: 'pending',
    class: '10-A'
  },
  {
    id: 2,
    subjectId: 2,
    teacherId: 1,
    title: 'Physics Lab Report',
    description: 'Complete the physics experiment report on laws of motion',
    dueDate: '2025-03-15',
    submissionDate: null,
    status: 'pending',
    class: '10-A'
  }
]

export const mockMessages = [
  {
    id: 1,
    senderId: 1,
    recipientId: 2,
    content: 'Hi John, how are you doing?',
    timestamp: new Date(Date.now() - 3600000),
    read: true
  },
  {
    id: 2,
    senderId: 2,
    recipientId: 1,
    content: 'I\'m doing great! How about you?',
    timestamp: new Date(Date.now() - 3000000),
    read: true
  },
  {
    id: 3,
    senderId: 1,
    recipientId: 2,
    content: 'Just finished my homework. Excited for the project!',
    timestamp: new Date(Date.now() - 1800000),
    read: false
  }
]

export const mockEvents = [
  {
    id: 1,
    title: 'Class Lecture',
    start: new Date(Date.now() + 86400000),
    end: new Date(Date.now() + 90000000),
    description: 'Mathematics class',
    location: 'Room 101'
  },
  {
    id: 2,
    title: 'Sports Practice',
    start: new Date(Date.now() + 172800000),
    end: new Date(Date.now() + 176400000),
    description: 'Sports training session',
    location: 'Sports Ground'
  }
]

export const mockNotifications = [
  {
    id: 1,
    title: 'New Announcement',
    message: 'Annual Sports Day is scheduled for March 20th',
    type: 'announcement',
    read: false,
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    title: 'Homework Due',
    message: 'Physics assignment due on March 12th',
    type: 'homework',
    read: false,
    timestamp: new Date(Date.now() - 7200000)
  },
  {
    id: 3,
    title: 'Grade Posted',
    message: 'Your midterm grades have been posted',
    type: 'grades',
    read: true,
    timestamp: new Date(Date.now() - 86400000)
  }
]

export const mockLibrary = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Fiction',
    totalCopies: 5,
    availableCopies: 2,
    location: 'Shelf A1'
  },
  {
    id: 2,
    title: 'Physics Principles',
    author: 'Dr. James Smith',
    isbn: '978-0134689456',
    category: 'Science',
    totalCopies: 8,
    availableCopies: 3,
    location: 'Shelf B3'
  }
]

export const mockTransport = [
  {
    id: 1,
    vehicleNumber: 'KL-06-AB-1234',
    driverName: 'Raj Kumar',
    capacity: 50,
    status: 'active',
    route: 'Route A - Downtown to School'
  },
  {
    id: 2,
    vehicleNumber: 'KL-06-CD-5678',
    driverName: 'Amit Patel',
    capacity: 45,
    status: 'active',
    route: 'Route B - Suburbs to School'
  }
]

export const mockHostel = [
  {
    id: 1,
    buildingName: 'Hostel A',
    type: 'Boys',
    capacity: 100,
    currentStrength: 85,
    warden: 'Mr. Sharma'
  },
  {
    id: 2,
    buildingName: 'Hostel B',
    type: 'Girls',
    capacity: 80,
    currentStrength: 70,
    warden: 'Mrs. Desai'
  }
]

export const mockTimetable = [
  { day: 'Monday', subject: 'Mathematics', time: '09:00-10:00', room: '101' },
  { day: 'Monday', subject: 'English', time: '10:00-11:00', room: '102' },
  { day: 'Monday', subject: 'Physics', time: '11:00-12:00', room: '103' },
  { day: 'Tuesday', subject: 'Chemistry', time: '09:00-10:00', room: '104' },
  { day: 'Tuesday', subject: 'History', time: '10:00-11:00', room: '105' }
]

export const mockLeaveRequests = [
  {
    id: 1,
    userId: 1,
    userName: 'Jane Student',
    reason: 'Medical appointment',
    startDate: '2025-03-12',
    endDate: '2025-03-12',
    status: 'pending',
    type: 'student'
  },
  {
    id: 2,
    userId: 2,
    userName: 'John Teacher',
    reason: 'Personal emergency',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    status: 'approved',
    type: 'teacher'
  }
]

export default {
  mockStudents,
  mockTeachers,
  mockClasses,
  mockAttendance,
  mockGrades,
  mockAnnouncements,
  mockFees,
  mockHomework,
  mockMessages,
  mockEvents,
  mockNotifications,
  mockLibrary,
  mockTransport,
  mockHostel,
  mockTimetable,
  mockLeaveRequests
}
