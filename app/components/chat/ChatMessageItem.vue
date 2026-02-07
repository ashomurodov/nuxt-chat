<template>
  <div :class="['flex gap-3 min-w-0', isOwnMessage ? 'justify-end' : '']">
    <ChatUserAvatar
      v-if="!isOwnMessage"
      :name="message.sender?.username || 'Unknown'"
      size="sm"
    />
    <div
      :class="[
        'max-w-md px-4 py-2 rounded-2xl overflow-hidden',
        isOwnMessage
          ? 'bg-gray-900 text-white rounded-tr-md'
          : 'bg-gray-100 text-gray-900 rounded-tl-md'
      ]"
    >
      <p v-if="isGroup && !isOwnMessage" class="text-xs font-medium text-gray-500 mb-1">
        {{ message.sender?.username || 'Unknown' }}
      </p>
      <p class="text-sm break-words whitespace-pre-wrap">{{ message.content }}</p>
      <p :class="['text-xs mt-1', isOwnMessage ? 'text-gray-400' : 'text-gray-500']">
        {{ formattedTime }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/chat'

interface Props {
  message: Message
  isOwnMessage: boolean
  isGroup?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isGroup: false,
})

const formattedTime = computed(() => {
  const date = new Date(props.message.createdAt)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})
</script>
