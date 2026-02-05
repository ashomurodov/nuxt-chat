<template>
  <button
    @click="$emit('click')"
    :class="[
      'w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left',
      isSelected ? 'bg-gray-100' : ''
    ]"
  >
    <ChatUserAvatar :name="displayName" />
    <div class="flex-1 min-w-0">
      <p class="font-medium text-gray-900 truncate">{{ displayName }}</p>
      <p class="text-sm text-gray-500 truncate">
        {{ room.lastMessage?.content || 'No messages yet' }}
      </p>
    </div>
    <div
      v-if="room.unreadCount && room.unreadCount > 0"
      class="flex-shrink-0 min-w-5 h-5 px-1.5 bg-gray-900 rounded-full flex items-center justify-center"
    >
      <span class="text-xs font-medium text-white">
        {{ room.unreadCount > 99 ? '99+' : room.unreadCount }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Room } from '~/types/chat'

interface Props {
  room: Room
  isSelected: boolean
  currentUserId: string
}

const props = defineProps<Props>()

defineEmits<{
  click: []
}>()

const displayName = computed(() => {
  if (props.room.isGroup && props.room.name) return props.room.name
  const otherMember = props.room.members.find(m => m.user.id !== props.currentUserId)
  return otherMember?.user.username || 'Unknown'
})
</script>
