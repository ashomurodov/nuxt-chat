import { prisma } from '../../utils/db'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  // Get all chat rooms the user is a member of
  const memberships = await prisma.chatRoomMember.findMany({
    where: { userId: user.id },
    include: {
      chatRoom: {
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                },
              },
            },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      chatRoom: {
        updatedAt: 'desc',
      },
    },
  })

  // Calculate unread counts for each room
  const roomsWithUnread = await Promise.all(
    memberships.map(async (m) => {
      const unreadCount = await prisma.message.count({
        where: {
          chatRoomId: m.chatRoomId,
          createdAt: { gt: m.lastReadAt },
          senderId: { not: user.id },
        },
      })

      return {
        ...m.chatRoom,
        lastMessage: m.chatRoom.messages[0] || null,
        unreadCount,
      }
    })
  )

  return { rooms: roomsWithUnread }
})
