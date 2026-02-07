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

      <!-- Mode toggle -->
      <div class="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
        <button
          @click="switchMode('dm')"
          :class="[
            'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors',
            mode === 'dm'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          Direct Message
        </button>
        <button
          @click="switchMode('group')"
          :class="[
            'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors',
            mode === 'group'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          Group Chat
        </button>
      </div>

      <!-- Group name input -->
      <input
        v-if="mode === 'group'"
        v-model="groupName"
        type="text"
        placeholder="Group name..."
        class="w-full px-4 py-3 rounded-xl border border-gray-200 mb-3 outline-none focus:border-gray-400 transition-colors"
      />

      <!-- Selected users chips -->
      <div v-if="mode === 'group' && selectedUsers.length > 0" class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="u in selectedUsers"
          :key="u.id"
          class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
        >
          {{ u.username }}
          <button
            @click="removeUser(u.id)"
            class="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
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
          @click="handleUserClick(u)"
          class="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <ChatUserAvatar :name="u.username" />
          <div class="text-left flex-1">
            <p class="font-medium text-gray-900">{{ u.username }}</p>
            <p class="text-sm text-gray-500">{{ u.email }}</p>
          </div>
          <div v-if="mode === 'group' && isUserSelected(u.id)" class="text-gray-900">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </button>
      </div>

      <!-- Create Group button -->
      <button
        v-if="mode === 'group'"
        @click="handleCreateGroup"
        :disabled="!canCreateGroup"
        :class="[
          'w-full mt-4 py-3 rounded-xl font-medium transition-colors',
          canCreateGroup
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        ]"
      >
        Create Group ({{ selectedUsers.length }} selected)
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/chat'

const emit = defineEmits<{
  close: []
  'start-chat': [userId: string]
  'create-group': [memberIds: string[], groupName: string]
}>()

const { userSearch, searchedUsers, isSearching, searchUsers, clearSearch } = useUserSearch()

const mode = ref<'dm' | 'group'>('dm')
const selectedUsers = ref<User[]>([])
const groupName = ref('')

function switchMode(newMode: 'dm' | 'group') {
  mode.value = newMode
  selectedUsers.value = []
  groupName.value = ''
  clearSearch()
}

function handleUserClick(user: User) {
  if (mode.value === 'dm') {
    handleStartChat(user.id)
  } else {
    toggleUserSelection(user)
  }
}

function toggleUserSelection(user: User) {
  const index = selectedUsers.value.findIndex(u => u.id === user.id)
  if (index >= 0) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(user)
  }
}

function removeUser(userId: string) {
  selectedUsers.value = selectedUsers.value.filter(u => u.id !== userId)
}

function isUserSelected(userId: string): boolean {
  return selectedUsers.value.some(u => u.id === userId)
}

const canCreateGroup = computed(() => {
  return selectedUsers.value.length >= 2 && groupName.value.trim().length > 0
})

function handleCreateGroup() {
  if (!canCreateGroup.value) return
  const memberIds = selectedUsers.value.map(u => u.id)
  emit('create-group', memberIds, groupName.value.trim())
  selectedUsers.value = []
  groupName.value = ''
  clearSearch()
}

function handleClose() {
  clearSearch()
  selectedUsers.value = []
  groupName.value = ''
  mode.value = 'dm'
  emit('close')
}

function handleStartChat(userId: string) {
  emit('start-chat', userId)
  clearSearch()
}
</script>
