import { prisma } from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const query = getQuery(event)
  const search = query.search as string | undefined

  // Get all users except current user
  const users = await prisma.user.findMany({
    where: {
      id: { not: user.id },
      ...(search && {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
    },
    take: 20,
    orderBy: { username: 'asc' },
  })

  return { users }
})
