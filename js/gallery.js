/* Gallery cards — renders the 5 case studies on the homepage */
(function () {
  'use strict';

  // Each case maps to a multi-page demo under /gallery/<mode>/
  const CASES = [
    {
      mode: 'landing',
      title: 'Antigravity Landing',
      tag: 'Landing',
      tagColor: 'emerald',
      desc: 'Three-page marketing site with hero mesh gradient, floating orbs, glass nav, animated product mockup. Hero · Pricing · About.',
      pages: ['index.html', 'pricing.html', 'about.html'],
      gradient: 'from-emerald-50 via-emerald-100/50 to-blue-50',
      accentColor: 'emerald'
    },
    {
      mode: 'desktop',
      title: 'Projects Desktop App',
      tag: 'Desktop',
      tagColor: 'violet',
      desc: 'Native-feeling productivity app with macOS title bar, sidebar workspace, project canvas, notifications drawer, settings shell.',
      pages: ['index.html', 'notifications.html', 'settings.html'],
      gradient: 'from-violet-50 via-violet-100/50 to-blue-50',
      accentColor: 'violet'
    },
    {
      mode: 'saas',
      title: 'Antigravity SaaS',
      tag: 'SaaS',
      tagColor: 'cyan',
      desc: 'Multi-page business app shell. KPI dashboard, customers data table with filters, multi-section settings page with sticky save bar.',
      pages: ['index.html', 'customers.html', 'settings.html'],
      gradient: 'from-cyan-50 via-cyan-100/50 to-blue-50',
      accentColor: 'cyan'
    },
    {
      mode: 'mobile',
      title: 'Wallet Mobile App',
      tag: 'Mobile',
      tagColor: 'amber',
      desc: 'iOS-style mobile app inside a device frame. Wallet home with cards, transaction activity feed, profile settings with switches.',
      pages: ['index.html', 'activity.html', 'profile.html'],
      gradient: 'from-amber-50 via-amber-100/50 to-orange-50',
      accentColor: 'amber'
    },
    {
      mode: 'docs',
      title: 'Antigravity Docs',
      tag: 'Docs',
      tagColor: 'rose',
      desc: 'Documentation portal with three-column layout, 720px content, code tabs, API reference with parameter tables, prev/next pagination.',
      pages: ['index.html', 'installation.html', 'api-reference.html'],
      gradient: 'from-rose-50 via-rose-100/50 to-pink-50',
      accentColor: 'rose'
    }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  // SVG mockup per mode — minimal geometric preview, color-coded
  function mockupSvg(mode, accent) {
    // accent map: emerald → #10b981, violet → #8b5cf6, cyan → #06b6d4, amber → #f59e0b, rose → #f43f5e
    const colors = {
      emerald: '#10b981', violet: '#8b5cf6', cyan: '#06b6d4',
      amber: '#f59e0b', rose: '#f43f5e'
    };
    const c = colors[accent] || '#2563EB';

    if (mode === 'landing') {
      return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lg-${mode}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${c}" stop-opacity="0.10"/>
            <stop offset="100%" stop-color="${c}" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#lg-${mode})"/>
        <rect x="120" y="22" width="160" height="32" rx="16" fill="white" stroke="#e5e7eb"/>
        <rect x="80"  y="84" width="240" height="14" rx="4" fill="#111827"/>
        <rect x="100" y="106" width="200" height="14" rx="4" fill="${c}" opacity="0.7"/>
        <rect x="130" y="138" width="140" height="10" rx="3" fill="#6b7280" opacity="0.5"/>
        <rect x="148" y="156" width="104" height="10" rx="3" fill="#6b7280" opacity="0.5"/>
        <rect x="140" y="184" width="64" height="28" rx="14" fill="${c}"/>
        <rect x="212" y="184" width="64" height="28" rx="14" fill="white" stroke="#e5e7eb"/>
      </svg>`;
    }
    if (mode === 'desktop') {
      return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="240" fill="#f8f9fa"/>
        <rect x="32" y="22" width="336" height="196" rx="12" fill="white" stroke="#e5e7eb"/>
        <rect x="32" y="22" width="336" height="28" rx="12" fill="#f3f4f6"/>
        <circle cx="48" cy="36" r="4" fill="#ff5f57"/>
        <circle cx="62" cy="36" r="4" fill="#febc2e"/>
        <circle cx="76" cy="36" r="4" fill="#28c840"/>
        <rect x="32" y="50" width="92" height="168" fill="#fafbfc" stroke="#e5e7eb" stroke-width="0.5"/>
        <rect x="44" y="62" width="68" height="8" rx="2" fill="#9ca3af"/>
        <rect x="44" y="80" width="68" height="20" rx="6" fill="${c}" opacity="0.15"/>
        <rect x="50" y="86" width="8" height="8" rx="2" fill="${c}"/>
        <rect x="62" y="86" width="40" height="8" rx="2" fill="${c}"/>
        <rect x="44" y="108" width="56" height="8" rx="2" fill="#9ca3af"/>
        <rect x="44" y="124" width="60" height="8" rx="2" fill="#9ca3af"/>
        <rect x="140" y="68" width="208" height="56" rx="8" fill="#fafbfc" stroke="#e5e7eb" stroke-width="0.5"/>
        <rect x="140" y="136" width="100" height="82" rx="8" fill="#fafbfc" stroke="#e5e7eb" stroke-width="0.5"/>
        <rect x="248" y="136" width="100" height="82" rx="8" fill="#fafbfc" stroke="#e5e7eb" stroke-width="0.5"/>
        <circle cx="288" cy="178" r="14" fill="${c}" opacity="0.2"/>
      </svg>`;
    }
    if (mode === 'saas') {
      return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="240" fill="#f8f9fa"/>
        <rect x="0" y="0" width="400" height="40" fill="white"/>
        <rect x="0" y="40" width="76" height="200" fill="white"/>
        <rect x="14" y="56" width="48" height="8" rx="2" fill="${c}"/>
        <rect x="14" y="74" width="40" height="6" rx="2" fill="#d1d5db"/>
        <rect x="14" y="88" width="44" height="6" rx="2" fill="#d1d5db"/>
        <rect x="14" y="102" width="36" height="6" rx="2" fill="#d1d5db"/>
        <rect x="92" y="58" width="92" height="56" rx="8" fill="white"/>
        <rect x="100" y="68" width="40" height="6" rx="2" fill="#9ca3af"/>
        <rect x="100" y="84" width="52" height="14" rx="3" fill="#111827"/>
        <rect x="100" y="104" width="20" height="4" rx="1" fill="${c}"/>
        <rect x="192" y="58" width="92" height="56" rx="8" fill="white"/>
        <rect x="200" y="68" width="40" height="6" rx="2" fill="#9ca3af"/>
        <rect x="200" y="84" width="52" height="14" rx="3" fill="#111827"/>
        <rect x="200" y="104" width="20" height="4" rx="1" fill="${c}"/>
        <rect x="292" y="58" width="92" height="56" rx="8" fill="white"/>
        <rect x="300" y="68" width="40" height="6" rx="2" fill="#9ca3af"/>
        <rect x="300" y="84" width="52" height="14" rx="3" fill="#111827"/>
        <rect x="300" y="104" width="20" height="4" rx="1" fill="${c}"/>
        <rect x="92" y="124" width="292" height="100" rx="8" fill="white"/>
        <rect x="100" y="134" width="276" height="20" fill="#f9fafb"/>
        <rect x="100" y="158" width="276" height="22" fill="white"/>
        <rect x="100" y="180" width="276" height="22" fill="${c}" opacity="0.06"/>
        <rect x="100" y="202" width="276" height="22" fill="white"/>
      </svg>`;
    }
    if (mode === 'mobile') {
      return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mg-${mode}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${c}" stop-opacity="0.10"/>
            <stop offset="100%" stop-color="${c}" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#mg-${mode})"/>
        <rect x="155" y="14" width="90" height="212" rx="22" fill="#0a0a0a"/>
        <rect x="161" y="20" width="78" height="200" rx="18" fill="white"/>
        <rect x="180" y="24" width="40" height="6" rx="3" fill="#1f2937"/>
        <rect x="171" y="42" width="58" height="14" rx="3" fill="#111827"/>
        <rect x="171" y="62" width="58" height="48" rx="10" fill="${c}"/>
        <rect x="178" y="74" width="32" height="4" rx="2" fill="white" opacity="0.6"/>
        <rect x="178" y="84" width="44" height="10" rx="3" fill="white"/>
        <rect x="178" y="100" width="28" height="4" rx="2" fill="white" opacity="0.5"/>
        <rect x="171" y="118" width="58" height="22" rx="6" fill="#f3f4f6"/>
        <rect x="178" y="124" width="6" height="10" rx="1" fill="${c}"/>
        <rect x="188" y="126" width="36" height="6" rx="2" fill="#9ca3af"/>
        <rect x="171" y="146" width="58" height="22" rx="6" fill="#f3f4f6"/>
        <rect x="171" y="174" width="58" height="22" rx="6" fill="#f3f4f6"/>
        <rect x="171" y="202" width="58" height="14" rx="3" fill="#f9fafb"/>
        <circle cx="183" cy="209" r="3" fill="${c}"/>
        <circle cx="200" cy="209" r="3" fill="#d1d5db"/>
        <circle cx="217" cy="209" r="3" fill="#d1d5db"/>
      </svg>`;
    }
    if (mode === 'docs') {
      return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="240" fill="#f8f9fa"/>
        <rect x="0" y="0" width="400" height="32" fill="white"/>
        <rect x="20" y="44" width="76" height="180" fill="white"/>
        <rect x="30" y="60" width="56" height="8" rx="2" fill="#111827"/>
        <rect x="30" y="78" width="44" height="6" rx="2" fill="${c}"/>
        <rect x="30" y="92" width="50" height="6" rx="2" fill="#9ca3af"/>
        <rect x="30" y="106" width="40" height="6" rx="2" fill="#9ca3af"/>
        <rect x="30" y="124" width="56" height="8" rx="2" fill="#111827"/>
        <rect x="30" y="142" width="44" height="6" rx="2" fill="#9ca3af"/>
        <rect x="30" y="156" width="50" height="6" rx="2" fill="#9ca3af"/>
        <rect x="108" y="56" width="204" height="14" rx="3" fill="#111827"/>
        <rect x="108" y="76" width="180" height="8" rx="2" fill="#9ca3af"/>
        <rect x="108" y="90" width="160" height="8" rx="2" fill="#9ca3af"/>
        <rect x="108" y="112" width="204" height="48" rx="8" fill="#0a0a0a"/>
        <rect x="118" y="122" width="80" height="6" rx="2" fill="#86efac"/>
        <rect x="118" y="134" width="120" height="6" rx="2" fill="#93c5fd"/>
        <rect x="118" y="146" width="60" height="6" rx="2" fill="#fcd34d"/>
        <rect x="108" y="172" width="204" height="6" rx="2" fill="#9ca3af"/>
        <rect x="108" y="184" width="160" height="6" rx="2" fill="#9ca3af"/>
        <rect x="324" y="56" width="60" height="120" fill="white"/>
        <rect x="332" y="68" width="44" height="5" rx="2" fill="${c}"/>
        <rect x="332" y="80" width="40" height="4" rx="2" fill="#9ca3af"/>
        <rect x="332" y="90" width="36" height="4" rx="2" fill="#9ca3af"/>
      </svg>`;
    }
    return '';
  }

  function renderCard(c) {
    const pagePills = c.pages.map(p => `<span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/70 border border-gray-200 text-gray-600">${escapeHtml(p)}</span>`).join('');
    return `
      <a class="case-card fade-up group" href="gallery/${c.mode}/index.html" data-mode="${c.mode}">
        <div class="case-card__cover bg-gradient-to-br ${c.gradient}">
          ${mockupSvg(c.mode, c.accentColor)}
        </div>
        <div class="case-card__meta">
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-${c.tagColor}-50 border border-${c.tagColor}-100 text-[11px] font-semibold text-${c.tagColor}-700 uppercase tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full bg-${c.tagColor}-500"></span>
              ${escapeHtml(c.tag)}
            </span>
            <span class="text-[11px] text-gray-400 font-mono">${c.pages.length} pages</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2 tracking-tight">${escapeHtml(c.title)}</h3>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">${escapeHtml(c.desc)}</p>
          <div class="flex flex-wrap items-center gap-1.5 mb-5">${pagePills}</div>
          <span class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-2.5 transition-all">
            Open demo
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>
      </a>
    `;
  }

  function renderAll() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = CASES.map(renderCard).join('');
    // After render, trigger fade-up observer for any new .fade-up cards
    const cards = grid.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
      cards.forEach(function (c) { io.observe(c); });
    } else {
      cards.forEach(function (c) { c.classList.add('is-visible'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
})();
