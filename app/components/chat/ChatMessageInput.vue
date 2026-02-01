<template>
  <div class="p-4 border-t border-gray-200">
    <form @submit.prevent="handleSubmit" class="flex gap-3">
      <input
        v-model="message"
        type="text"
        placeholder="Type a message..."
        class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none"
        :disabled="disabled"
      />
      <button
        type="submit"
        :disabled="!message.trim() || isSending || disabled"
        class="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean
  isSending?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  isSending: false,
})

const emit = defineEmits<{
  send: [content: string]
}>()

const message = ref('')

function handleSubmit() {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>
