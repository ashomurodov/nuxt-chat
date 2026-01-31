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

  const rooms = memberships.map((m) => ({
    ...m.chatRoom,
    lastMessage: m.chatRoom.messages[0] || null,
  }))

  return { rooms }
})
