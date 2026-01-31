import { prisma } from '../../utils/db'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const query = getQuery(event)
  const roomId = query.roomId as string | undefined
  const receiverId = query.receiverId as string | undefined
  const limit = parseInt(query.limit as string) || 50
  const cursor = query.cursor as string | undefined

  // Build where clause
  const where: Record<string, unknown> = {}

  if (roomId) {
    // Get messages from a chat room
    where.chatRoomId = roomId
  } else if (receiverId) {
    // Get direct messages between two users
    where.OR = [
      { senderId: user.id, receiverId },
      { senderId: receiverId, receiverId: user.id },
    ]
  } else {
    // Get all messages for the user
    where.OR = [
      { senderId: user.id },
      { receiverId: user.id },
    ]
  }

  const messages = await prisma.message.findMany({
    where,
    take: limit,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    orderBy: { createdAt: 'desc' },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  })

  return {
    messages: messages.reverse(),
    nextCursor: messages.length === limit ? messages[0]?.id : null,
  }
})
