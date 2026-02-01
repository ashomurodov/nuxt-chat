export interface User {
  id: string
  username: string
  email: string
  avatar: string | null
}

export interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
  chatRoomId?: string
  sender?: { username: string }
}

export interface Room {
  id: string
  name: string | null
  isGroup: boolean
  members: { user: User }[]
  lastMessage?: Message
}
