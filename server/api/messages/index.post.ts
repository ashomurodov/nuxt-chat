import { prisma } from '../../utils/db'
import { requireAuth } from '../../utils/auth'
import { sendToRoom, sendToUser } from '../../utils/pusher'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  const { content, receiverId, chatRoomId } = body

  if (!content || (!receiverId && !chatRoomId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Content and either receiverId or chatRoomId are required',
    })
  }

  // Verify receiver exists if direct message
  if (receiverId) {
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    })

    if (!receiver) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Receiver not found',
      })
    }
  }

  // Verify chat room exists and user is member
  if (chatRoomId) {
    const membership = await prisma.chatRoomMember.findUnique({
      where: {
        userId_chatRoomId: {
          userId: user.id,
          chatRoomId,
        },
      },
    })

    if (!membership) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You are not a member of this chat room',
      })
    }
  }

  // Create message
  const message = await prisma.message.create({
    data: {
      content,
      senderId: user.id,
      receiverId: receiverId || null,
      chatRoomId: chatRoomId || null,
    },
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

  // Send real-time notification via Pusher
  try {
    if (chatRoomId) {
      await sendToRoom(chatRoomId, 'new-message', message)
    } else if (receiverId) {
      // Send to both sender and receiver
      await sendToUser(receiverId, 'new-message', message)
      await sendToUser(user.id, 'new-message', message)
    }
  } catch (error) {
    // Don't fail if Pusher fails, message is still saved
    console.error('Pusher error:', error)
  }

  return { message }
})
