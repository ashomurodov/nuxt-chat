import Pusher from 'pusher-js'
import type { Channel } from 'pusher-js'
import type { Message, Room } from '~/types/chat'

let pusher: Pusher | null = null
let userChannel: Channel | null = null
const roomChannels = new Map<string, Channel>()
const messageCallbacks = new Set<(message: Message) => void>()
const roomCallbacks = new Set<(room: Room) => void>()

export function usePusher() {
  const config = useRuntimeConfig()

  function initPusher(userId: string) {
    if (!config.public.pusherKey || !config.public.pusherCluster) {
      console.warn('Pusher not configured')
      return
    }

    if (pusher) return // Already initialized

    pusher = new Pusher(config.public.pusherKey as string, {
      cluster: config.public.pusherCluster as string,
      authEndpoint: '/api/pusher/auth',
    })

    // Subscribe to user's private channel for direct messages and new rooms
    userChannel = pusher.subscribe(`private-user-${userId}`)
    userChannel.bind('new-message', handleNewMessage)
    userChannel.bind('new-room', handleNewRoom)
  }

  function subscribeToRoom(roomId: string) {
    if (!pusher) return

    if (!roomChannels.has(roomId)) {
      const channel = pusher.subscribe(`private-room-${roomId}`)
      channel.bind('new-message', handleNewMessage)
      roomChannels.set(roomId, channel)
    }
  }

  function subscribeToAllRooms(rooms: Room[]) {
    if (!pusher) return

    rooms.forEach(room => {
      if (!roomChannels.has(room.id)) {
        const channel = pusher!.subscribe(`private-room-${room.id}`)
        channel.bind('new-message', handleNewMessage)
        roomChannels.set(room.id, channel)
      }
    })
  }

  function unsubscribeFromRoom(roomId: string) {
    const channel = roomChannels.get(roomId)
    if (channel) {
      channel.unbind_all()
      pusher?.unsubscribe(`private-room-${roomId}`)
      roomChannels.delete(roomId)
    }
  }

  function handleNewMessage(message: Message) {
    messageCallbacks.forEach(callback => callback(message))
  }

  function handleNewRoom(room: Room) {
    roomCallbacks.forEach(callback => callback(room))
  }

  function onNewMessage(callback: (message: Message) => void) {
    messageCallbacks.add(callback)
    return () => messageCallbacks.delete(callback)
  }

  function onNewRoom(callback: (room: Room) => void) {
    roomCallbacks.add(callback)
    return () => roomCallbacks.delete(callback)
  }

  function cleanupPusher(userId?: string) {
    if (userChannel && userId) {
      userChannel.unbind_all()
      pusher?.unsubscribe(`private-user-${userId}`)
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

    messageCallbacks.clear()
    roomCallbacks.clear()
  }

  return {
    initPusher,
    subscribeToRoom,
    subscribeToAllRooms,
    unsubscribeFromRoom,
    onNewMessage,
    onNewRoom,
    cleanupPusher,
  }
}
