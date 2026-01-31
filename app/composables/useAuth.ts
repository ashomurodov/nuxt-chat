interface User {
  id: string
  email: string
  username: string
  avatar: string | null
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const authState = reactive<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
})

export function useAuth() {
  const router = useRouter()

  // Fetch current user
  async function fetchUser() {
    authState.isLoading = true
    try {
      const { user } = await $fetch<{ user: User }>('/api/auth/me')
      authState.user = user
      authState.isAuthenticated = true
    } catch {
      authState.user = null
      authState.isAuthenticated = false
    } finally {
      authState.isLoading = false
    }
  }

  // Login
  async function login(email: string, password: string) {
    const { user } = await $fetch<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    authState.user = user
    authState.isAuthenticated = true
    router.push('/chat')
  }

  // Register
  async function register(email: string, username: string, password: string) {
    const { user } = await $fetch<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: { email, username, password },
    })
    authState.user = user
    authState.isAuthenticated = true
    router.push('/chat')
  }

  // Logout
  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    authState.user = null
    authState.isAuthenticated = false
    router.push('/login')
  }

  return {
    user: computed(() => authState.user),
    isAuthenticated: computed(() => authState.isAuthenticated),
    isLoading: computed(() => authState.isLoading),
    fetchUser,
    login,
    register,
    logout,
  }
}
