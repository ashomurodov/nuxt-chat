import { requireAuth } from '~/server/utils/auth'
import { getPusher } from '~/server/utils/pusher'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  const { socket_id, channel_name } = body

  if (!socket_id || !channel_name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'socket_id and channel_name are required',
    })
  }

  // Verify user has access to the channel
  if (channel_name.startsWith('private-user-')) {
    const userId = channel_name.replace('private-user-', '')
    if (userId !== user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied',
      })
    }
  }

  // For room channels, verify membership (could add more checks here)
  // if (channel_name.startsWith('private-room-')) { ... }

  const pusher = getPusher()
  const authResponse = pusher.authorizeChannel(socket_id, channel_name)

  return authResponse
})
