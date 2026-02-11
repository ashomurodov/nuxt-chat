<template>
  <div class="landing" ref="landing">
    <!-- Grid Lines -->
    <div class="grid-lines" aria-hidden="true">
      <div class="grid-line grid-line--left"></div>
      <div class="grid-line grid-line--right"></div>
    </div>

    <!-- Ambient Orbs -->
    <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
    <div class="hero__orb hero__orb--2" aria-hidden="true"></div>

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
          <div class="hero__badge">
            <span class="hero__badge-dot"></span>
            Now in beta
          </div>

          <h1 class="hero__title">
            <span class="hero__title-line"><span class="hero__title-word">Chat</span> <span class="hero__title-word">without</span></span>
            <span class="hero__title-line hero__title--muted"><span class="hero__title-word">the</span> <span class="hero__title-word">clutter</span></span>
          </h1>

          <p class="hero__subtitle">
            A minimal chat experience designed for focused conversations.
            No distractions, no noise — just you and your messages.
          </p>

          <div class="hero__actions">
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
    <div class="divider">
      <div class="divider__line"></div>
      <div class="divider__inner">
        <span class="cross">+</span>
        <span class="cross">+</span>
      </div>
    </div>

    <!-- Preview -->
    <section class="preview">
      <div class="container">
        <div class="preview__window">
          <div class="preview__header">
            <div class="preview__dots">
              <span></span><span></span><span></span>
            </div>
            <span class="preview__header-title">Mittere</span>
            <div style="width: 52px"></div>
          </div>
          <div class="preview__body">
            <div class="chat-msg chat-msg--in">
              <div class="chat-msg__avatar chat-msg__avatar--gray"></div>
              <div class="chat-msg__bubble chat-msg__bubble--in">
                Hey, how's the project coming along?
              </div>
            </div>
            <div class="chat-msg chat-msg--out">
              <div class="chat-msg__bubble chat-msg__bubble--out">
                Going great! Just finished the landing page.
              </div>
              <div class="chat-msg__avatar chat-msg__avatar--dark"></div>
            </div>
            <div class="chat-msg chat-msg--in">
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
    <div class="divider">
      <div class="divider__line"></div>
      <div class="divider__inner">
        <span class="cross">+</span>
        <span class="cross">+</span>
      </div>
    </div>

    <!-- Features -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Features</span>
          <h2 class="section-title">Designed for<br>simplicity</h2>
          <p class="section-desc">Every feature serves a purpose. Nothing more, nothing less.</p>
        </div>

        <div class="features__grid">
          <div class="feature-card">
            <div class="feature-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 class="feature-card__title">Lightning fast</h3>
            <p class="feature-card__desc">Messages delivered instantly. No loading spinners, no delays.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 class="feature-card__title">Private by default</h3>
            <p class="feature-card__desc">End-to-end encryption keeps your conversations secure.</p>
          </div>

          <div class="feature-card">
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
        <div class="about__inner">
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
        <div class="cta__card">
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const landing = ref(null)
let ctx = null

