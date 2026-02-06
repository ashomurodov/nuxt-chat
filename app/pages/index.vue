<template>
  <div class="landing" ref="landing">
    <!-- Grid Lines -->
    <div class="grid-lines" aria-hidden="true">
      <div class="grid-line grid-line--left"></div>
      <div class="grid-line grid-line--right"></div>
    </div>

    <!-- Navigation -->
    <nav class="nav">
      <div class="container nav__inner">
        <NuxtLink to="/" class="nav__logo">
          <div class="nav__logo-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span class="nav__logo-text">Mittere</span>
        </NuxtLink>
        <div class="nav__links">
          <a href="#features" class="nav__link">Features</a>
          <a href="#about" class="nav__link">About</a>
          <NuxtLink to="/login" class="nav__cta">Get Started</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <div class="hero__badge anim-fade-up" style="--delay: 0.1s">
            <span class="hero__badge-dot"></span>
            Now in beta
          </div>

          <h1 class="hero__title anim-fade-up" style="--delay: 0.2s">
            Chat without
            <span class="hero__title--muted">the clutter</span>
          </h1>

          <p class="hero__subtitle anim-fade-up" style="--delay: 0.35s">
            A minimal chat experience designed for focused conversations.
            No distractions, no noise — just you and your messages.
          </p>

          <div class="hero__actions anim-fade-up" style="--delay: 0.5s">
            <NuxtLink to="/register" class="btn btn--primary">
              Start chatting
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a href="#features" class="btn btn--ghost">Learn more</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider with aligned crosses -->
    <div class="divider anim-line" style="--delay: 0.6s">
      <div class="divider__inner">
        <span class="cross">+</span>
        <span class="cross">+</span>
      </div>
    </div>

    <!-- Preview -->
    <section class="preview">
      <div class="container">
        <div class="preview__window anim-fade-up" style="--delay: 0.7s">
          <div class="preview__header">
            <div class="preview__dots">
              <span></span><span></span><span></span>
            </div>
            <span class="preview__header-title">Mittere</span>
            <div style="width: 52px"></div>
          </div>
          <div class="preview__body">
            <div class="chat-msg chat-msg--in anim-msg" style="--delay: 0.9s">
              <div class="chat-msg__avatar chat-msg__avatar--gray"></div>
              <div class="chat-msg__bubble chat-msg__bubble--in">
                Hey, how's the project coming along?
              </div>
            </div>
            <div class="chat-msg chat-msg--out anim-msg" style="--delay: 1.1s">
              <div class="chat-msg__bubble chat-msg__bubble--out">
                Going great! Just finished the landing page.
              </div>
              <div class="chat-msg__avatar chat-msg__avatar--dark"></div>
            </div>
            <div class="chat-msg chat-msg--in anim-msg" style="--delay: 1.3s">
              <div class="chat-msg__avatar chat-msg__avatar--gray"></div>
              <div class="chat-msg__bubble chat-msg__bubble--in">
                Looks minimal and clean. Love it!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="divider anim-line" style="--delay: 0.8s">
      <div class="divider__inner">
        <span class="cross">+</span>
        <span class="cross">+</span>
      </div>
    </div>

    <!-- Features -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-header anim-fade-up" style="--delay: 0.2s">
          <span class="section-label">Features</span>
          <h2 class="section-title">Designed for<br>simplicity</h2>
          <p class="section-desc">Every feature serves a purpose. Nothing more, nothing less.</p>
        </div>

        <div class="features__grid">
          <div class="feature-card anim-fade-up" style="--delay: 0.3s">
            <div class="feature-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 class="feature-card__title">Lightning fast</h3>
            <p class="feature-card__desc">Messages delivered instantly. No loading spinners, no delays.</p>
          </div>

          <div class="feature-card anim-fade-up" style="--delay: 0.4s">
            <div class="feature-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 class="feature-card__title">Private by default</h3>
            <p class="feature-card__desc">End-to-end encryption keeps your conversations secure.</p>
          </div>

          <div class="feature-card anim-fade-up" style="--delay: 0.5s">
            <div class="feature-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <h3 class="feature-card__title">Clean interface</h3>
            <p class="feature-card__desc">Focus on what matters. A distraction-free environment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="about">
      <div class="container">
        <div class="about__inner anim-fade-up" style="--delay: 0.2s">
          <span class="section-label">About</span>
          <h2 class="section-title">Built for humans</h2>
          <p class="about__text">
            We believe communication should be effortless. Mittere strips away
            the complexity found in modern messaging apps, leaving you with a
            pure, focused experience.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <div class="cta__card anim-fade-up" style="--delay: 0.2s">
          <div class="cta__content">
            <h2 class="cta__title">Ready to simplify?</h2>
            <p class="cta__desc">
              Join thousands who have already made the switch to distraction-free messaging.
            </p>
            <NuxtLink to="/register" class="btn btn--white">
              Get started free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          <!-- Decorative corner crosses -->
          <span class="cta__cross cta__cross--tl">+</span>
          <span class="cta__cross cta__cross--tr">+</span>
          <span class="cta__cross cta__cross--bl">+</span>
          <span class="cta__cross cta__cross--br">+</span>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <div class="nav__logo-mark nav__logo-mark--sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span class="footer__brand-name">Mittere</span>
        </div>
        <p class="footer__copy">&copy; 2025 Mittere. All rights reserved.</p>
        <div class="footer__links">
          <a href="#" class="footer__link">Privacy</a>
          <a href="#" class="footer__link">Terms</a>
          <a href="#" class="footer__link">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const landing = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )

  if (landing.value) {
    landing.value.querySelectorAll('.anim-fade-up, .anim-line, .anim-msg').forEach((el) => {
      observer.observe(el)
    })
  }
})
</script>

