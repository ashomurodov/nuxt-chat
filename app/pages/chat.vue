<template>
  <div class="h-screen-dvh flex bg-white">
    <!-- Sidebar: full-screen on mobile, fixed width on desktop -->
    <ChatSidebar
      v-show="isSidebarOpen"
      class="absolute inset-0 z-10 md:relative md:inset-auto"
      :rooms="filteredRooms"
      :selected-room="selectedRoom"
      :is-loading="isLoadingRooms"
      :user="user"
      v-model:search-query="searchQuery"
      @select-room="handleSelectRoom"
      @new-chat="showNewChat = true"
      @close="isSidebarOpen = false"
      @logout="logout"
    />

    <!-- Chat Area: hidden on mobile when sidebar is open -->
    <ChatArea
      v-show="!isSidebarOpen || !isMobile"
      ref="chatAreaRef"
      :room="selectedRoom"
      :messages="messages"
      :is-loading="isLoadingMessages"
      :is-sending="isSending"
      :current-user-id="user?.id ?? ''"
      :is-sidebar-open="isSidebarOpen"
      @send-message="handleSendMessage"
      @close="handleSelectRoom(null)"
      @open-sidebar="handleOpenSidebar"
    />

    <ChatNewChatModal
      v-if="showNewChat"
      @close="showNewChat = false"
      @start-chat="handleStartChat"
    />
  </div>
</template>

<script setup lang="ts">
import type { Room, Message } from '~/types/chat'

const { user, logout, fetchUser, isAuthenticated } = useAuth()
const router = useRouter()
const route = useRoute()

const {
  selectedRoom,
  isLoadingRooms,
  searchQuery,
  filteredRooms,
  loadRooms,
  selectRoom,
  addRoom,
  updateRoomLastMessage,
  incrementUnreadCount,
  markRoomAsRead,
  findRoomById,
} = useChatRooms()

const {
  messages,
  isLoadingMessages,
  isSending,
  loadMessages,
  sendMessage,
  addMessage,
  clearMessages,
} = useChatMessages()

const {
  initPusher,
  subscribeToRoom,
  subscribeToAllRooms,
  onNewMessage,
  onNewRoom,
  cleanupPusher,
} = usePusher()

const { startChat } = useUserSearch()

const showNewChat = ref(false)
const isSidebarOpen = ref(true)
const chatAreaRef = ref<{ scrollToBottom: () => void } | null>(null)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

function handleSelectRoom(room: Room | null) {
  selectRoom(room)
  clearMessages()
  if (room) {
    loadMessages(room.id)
    subscribeToRoom(room.id)
    markRoomAsRead(room.id)
    // On mobile, hide sidebar when a room is selected
    if (isMobile.value) {
      isSidebarOpen.value = false
    }
  }
}

function handleOpenSidebar() {
  isSidebarOpen.value = true
}

async function handleSendMessage(content: string) {
  if (!selectedRoom.value) return
  const success = await sendMessage(content, selectedRoom.value.id)
  if (success) {
    chatAreaRef.value?.scrollToBottom()
  }
}

async function handleStartChat(userId: string) {
  const room = await startChat(userId)
  if (room) {
    addRoom(room)
    handleSelectRoom(room)
    showNewChat.value = false
  }
}

function handleNewMessage(message: Message) {
  // Update messages if this is for the currently selected room
  if (selectedRoom.value && message.chatRoomId === selectedRoom.value.id) {
    addMessage(message)
    nextTick(() => chatAreaRef.value?.scrollToBottom())
    // Mark as read since user is viewing this room
    if (message.senderId !== user.value?.id) {
      markRoomAsRead(selectedRoom.value.id)
    }
  } else if (message.chatRoomId && message.senderId !== user.value?.id) {
    // Increment unread count for rooms not currently selected (only for messages from others)
    incrementUnreadCount(message.chatRoomId)
  }

  // Update sidebar's lastMessage for the relevant room
  if (message.chatRoomId) {
    updateRoomLastMessage(message.chatRoomId, message)
  }
}

function handleNewRoom(room: Room) {
  // Add the new room to the list and subscribe to it
  addRoom(room)
  subscribeToRoom(room.id)
}

onMounted(async () => {
  // Setup mobile detection
  checkMobile()
  window.addEventListener('resize', checkMobile)

  await fetchUser()
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  await loadRooms()

  // Initialize Pusher for real-time updates
  if (user.value?.id) {
    initPusher(user.value.id)
    // Register callbacks BEFORE subscribing to avoid missing events
    onNewMessage(handleNewMessage)
    onNewRoom(handleNewRoom)
    subscribeToAllRooms(filteredRooms.value)
  }

  // Check URL for roomId and select that room
  const roomId = route.query.roomId as string
  if (roomId) {
    const room = findRoomById(roomId)
    if (room) {
      handleSelectRoom(room)
    }
  }
})

onUnmounted(() => {
  cleanupPusher(user.value?.id)
  window.removeEventListener('resize', checkMobile)
})
</script>
