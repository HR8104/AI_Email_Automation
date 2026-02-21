/* =============================================================
   EMBER & ASH — RESTAURANT LANDING PAGE
   script.js — All interactive features
   ============================================================= */

'use strict';

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initMenuSection();
  initScrollAnimations();
  initTestimonialSlider();
  initReservationForm();
  initBackToTop();
  initActiveNavLink();
});

/* ============================================================
   0. THEME SWITCHER
   ============================================================ */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc  = document.querySelector('.hero-desc');
  const heroBg    = document.querySelector('.hero-bg');
  const heroTag   = document.querySelector('.hero-tag');
  const heroBtns  = document.querySelectorAll('.hero-btns .btn');

  if (!heroTitle || !heroDesc || !heroBg || !heroTag) return;

  if (theme === 'dark') {
    // Fine Dining Version
    heroTag.innerHTML = '✦ Award Winning Restaurant';
    heroTitle.innerHTML = 'Experience Taste<br /><span class="hero-accent">Like Never Before</span>';
    heroDesc.textContent = 'Indulge in a symphony of flavours crafted by world-class chefs using the freshest locally-sourced ingredients. Every dish tells a story.';
    heroBg.src = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80';
    heroBg.alt = 'Fine dining restaurant atmosphere';
    
    // Update Buttons Content
    if (heroBtns[0]) heroBtns[0].innerHTML = '<i class="fas fa-utensils"></i> View Menu';
    if (heroBtns[1]) heroBtns[1].innerHTML = '<i class="fas fa-calendar-check"></i> Book a Table';
  } else {
    // Minimal Café Version
    heroTag.innerHTML = 'Crafted with Care · Est. 2009';
    heroTitle.innerHTML = 'Where Every Sip<br />Tells a <span class="hero-accent">Story</span>';
    heroDesc.textContent = 'Slow mornings, honest flavours, and a space that feels like home. Come as you are — stay as long as you like.';
    heroBg.src = 'https://images.unsplash.com/photo-1504754524776-8f4f69903799?w=1920&q=80';
    heroBg.alt = 'Bright and inviting cafe interior with coffee and pastries';

    // Update Buttons Content
    if (heroBtns[0]) heroBtns[0].innerHTML = '<i class="fas fa-mug-hot"></i> Explore Menu';
    if (heroBtns[1]) heroBtns[1].innerHTML = '<i class="fas fa-calendar-alt"></i> Reserve a Table';
  }
}

/* ============================================================
   1. STICKY NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on load
}

/* ============================================================
   2. MOBILE HAMBURGER MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  // Toggle menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close when a link is clicked
  navLinks.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on backdrop click (click outside menu)
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   3. SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


/* ============================================================
   5. MENU SECTION — DATA + TABS
   ============================================================ */
const menuItems = [
  {
    id: 1,
    name: 'Truffle Mushroom Risotto',
    desc: 'Creamy Arborio rice with wild mushrooms, shaved truffle & parmesan',
    price: '₹ 649',
    category: 'mains',
    tag: 'Chef\'s Pick',
    img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80',
  },
  {
    id: 2,
    name: 'Crispy Calamari',
    desc: 'Golden-fried squid rings with lemon aioli & house spice blend',
    price: '₹ 399',
    category: 'starters',
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80',
  },
  {
    id: 3,
    name: 'Chocolate Lava Cake',
    desc: 'Warm dark chocolate fondant with vanilla bean ice cream',
    price: '₹ 349',
    category: 'desserts',
    tag: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
  },
  {
    id: 4,
    name: 'Grilled Salmon Fillet',
    desc: 'Herb-crusted Atlantic salmon with roasted asparagus & lemon butter',
    price: '₹ 899',
    category: 'mains',
    tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
  },
  {
    id: 5,
    name: 'Burrata Caprese',
    desc: 'Fresh burrata, heirloom tomatoes, fresh basil & aged balsamic',
    price: '₹ 449',
    category: 'starters',
    tag: 'Fresh',
    img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&q=80',
  },
  {
    id: 6,
    name: 'Mango Panna Cotta',
    desc: 'Silky vanilla panna cotta topped with fresh Alphonso mango coulis',
    price: '₹ 299',
    category: 'desserts',
    tag: 'Seasonal',
    img: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=500&q=80',
  },
];

