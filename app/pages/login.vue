<template>
  <div class="min-h-screen-dvh flex items-center justify-center px-6 relative">
    <!-- Texture Background -->
    <div class="fixed inset-0 texture-bg pointer-events-none"></div>

    <div class="w-full max-w-md relative">
      <!-- Logo -->
      <div class="text-center mb-8 animate-fade-in-up">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </NuxtLink>
        <h1 class="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p class="text-gray-500 mt-2">Sign in to continue to Mittere</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5 animate-fade-in-up delay-1">
        <!-- Email Not Verified Message -->
        <div v-if="emailNotVerified" class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
          <p class="mb-2">Please verify your email before logging in.</p>
          <NuxtLink
            :to="`/verify-pending?email=${encodeURIComponent(unverifiedEmail)}`"
            class="text-amber-800 font-medium hover:underline"
          >
            Resend verification email
          </NuxtLink>
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {{ error }}
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign in</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider-line my-4">
        <span class="cross left"></span>
        <span class="cross right"></span>
      </div>

      <!-- Register Link -->
      <p class="text-center text-gray-500 animate-fade-in-up delay-2">
        Don't have an account?
        <NuxtLink to="/register" class="text-gray-900 font-medium hover:underline">
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const emailNotVerified = ref(false)
const unverifiedEmail = ref('')

async function handleLogin() {
  error.value = ''
  emailNotVerified.value = false
  isLoading.value = true

  try {
    await login(email.value, password.value)
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string; data?: { code?: string; email?: string } } }

    // Check if error is due to unverified email
    if (err.data?.data?.code === 'EMAIL_NOT_VERIFIED') {
      emailNotVerified.value = true
      unverifiedEmail.value = err.data?.data?.email || email.value
    } else {
      error.value = err.data?.statusMessage || 'Failed to sign in'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.texture-bg {
  background-image: url('~/assets/images/texture3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(1);
  opacity: 0.1;
}

.divider-line {
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
}

.divider-line .cross {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 300;
  color: #a3a3a3;
  line-height: 1;
  user-select: none;
}

.divider-line .cross.left {
  left: 0;
}

.divider-line .cross.right {
  right: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.delay-1 { animation-delay: 0.1s; opacity: 0; }
.delay-2 { animation-delay: 0.2s; opacity: 0; }
</style>
