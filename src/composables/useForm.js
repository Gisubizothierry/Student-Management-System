import { ref, computed } from 'vue'

export const useForm = (initialValues = {}, onSubmit) => {
  const values = ref({ ...initialValues })
  const errors = ref({})
  const touched = ref({})
  const isSubmitting = ref(false)

  const setFieldValue = (field, value) => {
    values.value[field] = value
  }

  const setFieldError = (field, error) => {
    errors.value[field] = error
  }

  const setFieldTouched = (field, isTouched = true) => {
    touched.value[field] = isTouched
  }

  const hasError = (field) => touched.value[field] && !!errors.value[field]

  const getFieldError = (field) => hasError(field) ? errors.value[field] : ''

  const resetForm = () => {
    values.value = { ...initialValues }
    errors.value = {}
    touched.value = {}
    isSubmitting.value = false
  }

  const validateField = (field, value, rules) => {
    let error = ''

    if (rules) {
      // Required validation
      if (rules.required && (!value || value.trim() === '')) {
        error = `${rules.label || field} is required`
      }
      // Email validation
      else if (rules.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address'
        }
      }
      // Min length validation
      else if (rules.minLength && value && value.length < rules.minLength) {
        error = `${rules.label || field} must be at least ${rules.minLength} characters`
      }
      // Max length validation
      else if (rules.maxLength && value && value.length > rules.maxLength) {
        error = `${rules.label || field} cannot exceed ${rules.maxLength} characters`
      }
      // Pattern validation
      else if (rules.pattern && value && !rules.pattern.test(value)) {
        error = rules.patternMessage || 'Invalid format'
      }
      // Custom validation
      else if (rules.validate && value) {
        const customError = rules.validate(value)
        if (customError) error = customError
      }
    }

    setFieldError(field, error)
    return !error
  }

  const validateForm = (validationRules) => {
    let isValid = true
    const newErrors = {}

    for (const [field, rules] of Object.entries(validationRules)) {
      if (!validateField(field, values.value[field], rules)) {
        isValid = false
        newErrors[field] = errors.value[field]
      }
    }

    errors.value = newErrors
    return isValid
  }

  const handleSubmit = async (validationRules) => {
    return async (e) => {
      if (e) e.preventDefault()
      
      // Mark all fields as touched
      Object.keys(values.value).forEach(field => {
        setFieldTouched(field, true)
      })

      if (validationRules && !validateForm(validationRules)) {
        return
      }

      isSubmitting.value = true
      try {
        await onSubmit?.(values.value)
      } finally {
        isSubmitting.value = false
      }
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    hasError,
    getFieldError,
    resetForm,
    validateField,
    validateForm,
    handleSubmit
  }
}
