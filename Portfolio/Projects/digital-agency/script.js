/**
 * NexaGrow - Digital Marketing Agency
 * Main JavaScript File
 */

"use strict";

// ============================================================
// PARTICLE CANVAS
// ============================================================
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.opacity})`;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    animId = requestAnimationFrame(drawParticles);
  }

  resize();
  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
})();

// ============================================================
// STICKY NAVBAR
// ============================================================
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
(function initActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((sec) => observer.observe(sec));
})();

// ============================================================
// MOBILE HAMBURGER MENU
// ============================================================
(function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open")
      ? "hidden"
      : "";
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
})();

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
(function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".service-card, .portfolio-card, .pricing-card, .testimonial-card, " +
      ".about-content, .about-visual, .contact-info, .contact-form, " +
      ".section-header, .stat-box",
  );

  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger animations for grid items
          const delay = entry.target.closest(
            ".services-grid, .portfolio-grid, .pricing-grid, .stats-grid",
          )
            ? Array.from(entry.target.parentElement.children).indexOf(
                entry.target,
              ) * 100
            : 0;
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((el) => observer.observe(el));
})();

// ============================================================
// ANIMATED COUNTER (ABOUT SECTION)
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll(".stat-box-num");
  if (!counters.length) return;

  const animateCount = (el, target, duration = 1800) => {
    let start = 0;
    const step = target / (duration / 16);
    const update = () => {
      start = Math.min(start + step, target);
      el.textContent = Math.round(start);
      if (start < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCount(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
})();

// ============================================================
// TESTIMONIAL SLIDER
// ============================================================
(function initTestimonialSlider() {
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  const dots = document.querySelectorAll(".dot");
  if (!track || !prevBtn || !nextBtn) return;

  let current = 0;
  const total = track.children.length;
  let autoplayTimer;

  const goTo = (index) => {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  };

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => goTo(current + 1), 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  nextBtn.addEventListener("click", () => {
    goTo(current + 1);
    resetAutoplay();
  });
  prevBtn.addEventListener("click", () => {
    goTo(current - 1);
    resetAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.index, 10));
      resetAutoplay();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAutoplay();
    }
  });

  goTo(0);
  startAutoplay();
})();

// ============================================================
// CONTACT FORM VALIDATION
// ============================================================
(function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    fname: {
      el: document.getElementById("fname"),
      err: document.getElementById("fnameError"),
      label: "Name",
    },
    femail: {
      el: document.getElementById("femail"),
      err: document.getElementById("femailError"),
      label: "Email",
    },
    fmessage: {
      el: document.getElementById("fmessage"),
      err: document.getElementById("fmessageError"),
      label: "Message",
    },
  };
  const successMsg = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (key) => {
    const { el, err, label } = fields[key];
    const value = el.value.trim();
    let message = "";

    if (!value) {
      message = `${label} is required.`;
    } else if (key === "femail" && !isValidEmail(value)) {
      message = "Please enter a valid email address.";
    } else if (key === "fname" && value.length < 2) {
      message = "Name must be at least 2 characters.";
    } else if (key === "fmessage" && value.length < 20) {
      message = "Message must be at least 20 characters.";
    }

    err.textContent = message;
    el.classList.toggle("error", !!message);
    return !message;
  };

  // Inline validation on blur
  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("blur", () => validateField(key));
    fields[key].el.addEventListener("input", () => {
      if (fields[key].err.textContent) validateField(key);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const isValid = Object.keys(fields).every((key) => validateField(key));
    if (!isValid) return;

    // Simulate submission
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";

    await new Promise((resolve) => setTimeout(resolve, 1500));

    submitBtn.disabled = false;
    btnText.textContent = "Send Message 🚀";
    successMsg.style.display = "block";
    form.reset();

    setTimeout(() => {
      successMsg.style.display = "none";
    }, 5000);
  });
})();

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById("navbar")?.offsetHeight || 80;
      const targetY =
        target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  });
});
