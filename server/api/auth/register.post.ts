import { prisma } from '~/server/utils/db'
import { hashPassword, generateToken, setAuthCookie } from '~/server/utils/auth'

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

  // Hash password and create user
  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
    },
  })

  // Generate token and set cookie
  const token = generateToken({ userId: user.id, email: user.email })
  setAuthCookie(event, token)

  return {
    user,
    token,
  }
})