<style>
/* ============================================
   LAYOUT
   ============================================ */

.landing {
  position: relative;
  min-height: 100dvh;
  overflow-x: hidden;
}

.container {
  max-width: 72rem; /* 1152px — matches max-w-6xl */
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 3rem;
  }
}

/* ============================================
   GRID LINES — sit at max-width edges,
   content padding creates the breathing room
   ============================================ */

.grid-lines {
  position: fixed;
  inset: 0;
  max-width: 72rem;
  margin: 0 auto;
  pointer-events: none;
  z-index: 0;
}

.grid-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #e5e5e5;
  opacity: 0.5;
}

.grid-line--left {
  left: 0;
}

.grid-line--right {
  right: 0;
}

/* ============================================
   NAVIGATION
   ============================================ */

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e5e5;
  animation: slideDown 0.5s ease-out both;
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
}

@media (min-width: 768px) {
  .nav__inner {
    height: 4rem;
  }
}

.nav__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #171717;
}

.nav__logo-mark {
  width: 2rem;
  height: 2rem;
  background: #171717;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.nav__logo-mark--sm {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
}

.nav__logo-text {
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .nav__links {
    gap: 2rem;
  }
}

.nav__link {
  font-size: 0.8125rem;
  color: #737373;
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 0.01em;
}

.nav__link:hover {
  color: #171717;
}

.nav__cta {
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background: #171717;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, transform 0.15s;
}

@media (min-width: 768px) {
  .nav__cta {
    font-size: 0.8125rem;
    padding: 0.5rem 1rem;
  }
}

.nav__cta:hover {
  background: #262626;
  transform: translateY(-1px);
}

/* ============================================
   HERO
   ============================================ */

.hero {
  padding: 8rem 0 5rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 768px) {
  .hero {
    padding: 10rem 0 6rem;
  }
}

.hero__content {
  max-width: 40rem;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #525252;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

.hero__badge-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.hero__title {
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #171717;
  margin: 0 0 1.5rem;
}

.hero__title--muted {
  display: block;
  color: #a3a3a3;
}

.hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #737373;
  max-width: 32rem;
  margin: 0 0 2.5rem;
  font-weight: 400;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* ============================================
   BUTTONS
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.75rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.btn--primary {
  background: #171717;
  color: white;
}

.btn--primary:hover {
  background: #262626;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(23, 23, 23, 0.15);
}

.btn--ghost {
  background: transparent;
  color: #525252;
  border: 1px solid #d4d4d4;
}

.btn--ghost:hover {
  background: #f5f5f5;
  border-color: #a3a3a3;
  transform: translateY(-2px);
}

.btn--white {
  background: white;
  color: #171717;
}

.btn--white:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
}

/* ============================================
   DIVIDERS WITH ALIGNED CROSSES
   ============================================ */

.divider {
  position: relative;
  z-index: 1;
  width: 100%;
}

/* The actual horizontal line */
.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  height: 1px;
  background: #e5e5e5;
}

.divider__inner {
  position: relative;
  max-width: 72rem;
  margin: 0 auto;
  height: 0;
}

.cross {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 300;
  color: #a3a3a3;
  line-height: 1;
  user-select: none;
  background: white;
  padding: 0.25rem;
}

.cross:first-child {
  left: 0;
}

.cross:last-child {
  left: 100%;
}

/* ============================================
   PREVIEW (MOCK CHAT)
   ============================================ */

.preview {
  padding: 6rem 0;
  position: relative;
  z-index: 1;
}

