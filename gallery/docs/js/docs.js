/* ===== Antigravity Docs — Shared JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ScrollSpy for On-Page TOC ---------- */
  const tocLinks = document.querySelectorAll('.toc-link');
  const tocTargets = [];

  tocLinks.forEach(link => {
    const id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      const target = document.getElementById(id.slice(1));
      if (target) tocTargets.push({ el: target, link });
    }
  });

  function updateScrollSpy() {
    const scrollY = window.scrollY;
    let current = null;

    for (const item of tocTargets) {
      const rect = item.el.getBoundingClientRect();
      const offset = rect.top + window.scrollY - 100;
      if (scrollY >= offset) current = item;
    }

    tocLinks.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  if (tocTargets.length) {
    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();
  }


  /* ---------- Code Tab Switching ---------- */
  document.querySelectorAll('.code-block').forEach(block => {
    const tabs = block.querySelectorAll('.code-tab');
    const panels = block.querySelectorAll('.code-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });

      tab.addEventListener('keydown', (e) => {
        const idx = Array.from(tabs).indexOf(tab);
        let next;
        if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
        if (next) { next.click(); next.focus(); e.preventDefault(); }
      });
    });
  });


  /* ---------- Copy Button ---------- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.code-content') || btn.closest('.code-block');
      const activePanel = block.querySelector('.code-panel.active pre') || block.querySelector('pre');
      if (!activePanel) return;

      const text = activePanel.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        const icon = btn.querySelector('.copy-icon');
        const check = btn.querySelector('.check-icon');
        if (icon) icon.style.display = 'none';
        if (check) check.style.display = 'block';

        setTimeout(() => {
          btn.classList.remove('copied');
          if (icon) icon.style.display = 'block';
          if (check) check.style.display = 'none';
        }, 2000);
      }).catch(() => {
        /* Fallback for older browsers */
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
      });
    });
  });


  /* ---------- Mobile Sidebar Toggle ---------- */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }


  /* ---------- Feedback Widget ---------- */
  document.querySelectorAll('.feedback-widget').forEach(widget => {
    const btns = widget.querySelectorAll('.feedback-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        setTimeout(() => {
          widget.classList.add('submitted');
        }, 300);
      });
    });
  });


  /* ---------- Keyboard shortcut for search (Ctrl/Cmd + K) ---------- */
  const searchInput = document.querySelector('.topbar-search input');
  if (searchInput) {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.blur();
      }
    });
  }

});
