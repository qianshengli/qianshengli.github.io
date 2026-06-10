/* ===== Universal Product Design — SaaS Dashboard JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Tab Switching (Settings Page) ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Deactivate all
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Activate clicked
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Mobile Sidebar Toggle ---------- */
  const sidebar       = document.querySelector('.sidebar');
  const menuToggleBtn = document.getElementById('menu-toggle');
  const overlay        = document.getElementById('sidebar-overlay');

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  /* ---------- Notification Bell Interaction ---------- */
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      const dot = notifBtn.querySelector('.notification-dot');
      if (dot) {
        dot.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
        setTimeout(() => dot.remove(), 200);
      }
    });
  }

  /* ---------- Search Focus Shortcut (Cmd+K / Ctrl+K) ---------- */
  const searchInput = document.querySelector('.topnav-search input');
  if (searchInput) {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  /* ---------- Filter Chip Toggle ---------- */
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      if (chip.classList.contains('active')) {
        chip.style.borderColor = '#2563EB';
        chip.style.color = '#2563EB';
        chip.style.background = '#eff6ff';
      } else {
        chip.style.borderColor = '';
        chip.style.color = '';
        chip.style.background = '';
      }
    });
  });

  /* ---------- Pagination Buttons ---------- */
  const pageBtns = document.querySelectorAll('.page-btn');
  pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---------- Toast Notification Helper ---------- */
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 32px;
      right: 32px;
      padding: 14px 24px;
      border-radius: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #fff;
      background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563EB'};
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      z-index: 9999;
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.3s cubic-bezier(.4,0,.2,1);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /* ---------- Settings Form Save ---------- */
  const saveBtn = document.getElementById('save-settings');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Settings saved successfully');
    });
  }

  const cancelBtn = document.getElementById('cancel-settings');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('.form-input');
      inputs.forEach(input => {
        if (input.defaultValue !== undefined) {
          input.value = input.defaultValue;
        }
      });
      showToast('Changes discarded', 'info');
    });
  }

});
