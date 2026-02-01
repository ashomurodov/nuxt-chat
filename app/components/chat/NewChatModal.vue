<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl w-full max-w-md p-6 m-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">New Conversation</h3>
        <button @click="handleClose" class="p-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ChatSearchInput
        v-model="userSearch"
        placeholder="Search users..."
        variant="modal"
        class="mb-4"
        @update:model-value="searchUsers"
      />

      <div class="max-h-64 overflow-y-auto space-y-2">
        <div v-if="isSearching" class="text-center py-4 text-gray-400">
          Searching...
        </div>
        <button
          v-else
          v-for="u in searchedUsers"
          :key="u.id"
          @click="handleStartChat(u.id)"
          class="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <ChatUserAvatar :name="u.username" />
          <div class="text-left">
            <p class="font-medium text-gray-900">{{ u.username }}</p>
            <p class="text-sm text-gray-500">{{ u.email }}</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
  'start-chat': [userId: string]
}>()

const { userSearch, searchedUsers, isSearching, searchUsers, clearSearch } = useUserSearch()

function handleClose() {
  clearSearch()
  emit('close')
}

function handleStartChat(userId: string) {
  emit('start-chat', userId)
  clearSearch()
}
</script>
