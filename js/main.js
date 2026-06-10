/**
 * Antigravity — Shared JavaScript
 * IntersectionObserver for fade-up animations + mobile nav toggle
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-Triggered Fade-Up Animations ────────────────────────────
  const fadeUpElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeUpElements.forEach((el) => fadeObserver.observe(el));
  } else {
    // Fallback: show all immediately
    fadeUpElements.forEach((el) => el.classList.add('is-visible'));
  }

  // ── Mobile Navigation Toggle ───────────────────────────────────────
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const navGlass = document.querySelector('.nav-glass');

  if (menuBtn && mobileNav) {
    let isOpen = false;

    menuBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      mobileNav.style.display = isOpen ? 'flex' : 'none';
      navGlass.classList.toggle('menu-open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);

      // Swap icon
      const icon = menuBtn.querySelector('svg');
      if (isOpen) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      }
    });

    // Close when clicking a link
    mobileNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        isOpen = false;
        mobileNav.style.display = 'none';
        navGlass.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('svg');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      });
    });
  }

  // ── Smooth Scroll for anchor links ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
