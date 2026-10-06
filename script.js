/**
 * SMART SOLUTION BD - INTERACTIVE SCRIPTS
 * Domain: smart-solutionbd.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Particle Canvas
  initParticles();

  // 2. Initialize Countdown Timer
  initCountdown();

  // 3. Initialize Subscribe Notification Form
  initSubscribeForm();
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

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 70);
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
          const alpha = (1 - dist / 130) * 0.16;
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

  // Target date: 14 days out, persisted in localStorage
  let targetTime = localStorage.getItem('smart_solution_target_launch');
  if (!targetTime) {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    launchDate.setHours(12, 0, 0, 0);
    targetTime = launchDate.getTime();
    localStorage.setItem('smart_solution_target_launch', targetTime);
  } else {
    targetTime = parseInt(targetTime, 10);
  }

  function updateCountdown() {
    const now = new Date().getTime();
    let difference = targetTime - now;

    if (difference <= 0) {
      difference = 3600 * 24 * 7 * 1000;
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
   SUBSCRIBE NOTIFICATION FORM
   ========================================================================== */
function initSubscribeForm() {
  const subForm = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const subBtn = document.getElementById('subscribe-btn');
  const formFeedback = document.getElementById('form-feedback');

  if (!subForm || !emailInput || !subBtn) return;

  subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      showFeedback(formFeedback, 'Please enter a valid email address.', 'error');
      return;
    }

    const originalText = subBtn.innerHTML;
    subBtn.disabled = true;
    subBtn.innerHTML = '<span>Saving...</span>';

    setTimeout(() => {
      const subscribers = JSON.parse(localStorage.getItem('smart_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('smart_subscribers', JSON.stringify(subscribers));
      }

      subBtn.disabled = false;
      subBtn.innerHTML = originalText;
      emailInput.value = '';

      showFeedback(formFeedback, '🎉 Priority Access Confirmed! We will notify you when we go live.', 'success');
      showToast('Success! You are on our launch notification list.');
    }, 600);
  });

  function showFeedback(element, msg, type) {
    if (!element) return;
    element.textContent = msg;
    element.className = `form-feedback ${type}`;
    setTimeout(() => {
      element.textContent = '';
      element.className = 'form-feedback';
    }, 6000);
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:#10b981;font-weight:700;">✓</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
