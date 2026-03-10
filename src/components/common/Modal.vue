<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop with blur -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm"
          @click="close"
        ></div>

        <!-- Modal content -->
        <div class="flex items-center justify-center min-h-screen px-4 py-8">
          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.95, y: 20 }"
            :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 300 } }"
            class="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 card-interactive"
          >
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
              <button
                @click="close"
                class="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <!-- Divider -->
            <div class="divider-gradient-brand"></div>

            <!-- Content -->
            <div class="my-4">
              <slot></slot>
            </div>

            <!-- Footer if provided -->
            <div v-if="$slots.footer" class="mt-6 divider-gradient-brand"></div>
            <div v-if="$slots.footer" class="mt-4">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'

defineProps({ 
  modelValue: Boolean, 
  title: String 
})

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
</script>