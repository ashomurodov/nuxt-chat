<template>
  <div class="h-screen flex bg-white">
    <ChatSidebar
      :rooms="filteredRooms"
      :selected-room="selectedRoom"
      :is-loading="isLoadingRooms"
      :user="user"
      v-model:search-query="searchQuery"
      @select-room="handleSelectRoom"
      @new-chat="showNewChat = true"
      @logout="logout"
    />

    <ChatArea
      ref="chatAreaRef"
      :room="selectedRoom"
      :messages="messages"
      :is-loading="isLoadingMessages"
      :is-sending="isSending"
      :current-user-id="user?.id ?? ''"
      @send-message="handleSendMessage"
      @close="handleSelectRoom(null)"
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
  cleanupPusher,
} = usePusher()

const { startChat } = useUserSearch()

const showNewChat = ref(false)
const chatAreaRef = ref<{ scrollToBottom: () => void } | null>(null)

function handleSelectRoom(room: Room | null) {
  selectRoom(room)
  clearMessages()
  if (room) {
    loadMessages(room.id)
    subscribeToRoom(room.id)
  }
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
  }

  // Update sidebar's lastMessage for the relevant room
  if (message.chatRoomId) {
    updateRoomLastMessage(message.chatRoomId, message)
  }
}

onMounted(async () => {
  await fetchUser()
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  await loadRooms()

  // Initialize Pusher for real-time updates
  if (user.value?.id) {
    initPusher(user.value.id)
    subscribeToAllRooms(filteredRooms.value)
    onNewMessage(handleNewMessage)
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
})
</script>
