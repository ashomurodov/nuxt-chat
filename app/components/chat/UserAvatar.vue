<template>
  <div
    :class="[
      'rounded-full flex items-center justify-center flex-shrink-0',
      sizeClasses,
      variantClasses
    ]"
  >
    <span :class="['font-medium', textSizeClass]">
      {{ initial }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'light',
})

const initial = computed(() => props.name?.charAt(0).toUpperCase() || '?')

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-8'
    case 'lg': return 'w-12 h-12'
    default: return 'w-10 h-10'
  }
})

const textSizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-xs'
    case 'lg': return 'text-base'
    default: return 'text-sm'
  }
})

const variantClasses = computed(() => {
  return props.variant === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-200 text-gray-600'
})
</script>
