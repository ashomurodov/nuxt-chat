<template>
  <div class="min-h-screen-dvh flex items-center justify-center px-6 relative">
    <!-- Dot Pattern Background -->
    <div class="fixed inset-0 dot-pattern pointer-events-none"></div>

    <div class="w-full max-w-md relative">
      <!-- Loading State -->
      <div v-if="isVerifying" class="text-center animate-fade-in-up">
        <div class="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-gray-900">Verifying your email...</h1>
        <p class="text-gray-500 mt-2">Please wait a moment</p>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="text-center animate-fade-in-up">
        <div class="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-gray-900">Email verified!</h1>
        <p class="text-gray-500 mt-2">Your account is now active</p>
        <p class="text-gray-400 text-sm mt-4">Redirecting to chat...</p>
      </div>

      <!-- Error State -->
      <div v-else class="text-center animate-fade-in-up">
        <div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-gray-900">Verification failed</h1>
        <p class="text-gray-500 mt-2">{{ error }}</p>

        <!-- Divider -->
        <div class="divider-line my-8">
          <span class="cross left">+</span>
          <span class="cross right">+</span>
        </div>

        <div class="space-y-3">
          <NuxtLink
            to="/login"
            class="block w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all text-center"
          >
            Go to login
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="block w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all text-center"
          >
            Create new account
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { verifyEmail } = useAuth()

const isVerifying = ref(true)
const isSuccess = ref(false)
const error = ref('')

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    isVerifying.value = false
    error.value = 'Verification token is missing'
    return
  }

  try {
    await verifyEmail(token)
    isSuccess.value = true
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    error.value = err.data?.statusMessage || 'Invalid or expired verification link'
  } finally {
    isVerifying.value = false
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
</style>
