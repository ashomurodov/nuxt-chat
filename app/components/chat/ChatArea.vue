<template>
  <main class="flex-1 flex flex-col">
    <ChatEmptyState v-if="!room" :show-menu-button="!isSidebarOpen" @open-sidebar="$emit('open-sidebar')" />
    <template v-else>
      <ChatHeader
        :room="room"
        :current-user-id="currentUserId"
        :show-menu-button="!isSidebarOpen"
        @close="$emit('close')"
        @open-sidebar="$emit('open-sidebar')"
      />
      <ChatMessages
        ref="messagesRef"
        :messages="messages"
        :current-user-id="currentUserId"
        :is-loading="isLoading"
        :is-group="room?.isGroup ?? false"
      />
      <ChatMessageInput
        :is-sending="isSending"
        :rate-limit-error="rateLimitError"
        :rate-limit-cooldown="rateLimitCooldown"
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
  isSidebarOpen?: boolean
  rateLimitError?: string
  rateLimitCooldown?: number
}

defineProps<Props>()

const emit = defineEmits<{
  'send-message': [content: string]
  close: []
  'open-sidebar': []
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
