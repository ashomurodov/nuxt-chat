import type { User, Room } from '~/types/chat'

export function useUserSearch() {
  const userSearch = ref('')
  const searchedUsers = ref<User[]>([])
  const isSearching = ref(false)

  async function searchUsers() {
    if (!userSearch.value) {
      searchedUsers.value = []
      return
    }

    isSearching.value = true
    try {
      const { users } = await $fetch<{ users: User[] }>('/api/users', {
        query: { search: userSearch.value }
      })
      searchedUsers.value = users
    } catch (e) {
      console.error('Failed to search users:', e)
    } finally {
      isSearching.value = false
    }
  }

  async function startChat(userId: string): Promise<Room | null> {
    try {
      const { room } = await $fetch<{ room: Room }>('/api/rooms', {
        method: 'POST',
        body: { memberIds: [userId] }
      })
      return room
    } catch (e) {
      console.error('Failed to start chat:', e)
      return null
    }
  }

  async function createGroupChat(memberIds: string[], name: string): Promise<Room | null> {
    try {
      const { room } = await $fetch<{ room: Room }>('/api/rooms', {
        method: 'POST',
        body: { memberIds, name, isGroup: true }
      })
      return room
    } catch (e) {
      console.error('Failed to create group chat:', e)
      return null
    }
  }

  function clearSearch() {
    userSearch.value = ''
    searchedUsers.value = []
  }

  return {
    userSearch,
    searchedUsers,
    isSearching,
    searchUsers,
    startChat,
    createGroupChat,
    clearSearch,
  }
}
