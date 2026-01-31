<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <!-- Dot Pattern Background -->
    <div class="fixed inset-0 dot-pattern pointer-events-none"></div>

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span class="font-semibold text-gray-900">nuxt chat</span>
        </div>
        <div class="flex items-center gap-8">
          <a href="#features" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#about" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <button class="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6 relative">
      <div class="max-w-4xl mx-auto text-center relative">
        <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Now in beta
        </div>

        <h1 class="text-5xl md:text-7xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
          Chat without<br />
          <span class="text-gray-400">the clutter</span>
        </h1>

        <p class="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          A minimal chat experience designed for focused conversations.
          No distractions, no noise — just you and your messages.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20">
            Start chatting
          </button>
          <button class="w-full sm:w-auto px-8 py-4 text-base font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            Learn more
          </button>
        </div>
      </div>
    </section>

    <!-- Divider Line with Crosses -->
    <div class="divider-line">
      <span class="cross left">+</span>
      <span class="cross right">+</span>
    </div>

    <!-- Preview Section -->
    <section class="px-6 py-20 relative">
      <div class="max-w-4xl mx-auto">
        <div class="relative bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none z-10"></div>

          <!-- Mock Chat Interface -->
          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div class="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 max-w-md">
                <p class="text-gray-700 text-sm">Hey, how's the project coming along?</p>
              </div>
            </div>

            <div class="flex gap-3 justify-end">
              <div class="bg-gray-900 rounded-2xl rounded-tr-md px-4 py-3 max-w-md">
                <p class="text-white text-sm">Going great! Just finished the landing page.</p>
              </div>
              <div class="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0"></div>
            </div>

            <div class="flex gap-3">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div class="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 max-w-md">
                <p class="text-gray-700 text-sm">Looks minimal and clean. Love it!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider Line with Crosses -->
    <div class="divider-line">
      <span class="cross left">+</span>
      <span class="cross right">+</span>
    </div>

    <!-- Features Section -->
    <section id="features" class="px-6 py-20 bg-gray-50/50 relative">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Designed for simplicity
          </h2>
          <p class="text-gray-500 max-w-xl mx-auto">
            Every feature serves a purpose. Nothing more, nothing less.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200">
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Lightning fast</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Messages delivered instantly. No loading spinners, no delays.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200">
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Private by default</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              End-to-end encryption keeps your conversations secure.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200">
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Clean interface</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Focus on what matters. A distraction-free environment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider Line with Crosses -->
    <div class="divider-line">
      <span class="cross left">+</span>
      <span class="cross right">+</span>
    </div>

    <!-- About Section -->
    <section id="about" class="px-6 py-20 relative">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          Built for humans
        </h2>
        <p class="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
          We believe communication should be effortless. Nuxt Chat strips away
          the complexity found in modern messaging apps, leaving you with a
          pure, focused experience.
        </p>
      </div>
    </section>

    <!-- Divider Line with Crosses -->
    <div class="divider-line">
      <span class="cross left">+</span>
      <span class="cross right">+</span>
    </div>

    <!-- CTA Section -->
    <section class="px-6 py-20">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gray-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <h2 class="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to simplify?
          </h2>
          <p class="text-gray-400 mb-8 max-w-lg mx-auto">
            Join thousands of users who have already made the switch to
            distraction-free messaging.
          </p>
          <button class="px-8 py-4 text-base font-medium text-gray-900 bg-white rounded-xl hover:bg-gray-100 transition-colors">
            Get started for free
          </button>
        </div>
      </div>
    </section>

    <!-- Divider Line with Crosses -->
    <div class="divider-line">
      <span class="cross left">+</span>
      <span class="cross right">+</span>
    </div>

    <!-- Footer -->
    <footer class="px-6 py-12 bg-white/80 backdrop-blur-sm relative">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-900">nuxt chat</span>
        </div>
        <p class="text-sm text-gray-500">
          &copy; 2025 Nuxt Chat. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy</a>
          <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms</a>
          <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.dot-pattern {
  background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
}

/* Full-width divider line with cross marks */
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
  left: 24px;
}

.divider-line .cross.right {
  right: 24px;
}

@media (min-width: 768px) {
  .divider-line .cross.left {
    left: 48px;
  }
  .divider-line .cross.right {
    right: 48px;
  }
}
</style>
