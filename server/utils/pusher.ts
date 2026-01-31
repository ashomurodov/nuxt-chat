import Pusher from 'pusher'

let pusherInstance: Pusher | null = null

export function getPusher(): Pusher {
  if (!pusherInstance) {
    pusherInstance = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    })
  }
  return pusherInstance
}

// Send message to a channel
export async function sendToChannel(channel: string, event: string, data: unknown): Promise<void> {
  const pusher = getPusher()
  await pusher.trigger(channel, event, data)
}

// Send message to a specific user
export async function sendToUser(userId: string, event: string, data: unknown): Promise<void> {
  await sendToChannel(`private-user-${userId}`, event, data)
}

// Send message to a chat room
export async function sendToRoom(roomId: string, event: string, data: unknown): Promise<void> {
  await sendToChannel(`private-room-${roomId}`, event, data)
}
