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

  // ─── PEST SLIDE-OUT PANEL ─────────────────────────────
  const pestData = {
    'american-cockroach': {
      icon: '🪳', name: 'American Cockroach', category: 'Roaches',
      severity: 'EXTREME', severityClass: 'severity--extreme',
      looks: 'Large, reddish-brown, 1.5–2 inches long with wings. Has a yellowish figure-eight pattern on the back of its head. One of the largest cockroach species found in homes.',
      found: 'Basements, sewers, floor drains, boiler rooms, and damp crawl spaces. Often enter homes through drains and gaps around pipes.',
      health: 'Triggers asthma and allergic reactions. Spreads bacteria including Salmonella and E. coli by contaminating food preparation surfaces and stored food.',
      treatment: 'Gel baiting in harborage areas, crack-and-crevice residual applications, drain treatments, and entry point exclusion to prevent re-infestation.'
    },
    'german-cockroach': {
      icon: '🪳', name: 'German Cockroach', category: 'Roaches',
      severity: 'EXTREME', severityClass: 'severity--extreme',
      looks: 'Small, light-brown with two dark parallel stripes running behind the head. About ½–⅝ inch long. The most common roach found indoors in Nebraska.',
      found: 'Kitchens, bathrooms, behind appliances, inside cabinets, and anywhere warm and moist. They cluster near food and water sources.',
      health: 'Carry 33 kinds of bacteria, 6 parasitic worms, and 7 human pathogens. A major asthma and allergy trigger, especially in children.',
      treatment: 'Combination of gel baits, insect growth regulators (IGRs), crack-and-crevice sprays, targeted vacuuming, and sanitation guidance.'
    },
    'brown-recluse': {
      icon: '🕷️', name: 'Brown Recluse Spider', category: 'Spiders',
      severity: 'HIGH', severityClass: 'severity--high',
      looks: 'Light to dark brown with a distinctive violin-shaped marking on its back. Body is ¼–¾ inch with long legs. Has six eyes in pairs rather than the usual eight.',
      found: 'Dark, undisturbed areas — woodpiles, closets, under furniture, inside cardboard boxes, and attics. They avoid human contact but bite when trapped against skin.',
      health: 'Venom can cause necrotic skin lesions requiring medical attention. Rarely life-threatening, but bites can result in serious tissue damage if left untreated.',
      treatment: 'Sticky traps for monitoring, targeted residual treatments in harborage areas, de-cluttering, and exterior exclusion to prevent entry.'
    },
    'carpenter-ants': {
      icon: '🐜', name: 'Carpenter Ants', category: 'Ants',
      severity: 'HIGH', severityClass: 'severity--high',
      looks: 'Large black or dark red ants, ½–⅝ inch long. No stinger but powerful mandibles. Workers are polymorphic — varying in size within the same colony.',
      found: 'Moist or decaying wood in window frames, roof eaves, attic beams, tree stumps, and wood piles. They tunnel through wood to build galleries, but do not eat it.',
      health: 'Rarely bite humans, but cause significant structural damage over time by hollowing out load-bearing wood for nesting.',
      treatment: 'Locating and directly treating the parent colony, void dusting, exterior perimeter residual treatments, and identifying and fixing moisture sources driving infestation.'
    },
    'fleas': {
      icon: '🦟', name: 'Fleas', category: 'Fleas',
      severity: 'HIGH', severityClass: 'severity--high',
      looks: 'Tiny (1/16–1/8 inch), dark reddish-brown, wingless with a hard flattened body and powerful hind legs capable of jumping 150× their body length.',
      found: 'Pet bedding, carpets, upholstered furniture, and shaded yard areas where animals rest. Eggs fall off pets and hatch throughout the home.',
      health: 'Cause intense itching and skin irritation. Can transmit tapeworms and murine typhus. Severe infestations can cause anemia in small pets.',
      treatment: 'Indoor carpet and upholstery treatments, IGR application to break the life cycle, yard perimeter spray, and coordination with veterinary flea prevention products.'
    },
    'bed-bugs': {
      icon: '🪲', name: 'Bed Bugs', category: 'Bed Bugs',
      severity: 'EXTREME', severityClass: 'severity--extreme',
      looks: 'Flat, oval, reddish-brown — roughly the size of an apple seed (4–5mm). After feeding they swell and deepen in color. Nymphs are nearly translucent.',
      found: 'Mattress seams, box springs, bed frames, headboards, furniture joints, electrical outlets, and behind baseboards. Spread through travel and secondhand furniture.',
      health: 'Bites cause red, itchy welts and can cause significant psychological distress and sleep deprivation. Not known to transmit disease, but infestations worsen rapidly.',
      treatment: 'AZEX-certified heat treatment raises the entire room to 120°F+ to kill all life stages. Combined with residual pesticide application and a follow-up inspection.'
    },
    'roof-rats': {
      icon: '🐀', name: 'Roof Rats', category: 'Rodents',
      severity: 'HIGH', severityClass: 'severity--high',
      looks: 'Slender, dark brown or black with a long tail exceeding body length. Large ears, pointed snout. About 13–18 inches total. More agile climbers than Norway rats.',
      found: 'Attics, rafters, trees, dense ivy, and upper parts of structures. Enter buildings through gaps as small as a half-inch near rooflines and utility penetrations.',
      health: 'Transmit leptospirosis, rat-bite fever, and salmonellosis. Contaminate food and chew through electrical wiring, creating fire hazards.',
      treatment: 'Snap traps and tamper-resistant bait stations, thorough exclusion sealing of all entry points, and trimming trees and vegetation away from structures.'
    },
    'house-mice': {
      icon: '🐭', name: 'House Mice', category: 'Rodents',
      severity: 'HIGH', severityClass: 'severity--high',
      looks: 'Small, gray-brown with large ears, a pointed snout, and a hairless tail roughly equal to body length. About 5–8 inches total. Can squeeze through a gap the size of a dime.',
      found: 'Wall voids, attics, kitchen cabinets, basements, and anywhere near food storage. One pair can produce up to 60 offspring per year.',
      health: 'Spread Hantavirus, Salmonella, and Listeria through droppings, urine, and nesting materials. Contaminate far more food than they consume.',
      treatment: 'Snap traps for active populations, bait stations for ongoing control, comprehensive exclusion sealing of all entry points, and sanitation consultation.'
    },
    'bees-wasps': {
      icon: '🐝', name: 'Bees & Wasps', category: 'Stinging Insects',
      severity: 'HIGH', severityClass: 'severity--high',
      looks: 'Varies by species — bumble bees are fuzzy and yellow-black; yellow jackets are sleek with narrow waists; paper wasps are slender with long dangling legs in flight.',
      found: 'Eaves, attic vents, wall cavities, ground burrows, decks, fences, and tree branches. Yellow jackets often nest underground or inside wall voids.',
      health: 'Painful stings can trigger anaphylactic shock in allergic individuals. Yellow jackets are aggressive when disturbed and can sting multiple times.',
      treatment: 'Nest removal at night when insects are least active, targeted insecticidal dust or foam application, and preventive sealing of entry points before nesting season.'
    },
    'flies': {
      icon: '🪰', name: 'Flies', category: 'Insects',
      severity: 'MEDIUM', severityClass: 'severity--medium',
      looks: 'House flies are gray, ¼ inch with red compound eyes. Blow flies are metallic blue or green. Fruit flies are tiny (1/8 inch) with distinctive red eyes.',
      found: 'Garbage, animal waste, rotting organic material, clogged drains, and anywhere food is exposed. Larvae (maggots) develop in decaying matter.',
      health: 'Carry over 100 pathogens including Salmonella, Typhoid, and E. coli. They regurgitate digestive fluids onto food before feeding, spreading contamination rapidly.',
      treatment: 'Source identification and elimination, commercial fly light traps, residual surface treatments, drain treatments for breeding sites, and exclusion screening.'
    },
    'termites': {
      icon: '🐛', name: 'Termites', category: 'Wood Destroyers',
      severity: 'EXTREME', severityClass: 'severity--extreme',
      looks: 'Small pale insects resembling ants. Swarmers have two equal-length wings that they shed. Workers are cream-colored and rarely seen. Often mistaken for flying ants.',
      found: 'Wood in contact with soil, crawl spaces, wall voids, window and door frames, and anywhere moisture meets structural wood. Subterranean termites build mud tubes.',
      health: 'No direct health risk, but cause catastrophic structural damage — averaging $3,000+ per affected home. Damage is rarely covered by homeowners insurance.',
      treatment: 'Liquid termiticide soil barrier treatments, bait station monitoring systems, and annual WDI inspections to detect colonies before damage becomes severe.'
    },
    'moles': {
      icon: '🦔', name: 'Moles', category: 'Yard Pests',
      severity: 'MEDIUM', severityClass: 'severity--medium',
      looks: 'Small velvety gray mammals with paddle-shaped front feet built for digging, tiny hidden eyes, no visible ears, and a pointed snout. About 6–8 inches long.',
      found: 'Lawns, gardens, golf courses, and any area with loose, moist soil rich in earthworms. Surface ridges and molehills are signs of their tunnel networks.',
      health: 'No direct health threat, but their tunnels collapse underfoot creating fall hazards, destroy grass root systems, and allow weeds to invade damaged turf.',
      treatment: 'Trapping is the most reliable method. Supplemented with mole repellent treatments, grub control to reduce food sources, and soil compaction where possible.'
    }
  };

  const pestPanel = document.getElementById('pestPanel');
  const pestOverlay = document.getElementById('pestOverlay');
  const pestPanelClose = document.getElementById('pestPanelClose');

  if (pestPanel && pestOverlay) {
    const openPanel = (pestKey) => {
      const d = pestData[pestKey];
      if (!d) return;
      document.getElementById('panelIcon').textContent = d.icon;
      document.getElementById('panelName').textContent = d.name;
      document.getElementById('panelCategory').textContent = d.category;
      const sev = document.getElementById('panelSeverity');
      sev.textContent = d.severity;
      sev.className = 'pest-panel__sev ' + d.severityClass;
      document.getElementById('panelLooks').textContent = d.looks;
      document.getElementById('panelFound').textContent = d.found;
      document.getElementById('panelHealth').textContent = d.health;
      document.getElementById('panelTreatment').textContent = d.treatment;
      const content = pestPanel.querySelector('.pest-panel__content');
      if (content) content.scrollTop = 0;
      pestOverlay.style.display = 'block';
      pestPanel.style.right = '0';
      document.body.style.overflow = 'hidden';
    };
    const closePanel = () => {
      pestOverlay.style.display = 'none';
      pestPanel.style.right = '-420px';
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-pest]').forEach(btn => {
      btn.addEventListener('click', () => openPanel(btn.dataset.pest));
    });
    pestPanelClose.addEventListener('click', closePanel);
    pestOverlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  }

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

  // ─── PARALLAX ─────────────────────────────────────────
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.1)`;
    }, { passive: true });
  }
  // Page-hero parallax (inner pages)
  const pageHeroContent = document.querySelector('.page-hero .container');
  if (pageHeroContent) {
    window.addEventListener('scroll', () => {
      pageHeroContent.style.transform = `translateY(${window.scrollY * 0.12}px)`;
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
