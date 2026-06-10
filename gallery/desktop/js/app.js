// ============================================================
//  Universal Product Design — Shared Application JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initToggles();
  initTrafficLights();
  initAnimations();
});

// --- Toggle Switches ----------------------------------------
function initToggles() {
  document.querySelectorAll('.toggle-track').forEach(track => {
    // Set initial ARIA
    const isOn = track.classList.contains('on');
    track.setAttribute('role', 'switch');
    track.setAttribute('tabindex', '0');
    track.setAttribute('aria-checked', isOn);

    // Click handler
    track.addEventListener('click', () => toggleSwitch(track));

    // Keyboard handler (Enter / Space)
    track.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSwitch(track);
      }
    });
  });
}

function toggleSwitch(track) {
  const isOn = track.classList.toggle('on');
  track.setAttribute('aria-checked', isOn);

  // Optional label update
  const label = track.closest('.toggle-group')?.querySelector('.toggle-state');
  if (label) {
    label.textContent = isOn ? 'On' : 'Off';
  }

  // Fire custom event
  track.dispatchEvent(new CustomEvent('toggle:change', {
    bubbles: true,
    detail: { id: track.dataset.toggle, value: isOn }
  }));
}

// --- Traffic Lights -----------------------------------------
function initTrafficLights() {
  const close = document.querySelector('.traffic-light.close');
  const minimize = document.querySelector('.traffic-light.minimize');
  const maximize = document.querySelector('.traffic-light.maximize');

  close?.addEventListener('click', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity .2s ease';
    setTimeout(() => {
      // In a real Electron/Tauri app this would close the window
      console.log('[App] Window close requested');
    }, 200);
  });

  minimize?.addEventListener('click', () => {
    console.log('[App] Window minimize requested');
  });

  maximize?.addEventListener('click', () => {
    console.log('[App] Window maximize requested');
  });
}

// --- Staggered entry animations -----------------------------
function initAnimations() {
  const items = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
}

// --- Utility: show toast (optional) -------------------------
function showToast(message, duration = 2500) {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%) translateY(8px)',
    background: '#111827',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '500',
    boxShadow: '0 8px 24px rgba(0,0,0,.18)',
    opacity: '0',
    transition: 'all .25s ease',
    zIndex: '9999',
    pointerEvents: 'none',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
