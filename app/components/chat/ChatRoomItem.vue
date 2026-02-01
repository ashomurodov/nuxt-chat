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
