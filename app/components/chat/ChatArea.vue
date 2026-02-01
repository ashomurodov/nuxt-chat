<template>
  <main class="flex-1 flex flex-col">
    <ChatEmptyState v-if="!room" />
    <template v-else>
      <ChatHeader
        :room="room"
        :current-user-id="currentUserId"
        @close="$emit('close')"
      />
      <ChatMessages
        ref="messagesRef"
        :messages="messages"
        :current-user-id="currentUserId"
        :is-loading="isLoading"
      />
      <ChatMessageInput
        :is-sending="isSending"
        @send="handleSend"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import type { Room, Message } from '~/types/chat'

interface Props {
  room: Room | null
  messages: Message[]
  isLoading: boolean
  isSending: boolean
  currentUserId: string
}

defineProps<Props>()

const emit = defineEmits<{
  'send-message': [content: string]
  close: []
}>()

const messagesRef = ref<{ scrollToBottom: () => void } | null>(null)

function handleSend(content: string) {
  emit('send-message', content)
}

function scrollToBottom() {
  messagesRef.value?.scrollToBottom()
}

defineExpose({ scrollToBottom })
</script>
