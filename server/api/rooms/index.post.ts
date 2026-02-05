import { prisma } from '../../utils/db'
import { requireAuth } from '../../utils/auth'
import { sendToUser } from '../../utils/pusher'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  const { name, memberIds, isGroup } = body

  if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'At least one member is required',
    })
  }

  // For direct messages (not group), check if room already exists
  if (!isGroup && memberIds.length === 1) {
    const existingRoom = await prisma.chatRoom.findFirst({
      where: {
        isGroup: false,
        AND: [
          { members: { some: { userId: user.id } } },
          { members: { some: { userId: memberIds[0] } } },
        ],
      },
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
      },
    })

    if (existingRoom) {
      return { room: existingRoom }
    }
  }

  // Create new chat room
  const room = await prisma.chatRoom.create({
    data: {
      name: isGroup ? name : null,
      isGroup: isGroup || false,
      members: {
        create: [
          { userId: user.id },
          ...memberIds.map((id: string) => ({ userId: id })),
        ],
      },
    },
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
    },
  })

  // Notify all other members about the new room via Pusher
  try {
    for (const memberId of memberIds) {
      await sendToUser(memberId, 'new-room', room)
    }
  } catch (error) {
    // Don't fail if Pusher fails, room is still created
    console.error('Pusher error:', error)
  }

  return { room }
})
