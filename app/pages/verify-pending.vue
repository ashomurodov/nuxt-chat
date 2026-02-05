<template>
  <div class="min-h-screen-dvh flex items-center justify-center px-6 relative">
    <!-- Dot Pattern Background -->
    <div class="fixed inset-0 dot-pattern pointer-events-none"></div>

    <div class="w-full max-w-md relative">
      <!-- Logo -->
      <div class="text-center mb-8 animate-fade-in-up">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </NuxtLink>
        <h1 class="text-2xl font-semibold text-gray-900">Check your email</h1>
        <p class="text-gray-500 mt-2">We've sent a verification link to</p>
        <p class="text-gray-900 font-medium mt-1">{{ email }}</p>
      </div>

      <!-- Info Card -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-fade-in-up delay-1">
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-blue-800 text-sm">
              Click the link in your email to verify your account. The link will expire in 24 hours.
            </p>
          </div>
        </div>
      </div>

      <!-- Resend Section -->
      <div class="mt-8 text-center animate-fade-in-up delay-2">
        <p class="text-gray-500 text-sm mb-4">Didn't receive the email?</p>

        <!-- Success Message -->
        <div v-if="resendSuccess" class="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm mb-4">
          Verification email sent! Check your inbox.
        </div>

        <!-- Error Message -->
        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-4">
          {{ error }}
        </div>

        <button
          @click="handleResend"
          :disabled="isResending || cooldown > 0"
          class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isResending">Sending...</span>
          <span v-else-if="cooldown > 0">Resend in {{ cooldown }}s</span>
          <span v-else>Resend verification email</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="divider-line my-8">
        <span class="cross left">+</span>
        <span class="cross right">+</span>
      </div>

      <!-- Back to Login -->
      <p class="text-center text-gray-500 animate-fade-in-up delay-3">
        <NuxtLink to="/login" class="text-gray-900 font-medium hover:underline">
          Back to login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { resendVerification } = useAuth()

const email = computed(() => route.query.email as string || '')
const isResending = ref(false)
const resendSuccess = ref(false)
const error = ref('')
const cooldown = ref(0)

let cooldownInterval: ReturnType<typeof setInterval> | null = null

async function handleResend() {
  if (!email.value || cooldown.value > 0) return

  error.value = ''
  resendSuccess.value = false
  isResending.value = true

  try {
    await resendVerification(email.value)
    resendSuccess.value = true

    // Start cooldown
    cooldown.value = 60
    cooldownInterval = setInterval(() => {
      cooldown.value--
      if (cooldown.value <= 0 && cooldownInterval) {
        clearInterval(cooldownInterval)
        cooldownInterval = null
      }
    }, 1000)
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    error.value = err.data?.statusMessage || 'Failed to resend verification email'
  } finally {
    isResending.value = false
  }
}

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }
})
</script>

<style scoped>
.dot-pattern {
  background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
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
.delay-3 { animation-delay: 0.3s; opacity: 0; }
</style>
