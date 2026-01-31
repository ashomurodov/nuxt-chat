import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { H3Event } from 'h3'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production'
const TOKEN_EXPIRY = '7d'

export interface JwtPayload {
  userId: string
  email: string
}

export interface AuthUser {
  id: string
  email: string
  username: string
  avatar: string | null
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

// Verify JWT token
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

// Get token from request (cookie or header)
export function getTokenFromEvent(event: H3Event): string | null {
  // Try cookie first
  const cookieToken = getCookie(event, 'auth_token')
  if (cookieToken) return cookieToken

  // Try Authorization header
  const authHeader = getHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  return null
}

// Get current user from request
export async function getCurrentUser(event: H3Event): Promise<AuthUser | null> {
  const token = getTokenFromEvent(event)
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
    },
  })

  return user
}

// Auth middleware - throws error if not authenticated
export async function requireAuth(event: H3Event): Promise<AuthUser> {
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  return user
}

// Set auth cookie
export function setAuthCookie(event: H3Event, token: string): void {
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

// Clear auth cookie
export function clearAuthCookie(event: H3Event): void {
  deleteCookie(event, 'auth_token', {
    path: '/',
  })
}
