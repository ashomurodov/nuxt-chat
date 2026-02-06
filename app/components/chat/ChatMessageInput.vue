<template>
  <div class="p-4 border-t border-gray-200">
    <div v-if="rateLimitError" class="mb-2 text-sm text-red-500 text-center">
      {{ rateLimitError }}
      <span v-if="rateLimitCooldown > 0"> ({{ rateLimitCooldown }}s)</span>
    </div>
    <form @submit.prevent="handleSubmit" class="flex gap-3 items-end">
      <div class="flex-1 relative">
        <textarea
          ref="textareaRef"
          v-model="message"
          :maxlength="maxLength"
          placeholder="Type a message..."
          rows="1"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none resize-none overflow-hidden"
          :disabled="disabled || rateLimitCooldown > 0"
          @input="autoGrow"
          @keydown.enter.exact="handleEnter"
        />
        <span
          v-if="message.length > maxLength * 0.8"
          :class="['absolute right-3 bottom-3 text-xs', message.length >= maxLength ? 'text-red-500' : 'text-gray-400']"
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
const textareaRef = ref<HTMLTextAreaElement>()

function autoGrow() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 150) + 'px'
}

function resetHeight() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
}

function handleEnter(e: KeyboardEvent) {
  if (!e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

function handleSubmit() {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
    resetHeight()
  }
}
</script>
