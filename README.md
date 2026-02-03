# Mittere

A minimal, fast, and beautiful real-time chat application built with Nuxt 3.

## Features

- **Real-time Messaging** - Instant message delivery powered by Pusher
- **User Authentication** - Secure login and registration with JWT
- **Chat Rooms** - Support for both direct messages and group chats
- **User Search** - Find and start conversations with other users
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- **Message History** - Persistent chat history stored in PostgreSQL

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Pusher
- **Authentication**: JWT + bcrypt

## Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `PUSHER_APP_ID` | Pusher application ID |
| `PUSHER_SECRET` | Pusher secret key |
| `NUXT_PUBLIC_PUSHER_KEY` | Pusher public key (client-side) |
| `NUXT_PUBLIC_PUSHER_CLUSTER` | Pusher cluster region |

## Deployment

### 1. Database Setup

Run Prisma migrations to set up your PostgreSQL database:

```bash
npx prisma migrate deploy
```

### 2. Build

```bash
pnpm build
```

### 3. Start Production Server

```bash
node .output/server/index.mjs
```

### Platform-Specific Deployment

- **Vercel/Netlify**: Zero-config deployment with automatic builds
- **Docker**: Use the Nitro preset for containerized deployments
- **Node.js**: Deploy the `.output` directory to any Node.js hosting

For detailed deployment options, see the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## External Services

### Pusher
Create a free account at [pusher.com](https://pusher.com) and create a Channels app to get your API credentials.

### PostgreSQL
Recommended providers:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with extras
- [Railway](https://railway.app) - Simple database hosting
