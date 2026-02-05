import { prisma } from '../../utils/db'
import { hashPassword } from '../../utils/auth'
import {
  generateVerifyToken,
  getVerifyTokenExpiration,
  sendVerificationEmail,
} from '../../utils/email'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate input
  const { email, username, password } = body

  if (!email || !username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email, username, and password are required',
    })
  }

  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 6 characters',
    })
  }

  if (username.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username must be at least 3 characters',
    })
  }

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: existingUser.email === email
        ? 'Email already registered'
        : 'Username already taken',
    })
  }

  // Hash password and generate verification token
  const hashedPassword = await hashPassword(password)
  const verifyToken = generateVerifyToken()
  const verifyTokenExp = getVerifyTokenExpiration()

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      emailVerified: false,
      verifyToken,
      verifyTokenExp,
    },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      emailVerified: true,
    },
  })

  // Send verification email
  try {
    await sendVerificationEmail(email, username, verifyToken)
  } catch (error) {
    // If email fails, still return success but log error
    // User can request a new verification email later
    console.error('Failed to send verification email:', error)
  }

  return {
    user,
    message: 'Registration successful. Please check your email to verify your account.',
  }
})
