import { prisma } from '../../../utils/db'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const roomId = getRouterParam(event, 'roomId')

  if (!roomId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Room ID is required',
    })
  }

  // Update the lastReadAt timestamp for this user in this room
  await prisma.chatRoomMember.updateMany({
    where: {
      userId: user.id,
      chatRoomId: roomId,
    },
    data: {
      lastReadAt: new Date(),
    },
  })

  return { success: true }
})
