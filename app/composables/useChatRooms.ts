import type { Room, Message, User } from '~/types/chat'

const rooms = ref<Room[]>([])
const selectedRoom = ref<Room | null>(null)
const isLoadingRooms = ref(true)
const searchQuery = ref('')

export function useChatRooms() {
  const router = useRouter()

  const filteredRooms = computed(() => {
    if (!searchQuery.value) return rooms.value
    return rooms.value.filter(room =>
      getRoomDisplayName(room).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  function getRoomDisplayName(room: Room, currentUserId?: string): string {
    if (room.isGroup && room.name) return room.name
    const otherMember = room.members.find(m => m.user.id !== currentUserId)
    return otherMember?.user.username || 'Unknown'
  }

  async function loadRooms() {
    isLoadingRooms.value = true
    try {
      const { rooms: data } = await $fetch<{ rooms: Room[] }>('/api/rooms')
      rooms.value = data
    } catch (e) {
      console.error('Failed to load rooms:', e)
    } finally {
      isLoadingRooms.value = false
    }
  }

  function selectRoom(room: Room | null, updateUrl = true) {
    selectedRoom.value = room
    if (updateUrl) {
      if (room) {
        router.push({ path: '/chat', query: { roomId: room.id } })
      } else {
        router.push({ path: '/chat' })
      }
    }
  }

  function addRoom(room: Room) {
    const exists = rooms.value.some(r => r.id === room.id)
    if (exists) return
    rooms.value.unshift(room)
  }

  function updateRoomLastMessage(roomId: string, message: Message) {
    const roomIndex = rooms.value.findIndex(r => r.id === roomId)
    if (roomIndex !== -1) {
      const existingRoom = rooms.value[roomIndex]
      if (existingRoom) {
        existingRoom.lastMessage = message
        // Move room to top of list
        rooms.value.splice(roomIndex, 1)
        rooms.value.unshift(existingRoom)
      }
    }
  }

  function incrementUnreadCount(roomId: string) {
    const room = rooms.value.find(r => r.id === roomId)
    if (room) {
      room.unreadCount = (room.unreadCount || 0) + 1
    }
  }

  async function markRoomAsRead(roomId: string) {
    const room = rooms.value.find(r => r.id === roomId)
    if (room) {
      room.unreadCount = 0
    }
    try {
      await $fetch(`/api/rooms/${roomId}/read`, { method: 'POST' })
    } catch (e) {
      console.error('Failed to mark room as read:', e)
    }
  }

  function findRoomById(roomId: string): Room | undefined {
    return rooms.value.find(r => r.id === roomId)
  }

  return {
    rooms,
    selectedRoom,
    isLoadingRooms,
    searchQuery,
    filteredRooms,
    getRoomDisplayName,
    loadRooms,
    selectRoom,
    addRoom,
    updateRoomLastMessage,
    incrementUnreadCount,
    markRoomAsRead,
    findRoomById,
  }
}
