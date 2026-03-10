<template>
  <div v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }" class="space-y-2">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-semibold text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="[
        'input-modern w-full',
        'text-gray-900 placeholder-gray-400',
        error ? 'border-red-500 focus:border-red-500' : '',
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p
      v-if="error"
      v-motion
      :initial="{ opacity: 0, y: -5 }"
      :enter="{ opacity: 1, y: 0 }"
      class="text-sm text-red-600 font-medium"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  placeholder: String,
  error: String,
  required: Boolean,
  disabled: Boolean
})
defineEmits(['update:modelValue', 'blur'])
</script>