.preview__window {
  border-radius: 1rem;
  border: 1px solid #e5e5e5;
  background: #fafafa;
  overflow: hidden;
}

.preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #e5e5e5;
  background: white;
}

.preview__dots {
  display: flex;
  gap: 0.375rem;
}

.preview__dots span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #d4d4d4;
}

.preview__header-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #525252;
  letter-spacing: -0.01em;
}

.preview__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

/* Fade-out at the bottom */
.preview__body::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background: linear-gradient(to bottom, transparent, #fafafa);
  pointer-events: none;
}

.chat-msg {
  display: flex;
  gap: 0.625rem;
  align-items: flex-end;
}

.chat-msg--out {
  justify-content: flex-end;
}

.chat-msg__avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.chat-msg__avatar--gray {
  background: #d4d4d4;
}

.chat-msg__avatar--dark {
  background: #171717;
}

.chat-msg__bubble {
  padding: 0.625rem 0.875rem;
  border-radius: 1rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  max-width: 20rem;
}

.chat-msg__bubble--in {
  background: white;
  color: #404040;
  border: 1px solid #e5e5e5;
  border-bottom-left-radius: 0.25rem;
}

.chat-msg__bubble--out {
  background: #171717;
  color: white;
  border-bottom-right-radius: 0.25rem;
}

/* ============================================
   SECTION HEADER
   ============================================ */

.section-label {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a3a3a3;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.875rem, 4vw, 2.75rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #171717;
  margin: 0 0 1rem;
}

.section-desc {
  font-size: 1rem;
  color: #737373;
  line-height: 1.6;
  max-width: 28rem;
  margin: 0;
}

.section-header {
  margin-bottom: 3.5rem;
}

/* ============================================
   FEATURES
   ============================================ */

.features {
  padding: 6rem 0;
  position: relative;
  z-index: 1;
}

.features__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  overflow: hidden;
}

@media (min-width: 768px) {
  .features__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  background: white;
  padding: 2rem;
  transition: background 0.3s;
}

@media (min-width: 768px) {
  .feature-card {
    padding: 2.5rem;
  }
}

.feature-card:hover {
  background: #fafafa;
}

.feature-card__icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #404040;
  margin-bottom: 1.25rem;
}

.feature-card__title {
  font-size: 1rem;
  font-weight: 600;
  color: #171717;
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.feature-card__desc {
  font-size: 0.8125rem;
  color: #737373;
  line-height: 1.6;
  margin: 0;
}

/* ============================================
   ABOUT
   ============================================ */

.about {
  padding: 6rem 0;
  position: relative;
  z-index: 1;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.about__inner {
  max-width: 36rem;
}

.about__text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #525252;
  margin: 0;
}

/* ============================================
   CTA
   ============================================ */

.cta {
  padding: 6rem 0;
  position: relative;
  z-index: 1;
}

.cta__card {
  background: #0a0a0a;
  border-radius: 1.25rem;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .cta__card {
    padding: 5rem 3rem;
  }
}

/* Subtle noise texture on CTA */
.cta__card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
}

.cta__content {
  position: relative;
  z-index: 1;
}

.cta__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  color: white;
  letter-spacing: -0.03em;
  margin: 0 0 0.75rem;
}

.cta__desc {
  font-size: 1rem;
  color: #737373;
  max-width: 24rem;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.cta__cross {
  position: absolute;
  font-size: 0.875rem;
  font-weight: 300;
  color: #404040;
  line-height: 1;
  user-select: none;
}

.cta__cross--tl { top: 1.25rem; left: 1.25rem; }
.cta__cross--tr { top: 1.25rem; right: 1.25rem; }
.cta__cross--bl { bottom: 1.25rem; left: 1.25rem; }
.cta__cross--br { bottom: 1.25rem; right: 1.25rem; }

/* ============================================
   FOOTER
   ============================================ */

.footer {
  padding: 2rem 0;
  border-top: 1px solid #e5e5e5;
  position: relative;
  z-index: 1;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

@media (min-width: 768px) {
  .footer__inner {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__brand-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #171717;
}

.footer__copy {
  font-size: 0.75rem;
  color: #a3a3a3;
  margin: 0;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__link {
  font-size: 0.75rem;
  color: #737373;
  text-decoration: none;
  transition: color 0.2s;
}

.footer__link:hover {
  color: #171717;
}

/* ============================================
   ANIMATIONS
   ============================================ */

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Scroll-triggered fade up */
.anim-fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.anim-fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Scroll-triggered line expand */
.anim-line {
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.anim-line.is-visible {
  transform: scaleX(1);
}

/* Chat messages */
.anim-msg {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: var(--delay, 0s);
}

.anim-msg.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0s !important;
  }
}
</style>
