interface UserRateData {
  timestamps: number[]
  blockedUntil: number | null
}

const rateLimitStore = new Map<string, UserRateData>()

const MAX_MESSAGES = 10
const WINDOW_MS = 60 * 1000 // 1 minute window to count messages
const COOLDOWN_MS = 1 * 1000 // 1 second between messages
const BLOCK_DURATION_MS = 10 * 60 * 1000 // 10 minutes block

export function checkMessageRateLimit(userId: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  let userData = rateLimitStore.get(userId)

  if (!userData) {
    userData = { timestamps: [], blockedUntil: null }
    rateLimitStore.set(userId, userData)
  }

  if (userData.blockedUntil && now < userData.blockedUntil) {
    const retryAfterSeconds = Math.ceil((userData.blockedUntil - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  if (userData.blockedUntil && now >= userData.blockedUntil) {
    userData.blockedUntil = null
    userData.timestamps = []
  }

  const lastTimestamp = userData.timestamps[userData.timestamps.length - 1]
  if (lastTimestamp && now - lastTimestamp < COOLDOWN_MS) {
    const retryAfterSeconds = Math.ceil((COOLDOWN_MS - (now - lastTimestamp)) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  userData.timestamps = userData.timestamps.filter(t => now - t < WINDOW_MS)

  if (userData.timestamps.length >= MAX_MESSAGES) {
    userData.blockedUntil = now + BLOCK_DURATION_MS
    const retryAfterSeconds = Math.ceil(BLOCK_DURATION_MS / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  userData.timestamps.push(now)
  return { allowed: true }
}
