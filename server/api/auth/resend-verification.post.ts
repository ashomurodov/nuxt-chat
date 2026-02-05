import { prisma } from '../../utils/db'
import {
  generateVerifyToken,
  getVerifyTokenExpiration,
  sendVerificationEmail,
} from '../../utils/email'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    })
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Don't reveal if user exists or not for security
    return {
      message: 'If an account exists with this email, a verification link has been sent.',
    }
  }

  if (user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is already verified',
    })
  }

  // Generate new token
  const verifyToken = generateVerifyToken()
  const verifyTokenExp = getVerifyTokenExpiration()

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verifyToken,
      verifyTokenExp,
    },
  })

  // Send verification email
  try {
    await sendVerificationEmail(email, user.username, verifyToken)
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send verification email. Please try again later.',
    })
  }

  return {
    message: 'If an account exists with this email, a verification link has been sent.',
  }
})
