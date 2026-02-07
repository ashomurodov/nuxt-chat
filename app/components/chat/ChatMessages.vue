<template>
  <div ref="container" class="flex-1 overflow-y-auto p-4 space-y-4">
    <div v-if="isLoading" class="text-center text-gray-400">
      Loading messages...
    </div>
    <template v-else>
      <ChatMessageItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :is-own-message="message.senderId === currentUserId"
        :is-group="isGroup"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/chat'

interface Props {
  messages: Message[]
  currentUserId: string
  isLoading: boolean
  isGroup?: boolean
}

const props = defineProps<Props>()

const container = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  })
}

watch(() => props.messages.length, scrollToBottom)

defineExpose({ scrollToBottom })
</script>
