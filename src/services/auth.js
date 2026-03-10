// Enhanced Mock authentication service with proper error handling and validation

const mockUsers = {
  'admin@school.com': {
    id: 1,
    name: 'Admin User',
    email: 'admin@school.com',
    role: 'admin',
    phone: '+1-555-0101',
    address: '123 School Road',
    bio: 'School Administrator',
    photo: null,
    token: 'mock-token-admin',
    createdAt: new Date('2024-01-15')
  },
  'teacher@school.com': {
    id: 2,
    name: 'John Teacher',
    email: 'teacher@school.com',
    role: 'teacher',
    phone: '+1-555-0102',
    address: '456 Teacher Lane',
    bio: 'Mathematics & Science',
    photo: null,
    token: 'mock-token-teacher',
    createdAt: new Date('2024-02-10'),
    department: 'STEM',
    subjects: ['Mathematics', 'Physics']
  },
  'student@school.com': {
    id: 3,
    name: 'Jane Student',
    email: 'student@school.com',
    role: 'student',
    phone: '+1-555-0103',
    address: '789 Student Ave',
    bio: 'Class 10-A Student',
    photo: null,
    token: 'mock-token-student',
    createdAt: new Date('2024-03-05'),
    class: '10-A',
    rollNumber: 'STU001'
  },
  'parent@school.com': {
    id: 4,
    name: 'Parent User',
    email: 'parent@school.com',
    role: 'parent',
    phone: '+1-555-0104',
    address: '789 Parent Street',
    bio: 'Parent/Guardian',
    photo: null,
    token: 'mock-token-parent',
    createdAt: new Date('2024-01-20'),
    children: [3]
  }
}

// Validation utilities
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password) => {
  return password && password.length >= 6
}

export const login = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Validation
  if (!email || !password) {
    return { 
      success: false, 
      message: 'Email and password are required',
      code: 'MISSING_FIELDS'
    }
  }

  if (!validateEmail(email)) {
    return { 
      success: false, 
      message: 'Please enter a valid email address',
      code: 'INVALID_EMAIL'
    }
  }

  const user = mockUsers[email]
  if (user && password === 'password') {
    const { token, ...userWithoutToken } = user
    return { 
      success: true, 
      user: userWithoutToken, 
      token,
      message: 'Login successful'
    }
  }

  // Generic error message for security
  return { 
    success: false, 
    message: 'Invalid email or password',
    code: 'INVALID_CREDENTIALS'
  }
}

export const register = async (userData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Validation
  if (!userData.email || !userData.password || !userData.fullName) {
    return { 
      success: false, 
      message: 'All fields are required',
      code: 'MISSING_FIELDS'
    }
  }

  if (!validateEmail(userData.email)) {
    return { 
      success: false, 
      message: 'Please enter a valid email address',
      code: 'INVALID_EMAIL'
    }
  }

  if (!validatePassword(userData.password)) {
    return { 
      success: false, 
      message: 'Password must be at least 6 characters',
      code: 'WEAK_PASSWORD'
    }
  }

  if (mockUsers[userData.email]) {
    return { 
      success: false, 
      message: 'Email already registered',
      code: 'EMAIL_EXISTS'
    }
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name: userData.fullName,
    email: userData.email,
    role: userData.role || 'student',
    phone: userData.phone || '',
    address: userData.address || '',
    bio: '',
    photo: null,
    token: `mock-token-${Date.now()}`,
    createdAt: new Date(),
    ...(userData.role === 'student' && { class: '', rollNumber: '' })
  }

  mockUsers[userData.email] = newUser

  const { token, ...userWithoutToken } = newUser
  return {
    success: true,
    user: userWithoutToken,
    token,
    message: 'Registration successful. Please log in.'
  }
}

export const updateProfile = async (userId, profileData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600))

  if (!userId) {
    return { 
      success: false, 
      message: 'User ID is required',
      code: 'MISSING_USER_ID'
    }
  }

  // Find user by email in mock users (simplified lookup)
  const userEmail = Object.keys(mockUsers).find(email => mockUsers[email].id === userId)
  if (!userEmail) {
    return { 
      success: false, 
      message: 'User not found',
      code: 'USER_NOT_FOUND'
    }
  }

  // Update user data
  const user = mockUsers[userEmail]
  Object.assign(user, profileData, { id: userId }) // Preserve ID

  const { token, ...userWithoutToken } = user
  return {
    success: true,
    user: userWithoutToken,
    message: 'Profile updated successfully'
  }
}

export const logout = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return { success: true, message: 'Logged out successfully' }
}