function initMenuSection() {
  const grid    = document.getElementById('menuGrid');
  const tabs    = document.querySelectorAll('.menu-tab');
  if (!grid || !tabs.length) return;

  function renderMenu(filter) {
    const filtered = filter === 'all'
      ? menuItems
      : menuItems.filter(item => item.category === filter);

    grid.innerHTML = '';
    filtered.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'menu-card fade-up';
      card.style.transitionDelay = `${i * 80}ms`;
      card.innerHTML = `
        <div class="menu-img-wrap">
          <img src="${item.img}" alt="${item.name}" loading="lazy" />
          <span class="menu-badge-tag">${item.tag}</span>
        </div>
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-price">${item.price}</span>
            <button class="menu-add-btn" aria-label="Add ${item.name} to order">+</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Trigger fade-up animations on newly rendered cards
    requestAnimationFrame(() => {
      grid.querySelectorAll('.fade-up').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 50);
      });
    });
  }

  // Tab click handler
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.dataset.category);
    });
  });

  // Initial render
  renderMenu('all');
}

/* ============================================================
   6. SCROLL ANIMATIONS (FADE-UP)
   ============================================================ */
function initScrollAnimations() {
  const adds = [
    ...document.querySelectorAll('.offer-card'),
    ...document.querySelectorAll('.gallery-item'),
    ...document.querySelectorAll('.feature-item'),
    ...document.querySelectorAll('.info-item'),
  ];

  adds.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ============================================================
   7. TESTIMONIAL SLIDER
   ============================================================ */
function initTestimonialSlider() {
  const slider  = document.getElementById('testimonialSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('sliderDots');
  if (!slider || !prevBtn || !nextBtn || !dotsWrap) return;

  const cards = slider.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    dotsWrap.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = (index + total) % total;
    slider.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', () => { clearInterval(autoTimer); prev(); startAuto(); });
  nextBtn.addEventListener('click', () => { clearInterval(autoTimer); next(); startAuto(); });

  // Touch/Swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      clearInterval(autoTimer);
      diff > 0 ? next() : prev();
      startAuto();
    }
  });

  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }

  startAuto();
}

/* ============================================================
   8. RESERVATION FORM VALIDATION
   ============================================================ */
function initReservationForm() {
  const form      = document.getElementById('reservationForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');
  if (!form) return;

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    ['nameError','emailError','dateError','timeError','guestsError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const name    = form.guestName.value.trim();
    const email   = form.guestEmail.value.trim();
    const date    = form.guestDate.value;
    const time    = form.guestTime.value;
    const guests  = form.guestCount.value;

    if (name.length < 2) { showError('nameError', 'Please enter your full name.'); valid = false; }
    if (!validateEmail(email)) { showError('emailError', 'Please enter a valid email address.'); valid = false; }
    if (!date) {
      showError('dateError', 'Please select a date.');
      valid = false;
    } else {
      const selected = new Date(date);
      const today    = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) { showError('dateError', 'Date cannot be in the past.'); valid = false; }
    }
    if (!time) { showError('timeError', 'Please select a time.'); valid = false; }
    if (!guests) { showError('guestsError', 'Please select number of guests.'); valid = false; }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate async submission
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = true;
    btnText.style.display    = 'none';
    btnLoading.style.display = 'flex';

    await new Promise(resolve => setTimeout(resolve, 1800));

    form.reset();
    submitBtn.disabled = false;
    btnText.style.display    = 'flex';
    btnLoading.style.display = 'none';
    form.style.display = 'none';
    success.style.display = 'flex';

    // Reset after 6 seconds
    setTimeout(() => {
      success.style.display = 'none';
      form.style.display    = 'flex';
    }, 6000);
  });

  // Live validation feedback
  ['guestName','guestEmail','guestDate','guestTime','guestCount'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', () => {
        const errId = {
          guestName: 'nameError',
          guestEmail: 'emailError',
          guestDate: 'dateError',
          guestTime: 'timeError',
          guestCount: 'guestsError',
        }[fieldId];
        const el = document.getElementById(errId);
        if (el && field.value.trim()) el.textContent = '';
      });
    }
  });
}

/* ============================================================
   9. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   10. ACTIVE NAV LINK ON SCROLL
   ============================================================ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
}
