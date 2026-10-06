/**
 * SMART SOLUTION BD - INTERACTIVE SCRIPTS
 * Domain: smart-solutionbd.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Particle Canvas
  initParticles();

  // 2. Initialize Countdown Timer
  initCountdown();

  // 3. Initialize Live Dhaka Time Clock (BST, UTC+6)
  initDhakaClock();

  // 4. Initialize Forms & Modals
  initFormsAndModals();

  // 5. Initialize Quick Actions & Toasts
  initQuickActions();
});

/* ==========================================================================
   PARTICLE NETWORK CANVAS
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Set target date: 14 days from initial load (saved in localStorage for persistence)
  let targetTime = localStorage.getItem('smart_solution_target_launch');
  if (!targetTime) {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    launchDate.setHours(10, 0, 0, 0);
    targetTime = launchDate.getTime();
    localStorage.setItem('smart_solution_target_launch', targetTime);
  } else {
    targetTime = parseInt(targetTime, 10);
  }

  function updateCountdown() {
    const now = new Date().getTime();
    let difference = targetTime - now;

    if (difference <= 0) {
      difference = 3600 * 24 * 7 * 1000; // Reset if expired for demo
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   LIVE DHAKA SERVER CLOCK (BST, UTC+6)
   ========================================================================== */
function initDhakaClock() {
  const clockEl = document.getElementById('live-server-clock');
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Dhaka',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    clockEl.textContent = formatter.format(new Date()) + ' BST';
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   FORMS & MODAL BEHAVIOR
   ========================================================================== */
function initFormsAndModals() {
  // Subscribe Form
  const subForm = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const subBtn = document.getElementById('subscribe-btn');
  const formFeedback = document.getElementById('form-feedback');

  if (subForm && emailInput && subBtn) {
    subForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email || !email.includes('@')) {
        showFeedback(formFeedback, 'Please enter a valid email address.', 'error');
        return;
      }

      // Simulate loading state
      const originalText = subBtn.innerHTML;
      subBtn.disabled = true;
      subBtn.innerHTML = '<span>Saving...</span>';

      setTimeout(() => {
        // Save to localStorage list
        const subscribers = JSON.parse(localStorage.getItem('smart_subscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('smart_subscribers', JSON.stringify(subscribers));
        }

        subBtn.disabled = false;
        subBtn.innerHTML = originalText;
        emailInput.value = '';

        showFeedback(formFeedback, '🎉 Priority Access Confirmed! We will notify you when we go live.', 'success');
        showToast('Success! You are on our launch notification list.', 'toast-success');
      }, 700);
    });
  }

  function showFeedback(element, msg, type) {
    if (!element) return;
    element.textContent = msg;
    element.className = `form-feedback ${type}`;
    setTimeout(() => {
      element.textContent = '';
      element.className = 'form-feedback';
    }, 6000);
  }

  // Inquiry Modal Logic
  const modal = document.getElementById('inquiry-modal');
  const openBtn = document.getElementById('btn-open-inquiry');
  const launchBox = document.getElementById('launch-inquiry-box');
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('modal-cancel');
  const inquiryForm = document.getElementById('inquiry-form');

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const firstInput = document.getElementById('inq-name');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (launchBox) launchBox.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Inquiry Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('modal-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        inquiryForm.reset();
        closeModal();
        showToast('Inquiry received! Our team will reach you within 2 hours.', 'toast-success');
      }, 800);
    });
  }
}

/* ==========================================================================
   QUICK ACTIONS & TOAST MESSAGING
   ========================================================================== */
function initQuickActions() {
  // Copy Email Button
  const copyBtn = document.getElementById('btn-copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'info@smart-solutionbd.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', 'toast-info');
      }).catch(() => {
        showToast('Email: info@smart-solutionbd.com', 'toast-info');
      });
    });
  }
}

function showToast(message, typeClass = 'toast-info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${typeClass}`;
  toast.innerHTML = `
    <span class="toast-icon">${typeClass.includes('success') ? '✓' : 'ℹ'}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
