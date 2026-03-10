import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin, updateProfile as apiUpdateProfile } from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)
  const role = ref(localStorage.getItem('role') || null)
  const selectedClass = ref(JSON.parse(localStorage.getItem('selectedClass')) || null)

  const login = async (email, password) => {
    const response = await apiLogin(email, password)
    if (response.success) {
      user.value = response.user
      token.value = response.token
      role.value = response.user.role
      localStorage.setItem('token', response.token)
      localStorage.setItem('role', response.user.role)
      localStorage.setItem('user', JSON.stringify(response.user))
    }
    return response
  }

  const setSelectedClass = (classData) => {
    selectedClass.value = classData
    localStorage.setItem('selectedClass', JSON.stringify(classData))
  }

  const updateProfile = async (profileData) => {
    // Call API to update profile
    const response = await apiUpdateProfile(user.value.id, profileData)
    if (response.success) {
      user.value = { ...user.value, ...response.user }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
    return response
  }

  const logout = () => {
    user.value = null
    token.value = null
    role.value = null
    selectedClass.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    localStorage.removeItem('selectedClass')
  }

  return { user, token, role, selectedClass, login, setSelectedClass, updateProfile, logout }
})