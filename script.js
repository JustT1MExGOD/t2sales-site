// Intro loader
window.addEventListener('load', () => {
  const loader = document.getElementById('introLoader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 1100);
  }, 700);
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const spotlight = document.getElementById('spotlight');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let hasMoved = false;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!hasMoved) {
    hasMoved = true;
    spotlight?.classList.add('active');
  }
  spotlight?.style.setProperty('--mx', mouseX + 'px');
  spotlight?.style.setProperty('--my', mouseY + 'px');
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

// Magnetic buttons + 3D tilt — pointer devices only, respects reduced motion
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  function addMagnetic(el, strength = 0.14) {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  }
  document.querySelectorAll('.cta-primary, .cta-secondary, .dl-btn, .btn-nav').forEach(el => addMagnetic(el));

  function addTilt(el, maxTilt = 7) {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateZ(4px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  }
  document.querySelectorAll('.panel-card, .h-visual').forEach(el => addTilt(el, 3.5));
  document.querySelectorAll('.faq-shot').forEach(el => addTilt(el, 5));
}

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

const particles = Array.from({ length: 22 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.12,
  vy: (Math.random() - 0.5) * 0.12,
  r: Math.random() * 1 + 0.3
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
    ctx.fillStyle = 'rgba(61,158,255,0.14)';
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Scroll effects
const showreelSection = document.querySelector('.showreel-section');
const showreelTrack = document.querySelector('.showreel-track');
const showreelItems = document.querySelectorAll('.showreel-item');
const horizontalSection = document.querySelector('.horizontal-section');
const horizontalTrack = document.querySelector('.horizontal-track');
const wordCycleSection = document.querySelector('.word-cycle-section');
const wordCycleWords = document.querySelectorAll('.word-cycle-word');
const wordCycleDots = document.querySelectorAll('.word-cycle-dots span');
const scrollProgressBar = document.getElementById('scrollProgressBar');

let ticking = false;
const isMobileLayout = () => window.matchMedia('(max-width: 900px)').matches;

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const winH = window.innerHeight;
  const mobile = isMobileLayout();

  if (!mobile && showreelSection && showreelTrack) {
    const rect = showreelSection.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const sectionHeight = showreelSection.offsetHeight - winH;
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
      const maxTranslate = Math.max(0, showreelTrack.scrollWidth - window.innerWidth + 100);
      showreelTrack.style.transform = `translateX(-${progress * maxTranslate}px)`;
    }
    const center = window.innerWidth / 2;
    showreelItems.forEach(item => {
      const r = item.getBoundingClientRect();
      const itemCenter = r.left + r.width / 2;
      const dist = Math.min(1, Math.abs(itemCenter - center) / (window.innerWidth * 0.6));
      const scale = 1 - dist * 0.16;
      const rotate = ((itemCenter - center) / window.innerWidth) * -14;
      item.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
      item.style.opacity = 1 - dist * 0.5;
    });
  }

  if (!mobile && horizontalSection && horizontalTrack) {
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
  if (!mobile && wordCycleSection && wordCycleWords.length) {
    const rect = wordCycleSection.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const sectionHeight = wordCycleSection.offsetHeight - winH;
    const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
    const i = Math.min(wordCycleWords.length - 1, Math.floor(progress * wordCycleWords.length));
    wordCycleWords.forEach((wEl, idx) => wEl.classList.toggle('active', idx === i));
    wordCycleDots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  if (scrollProgressBar) {
    const docH = document.documentElement.scrollHeight - winH;
    const pct = docH > 0 ? Math.min(100, Math.max(0, (scrollY / docH) * 100)) : 0;
    scrollProgressBar.style.width = pct + '%';
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

// Word cycle — simple auto-advance on mobile (scroll-jacking is unreliable there)
if (isMobileLayout() && wordCycleWords.length) {
  const wcObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      let i = 0;
      wordCycleWords.forEach((w, idx) => w.classList.toggle('active', idx === 0));
      wordCycleDots.forEach((d, idx) => d.classList.toggle('active', idx === 0));
      setInterval(() => {
        i = (i + 1) % wordCycleWords.length;
        wordCycleWords.forEach((w, idx) => w.classList.toggle('active', idx === i));
        wordCycleDots.forEach((d, idx) => d.classList.toggle('active', idx === i));
      }, 1800);
      wcObserver.disconnect();
    });
  }, { threshold: 0.4 });
  if (wordCycleSection) wcObserver.observe(wordCycleSection);
}

