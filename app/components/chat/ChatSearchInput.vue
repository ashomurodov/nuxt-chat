<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    type="text"
    :placeholder="placeholder"
    :class="inputClasses"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  variant?: 'sidebar' | 'modal'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  variant: 'sidebar',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputClasses = computed(() => {
  const base = 'w-full outline-none'
  if (props.variant === 'modal') {
    return `${base} px-4 py-3 rounded-xl border border-gray-200`
  }
  return `${base} px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-gray-400`
})
</script>
