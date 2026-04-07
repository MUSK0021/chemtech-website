document.addEventListener('DOMContentLoaded', () => {

  // ─── SCROLL REVEAL ANIMATIONS ─────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ─── NAVBAR SCROLL EFFECT ─────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ─── MOBILE MENU ──────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar__links');
  if (hamburger && navLinks) {
    // Create overlay backdrop
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);

    // Inject phone link into mobile drawer if not already present
    if (!navLinks.querySelector('.mobile-nav-phone')) {
      const phoneLink = document.createElement('a');
      phoneLink.href = 'tel:4022156542';
      phoneLink.className = 'mobile-nav-phone';
      phoneLink.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>(402) 215-6542`;
      navLinks.appendChild(phoneLink);
    }

    const openMenu = () => {
      navLinks.classList.add('mobile-open');
      hamburger.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
      navLinks.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a:not(.nav-dropdown__trigger)').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ─── FAQ ACCORDION ────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ─── PEST LIBRARY FILTER ──────────────────────────────
  const pestFilters = document.querySelectorAll('.pest-filter');
  const pestCards = document.querySelectorAll('.pest-card');
  pestFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      pestFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      const category = filter.dataset.category;
      pestCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ─── URGENCY SELECTOR ─────────────────────────────────
  document.querySelectorAll('.urgency-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.urgency-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // ─── SMOOTH SCROLL ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── PARALLAX HERO ────────────────────────────────────
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
    }, { passive: true });
  }

  // ─── TYPEWRITER for hero ──────────────────────────────
  const typeEl = document.querySelector('[data-typewriter]');
  if (typeEl) {
    const words = JSON.parse(typeEl.dataset.typewriter);
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
      const current = words[wordIndex];
      if (deleting) {
        typeEl.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(type, 500); return; }
      } else {
        typeEl.textContent = current.substring(0, ++charIndex);
        if (charIndex === current.length) { deleting = true; setTimeout(type, 2000); return; }
      }
      setTimeout(type, deleting ? 50 : 100);
    };
    setTimeout(type, 1000);
  }

});

// CSS animation keyframe injected
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
