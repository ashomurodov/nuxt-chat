<template>
  <div class="p-4 border-t border-gray-200">
    <div class="flex items-center gap-3">
      <ChatUserAvatar :name="user.username" variant="dark" />
      <div class="flex-1 min-w-0">
        <p class="font-medium text-gray-900 truncate">{{ user.username }}</p>
        <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
      </div>
      <button
        @click="$emit('logout')"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Logout"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/chat'

interface Props {
  user: User
}

defineProps<Props>()

defineEmits<{
  logout: []
}>()
</script>
