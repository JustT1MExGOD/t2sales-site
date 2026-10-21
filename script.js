// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .dl-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Sound (Web Audio API)
let audioCtx = null;
let soundEnabled = false;

function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playTone(freq = 440, duration = 0.1, type = 'sine') {
  if (!soundEnabled || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = freq;
  osc.type = type;
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playClick() {
  playTone(800, 0.05, 'square');
}
function playHover() {
  playTone(1200, 0.03, 'sine');
}

// Ambient drone (optional)
let ambientOsc = null;
let ambientGain = null;

function startAmbient() {
  if (!audioCtx || ambientOsc) return;
  ambientOsc = audioCtx.createOscillator();
  ambientGain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 200;

  ambientOsc.type = 'sine';
  ambientOsc.frequency.value = 55;
  ambientGain.gain.value = 0.04;

  ambientOsc.connect(filter);
  filter.connect(ambientGain);
  ambientGain.connect(audioCtx.destination);
  ambientOsc.start();
}

function stopAmbient() {
  if (ambientOsc) {
    ambientGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      ambientOsc.stop();
      ambientOsc = null;
    }, 600);
  }
}

document.getElementById('soundToggle').addEventListener('click', () => {
  initAudio();
  soundEnabled = !soundEnabled;
  document.getElementById('soundToggle').classList.toggle('active', soundEnabled);
  if (soundEnabled) {
    playTone(600, 0.15);
    startAmbient();
  } else {
    stopAmbient();
  }
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', playHover);
  el.addEventListener('click', playClick);
});

// Particles
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = Array.from({ length: 50 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2,
  r: Math.random() * 1.2 + 0.3
}));

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(61,158,255,0.25)';
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Scroll effects
const showreelSection = document.querySelector('.showreel-section');
const showreelTrack = document.querySelector('.showreel-track');
const horizontalSection = document.querySelector('.horizontal-section');
const horizontalTrack = document.querySelector('.horizontal-track');

let ticking = false;
function updateScrollEffects() {
  const scrollY = window.scrollY;
  const winH = window.innerHeight;

  if (showreelSection && showreelTrack) {
    const rect = showreelSection.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const sectionHeight = showreelSection.offsetHeight - winH;
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
      const maxTranslate = Math.max(0, showreelTrack.scrollWidth - window.innerWidth + 100);
      showreelTrack.style.transform = `translateX(-${progress * maxTranslate}px)`;
    }
  }

  if (horizontalSection && horizontalTrack) {
    const rect = horizontalSection.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const sectionHeight = horizontalSection.offsetHeight - winH;
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
      const panels = horizontalTrack.children.length;
      const maxTranslate = (panels - 1) * window.innerWidth;
      horizontalTrack.style.transform = `translateX(-${progress * maxTranslate}px)`;
    }
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}, { passive: true });
updateScrollEffects();

// Form
document.getElementById('partnerForm')?.addEventListener('submit', e => {
  e.preventDefault();
  playClick();
  const data = new FormData(e.target);
  const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
  window.location.href = `mailto:vincere-mortem@inbox.ru?subject=Заявка на партнёрство T2 Sales&body=${encodeURIComponent(body)}`;
  e.target.reset();
});

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});