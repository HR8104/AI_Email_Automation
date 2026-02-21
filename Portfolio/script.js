/* ==================== LOADER ==================== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

/* ==================== SHOW MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SHOW SCROLL TOP ==================== */
function scrollTop() {
    const scrollTop = document.getElementById('scrolltop');
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/* ==================== ANIMATED COUNTERS ==================== */
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.hero__stats');
let started = false;

function startCount(el) {
    let target = el.dataset.target;
    let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == target) {
            clearInterval(count);
        }
    }, 2000 / target);
}

const observerStats = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        stats.forEach((num) => startCount(num));
        started = true;
    }
}, { threshold: 0.5 });

if(statsSection) observerStats.observe(statsSection);

/* ==================== SCROLL REVEAL ANIMATION ==================== */
// Simple custom scroll reveal using Intersection Observer
const revealElements = document.querySelectorAll('.hero__content, .hero__image-wrapper, .about__data, .about__img-wrapper, .service__card, .portfolio__card, .process__item, .testimonial__card, .contact__info, .contact__form');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

// Add these styles dynamically for reveal
const style = document.createElement('style');
style.textContent = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal-visible {
        opacity: 1;
        transform: translateY(0);
    }
    .service__card:nth-child(2) { transition-delay: 0.1s; }
    .service__card:nth-child(3) { transition-delay: 0.2s; }
    .service__card:nth-child(4) { transition-delay: 0.3s; }
    
    .portfolio__card:nth-child(2) { transition-delay: 0.1s; }
    .portfolio__card:nth-child(3) { transition-delay: 0.2s; }
    
    .process__item:nth-child(2) { transition-delay: 0.1s; }
    .process__item:nth-child(3) { transition-delay: 0.2s; }
    .process__item:nth-child(4) { transition-delay: 0.3s; }
    .process__item:nth-child(5) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

/* ==================== FORM VALIDATION ==================== */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if(name && email && message) {
            // Simulate form submission
            formStatus.textContent = "Sending message...";
            formStatus.className = "form__status";
            
            setTimeout(() => {
                formStatus.textContent = "Success! We'll get back to you soon.";
                formStatus.className = "form__status success";
                contactForm.reset();
            }, 1000);
        } else {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.className = "form__status error";
        }
    });
}
