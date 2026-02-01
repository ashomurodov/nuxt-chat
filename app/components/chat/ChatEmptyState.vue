<template>
  <div class="flex-1 flex flex-col">
    <div v-if="showMenuButton" class="p-4 border-b border-gray-200">
      <button
        @click="$emit('open-sidebar')"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Open sidebar"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">Select a conversation</h3>
        <p class="text-gray-500">Choose from your existing conversations or start a new one</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showMenuButton?: boolean
}

defineProps<Props>()

defineEmits<{
  'open-sidebar': []
}>()
</script>
