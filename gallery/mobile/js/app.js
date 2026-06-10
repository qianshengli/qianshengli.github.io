/* ========================================
   Universal Product Design — Mobile App
   Shared JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Bottom Sheet ----------
  const backdrop = document.getElementById('bottomSheetBackdrop');
  const sheet    = document.getElementById('bottomSheet');

  window.openBottomSheet = function () {
    if (!backdrop || !sheet) return;
    backdrop.classList.add('active');
    sheet.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeBottomSheet = function () {
    if (!backdrop || !sheet) return;
    sheet.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close on backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', closeBottomSheet);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBottomSheet();
  });


  // ---------- Segmented Control ----------
  const segmentedControls = document.querySelectorAll('.segmented-control');

  segmentedControls.forEach(control => {
    const buttons = control.querySelectorAll('.segment-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons in this control
        buttons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        // Dispatch custom event with the selected value
        const event = new CustomEvent('segmentChange', {
          detail: { value: btn.dataset.value },
          bubbles: true
        });
        control.dispatchEvent(event);
      });
    });
  });


  // ---------- Filter Chips ----------
  const chipContainers = document.querySelectorAll('.chip-group');

  chipContainers.forEach(container => {
    const chips = container.querySelectorAll('.chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Remove active from all chips in this group
        chips.forEach(c => c.classList.remove('chip-active'));
        // Add active to clicked chip
        chip.classList.add('chip-active');

        const event = new CustomEvent('chipChange', {
          detail: { value: chip.dataset.value },
          bubbles: true
        });
        container.dispatchEvent(event);
      });
    });
  });


  // ---------- Ripple Effect ----------
  document.querySelectorAll('[data-ripple]').forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(37, 99, 235, 0.12);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.5s ease-out forwards;
        pointer-events: none;
      `;

      this.style.position = this.style.position || 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframes
  if (!document.getElementById('rippleStyles')) {
    const style = document.createElement('style');
    style.id = 'rippleStyles';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

});
