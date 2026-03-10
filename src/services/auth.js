// Mock authentication service – replace with real API calls later

export const login = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500))

  const mockUsers = {
    'admin@school.com': {
      id: 1,
      name: 'Admin User',
      email: 'admin@school.com',
      role: 'admin',
      photo: null,
      token: 'mock-token-admin'
    },
    'teacher@school.com': {
      id: 2,
      name: 'John Teacher',
      email: 'teacher@school.com',
      role: 'teacher',
      photo: null,
      token: 'mock-token-teacher'
    },
    'student@school.com': {
      id: 3,
      name: 'Jane Student',
      email: 'student@school.com',
      role: 'student',
      photo: null,
      token: 'mock-token-student'
    }
  }

  const user = mockUsers[email]
  if (user && password === 'password') {
    return { success: true, user, token: user.token }
  }
  return { success: false, message: 'Invalid credentials' }
}

export const register = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500))

  const existingEmails = ['admin@school.com', 'teacher@school.com', 'student@school.com']
  if (existingEmails.includes(userData.email)) {
    return { success: false, message: 'Email already registered' }
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name: userData.fullName,
    email: userData.email,
    role: userData.role,
    photo: null
  }

  return {
    success: true,
    user: newUser
  }
}

export const updateProfile = async (userId, profileData) => {
  await new Promise(resolve => setTimeout(resolve, 500))

  // Mock update – in a real app, you would send a request to your backend
  // Note: Photo upload is handled separately via a dedicated endpoint
  return {
    success: true,
    user: {
      id: userId,
      name: profileData.name,
      email: profileData.email, // email usually not changed, but kept for consistency
      photo: profileData.photo || null // photo may be updated via upload component
    }
  }
}