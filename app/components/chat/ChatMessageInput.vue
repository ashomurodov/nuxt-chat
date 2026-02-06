<template>
  <div class="p-4 border-t border-gray-200">
    <div v-if="rateLimitError" class="mb-2 text-sm text-red-500 text-center">
      {{ rateLimitError }}
      <span v-if="rateLimitCooldown > 0"> ({{ rateLimitCooldown }}s)</span>
    </div>
    <form @submit.prevent="handleSubmit" class="flex gap-3 items-end">
      <div class="flex-1 relative">
        <input
          v-model="message"
          type="text"
          :maxlength="maxLength"
          placeholder="Type a message..."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none"
          :disabled="disabled || rateLimitCooldown > 0"
        />
        <span
          v-if="message.length > maxLength * 0.8"
          :class="['absolute right-3 top-1/2 -translate-y-1/2 text-xs', message.length >= maxLength ? 'text-red-500' : 'text-gray-400']"
        >
          {{ message.length }}/{{ maxLength }}
        </span>
      </div>
      <button
        type="submit"
        :disabled="!message.trim() || isSending || disabled || rateLimitCooldown > 0"
        class="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { MAX_MESSAGE_LENGTH } from '~/composables/useChatMessages'

interface Props {
  disabled?: boolean
  isSending?: boolean
  rateLimitError?: string
  rateLimitCooldown?: number
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  isSending: false,
  rateLimitError: '',
  rateLimitCooldown: 0,
})

const emit = defineEmits<{
  send: [content: string]
}>()

const message = ref('')
const maxLength = MAX_MESSAGE_LENGTH

function handleSubmit() {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>
