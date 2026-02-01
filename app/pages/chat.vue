<template>
  <div class="h-screen flex bg-white">
    <!-- Sidebar -->
    <aside class="w-80 border-r border-gray-200 flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-900">Chats</span>
          </div>
          <button
            @click="showNewChat = true"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="New chat"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <!-- Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search conversations..."
          class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-gray-400 outline-none"
        />
      </div>

      <!-- Conversations List -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="isLoadingRooms" class="p-4 text-center text-gray-400">
          Loading...
        </div>
        <div v-else-if="filteredRooms.length === 0" class="p-4 text-center text-gray-400">
          No conversations yet
        </div>
        <div v-else>
          <button
            v-for="room in filteredRooms"
            :key="room.id"
            @click="selectRoom(room)"
            :class="[
              'w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left',
              selectedRoom?.id === room.id ? 'bg-gray-100' : ''
            ]"
          >
            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-medium text-gray-600">
                {{ getRoomDisplayName(room).charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 truncate">{{ getRoomDisplayName(room) }}</p>
              <p class="text-sm text-gray-500 truncate">
                {{ room.lastMessage?.content || 'No messages yet' }}
              </p>
            </div>
          </button>
        </div>
      </div>

      <!-- User Info -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-white">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 truncate">{{ user?.username }}</p>
            <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
          </div>
          <button
            @click="logout"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Chat Area -->
    <main class="flex-1 flex flex-col">
      <!-- No chat selected -->
      <div v-if="!selectedRoom" class="flex-1 flex items-center justify-center">
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

      <!-- Chat Messages -->
      <template v-else>
        <!-- Chat Header -->
        <div class="p-4 border-b border-gray-200 flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-gray-600">
              {{ getRoomDisplayName(selectedRoom).charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1">
            <h2 class="font-medium text-gray-900">{{ getRoomDisplayName(selectedRoom) }}</h2>
            <p class="text-xs text-gray-500">{{ selectedRoom.isGroup ? 'Group chat' : 'Direct message' }}</p>
          </div>
          <button
            @click="selectRoom(null)"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close chat"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-if="isLoadingMessages" class="text-center text-gray-400">
            Loading messages...
          </div>
          <template v-else>
            <div
              v-for="message in messages"
              :key="message.id"
              :class="[
                'flex gap-3',
                message.senderId === user?.id ? 'justify-end' : ''
              ]"
            >
              <div
                v-if="message.senderId !== user?.id"
                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-xs font-medium text-gray-600">
                  {{ message.sender?.username?.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div
                :class="[
                  'max-w-md px-4 py-2 rounded-2xl',
                  message.senderId === user?.id
                    ? 'bg-gray-900 text-white rounded-tr-md'
                    : 'bg-gray-100 text-gray-900 rounded-tl-md'
                ]"
              >
                <p class="text-sm">{{ message.content }}</p>
                <p :class="[
                  'text-xs mt-1',
                  message.senderId === user?.id ? 'text-gray-400' : 'text-gray-500'
                ]">
                  {{ formatTime(message.createdAt) }}
                </p>
              </div>
            </div>
          </template>
        </div>

        <!-- Message Input -->
        <div class="p-4 border-t border-gray-200">
          <form @submit.prevent="sendMessage" class="flex gap-3">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim() || isSending"
              class="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </template>
    </main>

    <!-- New Chat Modal -->
    <div v-if="showNewChat" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl w-full max-w-md p-6 m-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">New Conversation</h3>
          <button @click="showNewChat = false" class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Search Users -->
        <input
          v-model="userSearch"
          type="text"
          placeholder="Search users..."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4"
          @input="searchUsers"
        />

        <!-- Users List -->
        <div class="max-h-64 overflow-y-auto space-y-2">
          <div v-if="isSearchingUsers" class="text-center py-4 text-gray-400">
            Searching...
          </div>
          <button
            v-else
            v-for="u in searchedUsers"
            :key="u.id"
            @click="startChat(u.id)"
            class="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-gray-600">
                {{ u.username.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="text-left">
              <p class="font-medium text-gray-900">{{ u.username }}</p>
              <p class="text-sm text-gray-500">{{ u.email }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pusher from 'pusher-js'
import type { Channel } from 'pusher-js'

interface User {
  id: string
  username: string
  email: string
  avatar: string | null
}

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
  chatRoomId?: string
  sender?: { username: string }
}

interface Room {
  id: string
  name: string | null
  isGroup: boolean
  members: { user: User }[]
  lastMessage?: Message
}

const { user, logout, fetchUser, isAuthenticated, isLoading: authLoading } = useAuth()
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

// Pusher instance and channels
let pusher: Pusher | null = null
let userChannel: Channel | null = null
const roomChannels = new Map<string, Channel>()

// State
const rooms = ref<Room[]>([])
const selectedRoom = ref<Room | null>(null)
const messages = ref<Message[]>([])
const newMessage = ref('')
const searchQuery = ref('')
const showNewChat = ref(false)
const userSearch = ref('')
const searchedUsers = ref<User[]>([])

const isLoadingRooms = ref(true)
const isLoadingMessages = ref(false)
const isSending = ref(false)
const isSearchingUsers = ref(false)

const messagesContainer = ref<HTMLElement | null>(null)

// Computed
const filteredRooms = computed(() => {
  if (!searchQuery.value) return rooms.value
  return rooms.value.filter(room =>
    getRoomDisplayName(room).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
function getRoomDisplayName(room: Room): string {
  if (room.isGroup && room.name) return room.name
  const otherMember = room.members.find(m => m.user.id !== user.value?.id)
  return otherMember?.user.username || 'Unknown'
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

async function loadRooms() {
  try {
    const { rooms: data } = await $fetch<{ rooms: Room[] }>('/api/rooms')
    rooms.value = data
  } catch (e) {
    console.error('Failed to load rooms:', e)
  } finally {
    isLoadingRooms.value = false
  }
}

async function loadMessages() {
  if (!selectedRoom.value) return
  isLoadingMessages.value = messages.value.length === 0

  try {
    const { messages: data } = await $fetch<{ messages: Message[] }>('/api/messages', {
      query: { roomId: selectedRoom.value.id }
    })
    messages.value = data

    // Scroll to bottom
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  } catch (e) {
    console.error('Failed to load messages:', e)
  } finally {
    isLoadingMessages.value = false
  }
}

function selectRoom(room: Room | null) {
  selectedRoom.value = room
  messages.value = []

  if (room) {
    router.push({ path: '/chat', query: { roomId: room.id } })
    loadMessages()
    subscribeToRoom(room.id)
  } else {
    router.push({ path: '/chat' })
  }
}

async function sendMessage() {
  if (!newMessage.value.trim() || !selectedRoom.value) return

  isSending.value = true
  const content = newMessage.value
  newMessage.value = ''

  try {
    await $fetch('/api/messages', {
      method: 'POST',
      body: {
        content,
        chatRoomId: selectedRoom.value.id
      }
    })
    await loadMessages()
  } catch (e) {
    console.error('Failed to send message:', e)
    newMessage.value = content
  } finally {
    isSending.value = false
  }
}

async function searchUsers() {
  if (!userSearch.value) {
    searchedUsers.value = []
    return
  }

  isSearchingUsers.value = true
  try {
    const { users } = await $fetch<{ users: User[] }>('/api/users', {
      query: { search: userSearch.value }
    })
    searchedUsers.value = users
  } catch (e) {
    console.error('Failed to search users:', e)
  } finally {
    isSearchingUsers.value = false
  }
}

async function startChat(userId: string) {
  try {
    const { room } = await $fetch<{ room: Room }>('/api/rooms', {
      method: 'POST',
      body: { memberIds: [userId] }
    })
    rooms.value.unshift(room)
    selectRoom(room)
    showNewChat.value = false
    userSearch.value = ''
    searchedUsers.value = []
  } catch (e) {
    console.error('Failed to start chat:', e)
  }
}

// Pusher functions
function initPusher() {
  if (!config.public.pusherKey || !config.public.pusherCluster) {
    console.warn('Pusher not configured')
    return
  }

  pusher = new Pusher(config.public.pusherKey as string, {
    cluster: config.public.pusherCluster as string,
    authEndpoint: '/api/pusher/auth',
  })

  // Subscribe to user's private channel for direct messages
  if (user.value?.id) {
    userChannel = pusher.subscribe(`private-user-${user.value.id}`)
    userChannel.bind('new-message', handleNewMessage)
  }
}

function subscribeToRoom(roomId: string) {
  if (!pusher) return

  // Unsubscribe from previous room channels (keep only the selected one active for messages)
  // But we still want to receive notifications for all rooms for sidebar updates

  // Subscribe to the room channel if not already subscribed
  if (!roomChannels.has(roomId)) {
    const channel = pusher.subscribe(`private-room-${roomId}`)
    channel.bind('new-message', handleNewMessage)
    roomChannels.set(roomId, channel)
  }
}

function subscribeToAllRooms() {
  if (!pusher) return

  rooms.value.forEach(room => {
    if (!roomChannels.has(room.id)) {
      const channel = pusher!.subscribe(`private-room-${room.id}`)
      channel.bind('new-message', handleNewMessage)
      roomChannels.set(room.id, channel)
    }
  })
}

function handleNewMessage(message: Message) {
  // Update messages if this is for the currently selected room
  if (selectedRoom.value && message.chatRoomId === selectedRoom.value.id) {
    // Avoid duplicates
    if (!messages.value.find(m => m.id === message.id)) {
      messages.value.push(message)
      // Scroll to bottom
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
      })
    }
  }

  // Update sidebar's lastMessage for the relevant room
  const roomIndex = rooms.value.findIndex(r => r.id === message.chatRoomId)
  if (roomIndex !== -1) {
    rooms.value[roomIndex].lastMessage = message
    // Move room to top of list
    const [room] = rooms.value.splice(roomIndex, 1)
    rooms.value.unshift(room)
  }
}

function cleanupPusher() {
  if (userChannel) {
    userChannel.unbind_all()
    pusher?.unsubscribe(`private-user-${user.value?.id}`)
    userChannel = null
  }

  roomChannels.forEach((channel, roomId) => {
    channel.unbind_all()
    pusher?.unsubscribe(`private-room-${roomId}`)
  })
  roomChannels.clear()

  if (pusher) {
    pusher.disconnect()
    pusher = null
  }
}

// Lifecycle
onMounted(async () => {
  await fetchUser()
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  await loadRooms()

  // Initialize Pusher for real-time updates
  initPusher()
  subscribeToAllRooms()

  // Check URL for roomId and select that room
  const roomId = route.query.roomId as string
  if (roomId) {
    const room = rooms.value.find(r => r.id === roomId)
    if (room) {
      selectRoom(room)
    }
  }
})

onUnmounted(() => {
  cleanupPusher()
})
</script>
