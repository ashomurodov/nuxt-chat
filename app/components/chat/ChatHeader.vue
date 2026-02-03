<template>
  <div class="p-4 border-b border-gray-200 flex items-center gap-3">
    <!-- Mobile: Back button (always visible on mobile) -->
    <button
      @click="$emit('open-sidebar')"
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
      title="Back to chats"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <!-- Desktop: Menu button (only when sidebar is closed) -->
    <button
      v-if="showMenuButton"
      @click="$emit('open-sidebar')"
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block"
      title="Open sidebar"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <ChatUserAvatar :name="displayName" />
    <div class="flex-1">
      <h2 class="font-medium text-gray-900">{{ displayName }}</h2>
      <p class="text-xs text-gray-500">{{ room.isGroup ? 'Group chat' : 'Direct message' }}</p>
    </div>
    <!-- Desktop only: Close button -->
    <button
      @click="$emit('close')"
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block"
      title="Close chat"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types/chat'

interface Props {
  room: Room
  currentUserId: string
  showMenuButton?: boolean
}

const props = defineProps<Props>()

defineEmits<{
  close: []
  'open-sidebar': []
}>()

const displayName = computed(() => {
  if (props.room.isGroup && props.room.name) return props.room.name
  const otherMember = props.room.members.find(m => m.user.id !== props.currentUserId)
  return otherMember?.user.username || 'Unknown'
})
</script>
