import { prisma } from '../../utils/db'
import { generateToken, setAuthCookie } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = query.token as string

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Verification token is required',
    })
  }

  // Find user with this token
  const user = await prisma.user.findUnique({
    where: { verifyToken: token },
  })

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid verification token',
    })
  }

  // Check if token has expired
  if (user.verifyTokenExp && user.verifyTokenExp < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Verification token has expired. Please request a new one.',
    })
  }

  // Mark email as verified and clear token
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verifyToken: null,
      verifyTokenExp: null,
    },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      emailVerified: true,
    },
  })

  // Generate auth token and set cookie so user is logged in
  const authToken = generateToken({ userId: user.id, email: user.email })
  setAuthCookie(event, authToken)

  return {
    user: updatedUser,
    token: authToken,
    message: 'Email verified successfully',
  }
})