onMounted(async () => {
  const gsapModule = await import('gsap')
  const scrollModule = await import('gsap/ScrollTrigger')
  const gsap = gsapModule.default || gsapModule.gsap
  const ScrollTrigger = scrollModule.ScrollTrigger || scrollModule.default
  gsap.registerPlugin(ScrollTrigger)

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    gsap.set('.nav, .hero__badge, .hero__title-word, .hero__subtitle, .hero__actions .btn, .hero__orb', {
      opacity: 1, y: 0, scale: 1
    })
    return
  }

  ctx = gsap.context(() => {

    // ========================================
    // HERO ENTRANCE TIMELINE
    // ========================================
    const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })

    hero
      // Nav slides down
      .fromTo('.nav',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      // Badge pops in
      .fromTo('.hero__badge',
        { y: 16, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
        0.2
      )
      // Title words reveal upward through clip mask
      .fromTo('.hero__title-word',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'power4.out' },
        0.35
      )
      // Subtitle fades in
      .fromTo('.hero__subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.9
      )
      // Buttons stagger up
      .fromTo('.hero__actions .btn',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        1.05
      )
      // Orbs fade in
      .fromTo('.hero__orb',
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' },
        0.3
      )

    // ========================================
    // DIVIDERS — line draw + cross spin
    // ========================================
    gsap.utils.toArray('.divider').forEach((div) => {
      const line = div.querySelector('.divider__line')
      const crosses = div.querySelectorAll('.cross')

      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.9, ease: 'power2.inOut',
          scrollTrigger: { trigger: div, start: 'top 88%' }
        }
      )

      gsap.fromTo(crosses,
        { scale: 0, rotation: 90, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1,
          duration: 0.5, stagger: 0.08, ease: 'back.out(2)',
          delay: 0.35,
          scrollTrigger: { trigger: div, start: 'top 88%' }
        }
      )
    })

    // ========================================
    // PREVIEW — entrance + parallax
    // ========================================
    gsap.fromTo('.preview__window',
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.preview', start: 'top 80%' }
      }
    )

    gsap.fromTo('.chat-msg',
      { y: 20, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.45, stagger: 0.18, ease: 'power2.out',
        scrollTrigger: { trigger: '.preview__body', start: 'top 75%' }
      }
    )

    // Subtle parallax float
    gsap.to('.preview__window', {
      y: -30,
      scrollTrigger: {
        trigger: '.preview',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    })

    // ========================================
    // FEATURES — header + cards + icons
    // ========================================
    gsap.fromTo('.section-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.features', start: 'top 78%' }
      }
    )

    gsap.fromTo('.feature-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.features__grid', start: 'top 82%' }
      }
    )

    gsap.fromTo('.feature-card__icon',
      { scale: 0, rotation: -15 },
      {
        scale: 1, rotation: 0,
        duration: 0.5, stagger: 0.12, ease: 'back.out(2.5)',
        delay: 0.3,
        scrollTrigger: { trigger: '.features__grid', start: 'top 82%' }
      }
    )

    // ========================================
    // ABOUT
    // ========================================
    gsap.fromTo('.about__inner',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about', start: 'top 78%' }
      }
    )

    // ========================================
    // CTA — card + corner crosses
    // ========================================
    gsap.fromTo('.cta__card',
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta', start: 'top 72%' }
      }
    )

    gsap.fromTo('.cta__cross',
      { scale: 0, rotation: 180, opacity: 0 },
      {
        scale: 1, rotation: 0, opacity: 1,
        duration: 0.6, stagger: 0.08, ease: 'back.out(3)',
        delay: 0.4,
        scrollTrigger: { trigger: '.cta__card', start: 'top 72%' }
      }
    )

    // ========================================
    // FOOTER
    // ========================================
    gsap.fromTo('.footer__inner',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 92%' }
      }
    )

    // ========================================
    // ORB PARALLAX — drift with scroll
    // ========================================
    gsap.to('.hero__orb--1', {
      y: -80, scale: 1.15,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      }
    })

    gsap.to('.hero__orb--2', {
      y: -50, x: 30,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      }
    })

  }, landing.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
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
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 3rem;
  }
}

/* ============================================
   GRID LINES
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
   AMBIENT ORBS
   ============================================ */

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
}

.hero__orb--1 {
  top: 8%;
  right: -8%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(120, 119, 198, 0.07) 0%, transparent 70%);
}

.hero__orb--2 {
  top: 35%;
  left: -12%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 180, 120, 0.05) 0%, transparent 70%);
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
  opacity: 0;
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
  opacity: 0;
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

.hero__title-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
}

.hero__title-word {
  display: inline-block;
  opacity: 0;
}

.hero__title--muted {
  color: #a3a3a3;
}

.hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #737373;
  max-width: 32rem;
  margin: 0 0 2.5rem;
  font-weight: 400;
  opacity: 0;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__actions .btn {
  opacity: 0;
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

.divider__line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e5e5;
  transform-origin: center;
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

.feature-card:hover .feature-card__icon {
  transform: scale(1.05) rotate(3deg);
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
  transition: transform 0.3s ease;
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
   ANIMATIONS (continuous only)
   ============================================ */

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Scroll behavior for anchor links */
html {
  scroll-behavior: smooth;
}

/* ============================================
   REDUCED MOTION
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0s !important;
  }

  .nav,
  .hero__badge,
  .hero__title-word,
  .hero__subtitle,
  .hero__actions .btn {
    opacity: 1 !important;
  }
}
</style>
