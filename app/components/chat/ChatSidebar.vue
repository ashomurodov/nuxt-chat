<template>
  <aside class="w-80 border-r border-gray-200 flex flex-col">
    <div class="p-4 border-b border-gray-200">
      <ChatSidebarHeader @new-chat="$emit('new-chat')" @close="$emit('close')" />
      <ChatSearchInput
        v-model="searchQuery"
        placeholder="Search conversations..."
      />
    </div>

    <ChatRoomList
      :rooms="rooms"
      :selected-room-id="selectedRoom?.id ?? null"
      :is-loading="isLoading"
      :current-user-id="user?.id ?? ''"
      @select="$emit('select-room', $event)"
    />

    <ChatUserInfo
      v-if="user"
      :user="user"
      @logout="$emit('logout')"
    />
  </aside>
</template>

<script setup lang="ts">
import type { Room, User } from '~/types/chat'

interface Props {
  rooms: Room[]
  selectedRoom: Room | null
  isLoading: boolean
  user: User | null
}

defineProps<Props>()

const searchQuery = defineModel<string>('searchQuery', { default: '' })

defineEmits<{
  'select-room': [room: Room]
  'new-chat': []
  'close': []
  logout: []
}>()
</script>
