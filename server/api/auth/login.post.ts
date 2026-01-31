import { prisma } from '../../utils/db'
import { verifyPassword, generateToken, setAuthCookie } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // Generate token and set cookie
  const token = generateToken({ userId: user.id, email: user.email })
  setAuthCookie(event, token)

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    },
    token,
  }
})
