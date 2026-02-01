<template>
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <span class="font-semibold text-gray-900">Chats</span>
    </div>
    <div class="flex items-center gap-1">
      <button
        @click="$emit('new-chat')"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="New chat"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        @click="$emit('close')"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Close sidebar"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'new-chat': []
  'close': []
}>()
</script>