// Form
document.getElementById('partnerForm')?.addEventListener('submit', e => {
  e.preventDefault();
  playClick();
  const data = new FormData(e.target);
  const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
  window.location.href = `mailto:vincere-mortem@inbox.ru?subject=Заявка на партнёрство T2 Sales&body=${encodeURIComponent(body)}`;
  e.target.reset();
});

// Animated count-up stats
const countEls = document.querySelectorAll('.stat-num[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.4 });
countEls.forEach(el => countObserver.observe(el));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// Header glass on scroll
const headerEl = document.querySelector('.header');
function updateHeader() {
  headerEl.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// NLP quick-entry demo widget
const nlpInput = document.getElementById('nlpInput');
if (nlpInput) {
  const numWords = {
    'один': 1, 'одна': 1, 'одну': 1, 'одно': 1,
    'два': 2, 'две': 2, 'три': 3, 'четыре': 4, 'пять': 5,
    'шесть': 6, 'семь': 7, 'восемь': 8, 'девять': 9, 'десять': 10
  };
  const patterns = [
    { key: 'Sim', re: /сим/ },
    { key: 'Mnp', re: /mnp|мнп/ },
    { key: 'Pa', re: /^па$|рассрочк/ },
    { key: 'Combo', re: /комбо/ }
  ];
  function wordToNum(tok) {
    if (!tok) return null;
    if (/^\d+$/.test(tok)) return parseInt(tok, 10);
    return numWords[tok] || null;
  }
  function nlpParse(text) {
    const result = { Sim: 0, Mnp: 0, Pa: 0, Combo: 0 };
    const tokens = text.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
    const numTokens = tokens
      .map((tok, pos) => ({ pos, num: wordToNum(tok) }))
      .filter(t => t.num !== null);
    const used = new Set();
    tokens.forEach((tok, idx) => {
      patterns.forEach(p => {
        if (!p.re.test(tok)) return;
        let best = null;
        numTokens.forEach(nt => {
          if (used.has(nt.pos)) return;
          const dist = Math.abs(nt.pos - idx);
          if (dist > 3) return;
          if (!best || dist < best.dist || (dist === best.dist && nt.pos < idx)) {
            best = { pos: nt.pos, num: nt.num, dist };
          }
        });
        if (best) used.add(best.pos);
        result[p.key] += best ? best.num : 1;
      });
    });
    return result;
  }
  function nlpUpdate() {
    const parsed = nlpParse(nlpInput.value);
    Object.keys(parsed).forEach(key => {
      const el = document.getElementById('nlp' + key);
      if (!el) return;
      const next = String(parsed[key]);
      if (el.textContent !== next) {
        el.textContent = next;
        el.classList.remove('pop');
        void el.offsetWidth;
        el.classList.add('pop');
      }
    });
  }
  nlpInput.addEventListener('input', nlpUpdate);

  function nlpAutoType(text, speed = 65) {
    let i = 0;
    const timer = setInterval(() => {
      nlpInput.value = text.slice(0, i + 1);
      nlpUpdate();
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
  }
  const nlpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nlpAutoType('две симки и один mnp');
        nlpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  nlpObserver.observe(nlpInput);
}

// Chapter tabs — highlight active chapter on scroll
const chapterTabs = document.querySelectorAll('.chapter-tab');
const chapterSections = document.querySelectorAll('[data-chapter]');
if (chapterTabs.length && chapterSections.length) {
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const chapter = entry.target.getAttribute('data-chapter');
        chapterTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.chapter === chapter));
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
  chapterSections.forEach(sec => chapterObserver.observe(sec));
}

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