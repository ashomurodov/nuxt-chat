<template>
  <div class="flex-1 overflow-y-auto">
    <div v-if="isLoading" class="p-4 text-center text-gray-400">
      Loading...
    </div>
    <div v-else-if="rooms.length === 0" class="p-4 text-center text-gray-400">
      No conversations yet
    </div>
    <div v-else>
      <ChatRoomItem
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        :is-selected="selectedRoomId === room.id"
        :current-user-id="currentUserId"
        @click="$emit('select', room)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types/chat'

interface Props {
  rooms: Room[]
  selectedRoomId: string | null
  isLoading: boolean
  currentUserId: string
}

defineProps<Props>()

defineEmits<{
  select: [room: Room]
}>()
</script>
