/* ============================================================
   TNE — Transnational Experts Inc.
   Main JavaScript — no frameworks
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM references ---------- */
  const nav = document.querySelector('.nav');
  const driverForm = document.getElementById('driver-form');

  /* ---------- Sticky Nav on Scroll ---------- */
  function handleScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Scroll Animations ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Fade-up reveal via IntersectionObserver
    var animateEls = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animateEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    // Stats counter animation — animates every numeric stat
    var statsSection = document.querySelector('.stats');
    if (statsSection) {
      var statsCounted = false;
      var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            var items = statsSection.querySelectorAll('.stats__item h4');
            items.forEach(function (item) {
              var text = item.textContent.trim();
              var match = text.match(/^([\d.]+)(.*)$/);
              if (match) {
                var target = parseFloat(match[1]);
                var suffix = match[2];
                var duration = 1500;
                var start = performance.now();
                var isDecimal = target % 1 !== 0;
                function tick(now) {
                  var elapsed = now - start;
                  var progress = Math.min(elapsed / duration, 1);
                  var eased = 1 - (1 - progress) * (1 - progress);
                  var current = isDecimal ? (target * eased).toFixed(1) : Math.round(target * eased);
                  item.textContent = current + suffix;
                  if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
              }
            });
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      statsObserver.observe(statsSection);
    }

  }

  /* ---------- Scroll-Spy Active Nav ---------- */
  var navLinks = document.querySelectorAll('.nav__links a');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id !== '#') {
      var section = document.querySelector(id);
      if (section) sections.push({ el: section, link: link });
    }
  });

  if (sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = sections.find(function (s) { return s.el === entry.target; });
        if (match) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            match.link.classList.add('active');
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { spyObserver.observe(s.el); });
  }

  /* ---------- Input Validation ---------- */
  var nameInput = document.getElementById('full-name');
  var phoneInput = document.getElementById('phone');

  if (nameInput) {
    nameInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^A-Za-z\s\-']/g, '');
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '').slice(0, 10);
      if (digits.length >= 7) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
      } else if (digits.length >= 4) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
      } else {
        this.value = digits;
      }
    });
  }

  /* ---------- Modal Logic ---------- */
  var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var modalLastTrigger = null;

  function openModal(modal, trigger) {
    modalLastTrigger = trigger || document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus the close button on open for keyboard users
    var closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) {
      setTimeout(function () { closeBtn.focus(); }, 0);
    }
  }

  function closeModal(overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (modalLastTrigger && typeof modalLastTrigger.focus === 'function') {
      modalLastTrigger.focus();
    }
    modalLastTrigger = null;
  }

  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var modal = document.getElementById(this.getAttribute('data-modal'));
      if (modal) openModal(modal, this);
    });
  });

  document.querySelectorAll('.modal__close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var overlay = this.closest('.modal-overlay');
      if (overlay) closeModal(overlay);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener('keydown', function (e) {
    var openOverlay = document.querySelector('.modal-overlay.open');
    if (!openOverlay) return;

    if (e.key === 'Escape') {
      closeModal(openOverlay);
      return;
    }

    // Focus trap: keep Tab within the modal
    if (e.key === 'Tab') {
      var focusable = openOverlay.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- Driver Application Form ---------- */
  // [PLACEHOLDER] — Replace this URL with your Google Apps Script Web App URL
  var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxq1IGYrtVq36nz79x6UpUWKneHF3Lhs1KFmJyxChYtT7fkQ4BFO5o7HRXlZLn0W4KB/exec';

  if (driverForm) {
    driverForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check — if filled, silently "succeed" without submitting
      var honeypot = driverForm.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) {
        driverForm.reset();
        return;
      }

      var submitBtn = driverForm.querySelector('.apply__submit');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'SUBMITTING...';
      submitBtn.disabled = true;

      var formData = new FormData(driverForm);
      var data = {};
      formData.forEach(function (value, key) {
        if (key !== 'website') data[key] = value;
      });

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      })
        .then(function () {
          submitBtn.textContent = 'APPLICATION RECEIVED — WE\'LL FOLLOW UP';
          submitBtn.style.opacity = '0.7';
          driverForm.reset();
          setTimeout(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
          }, 3000);
        })
        .catch(function () {
          submitBtn.textContent = 'ERROR — TRY AGAIN';
          submitBtn.disabled = false;
          setTimeout(function () {
            submitBtn.textContent = originalText;
          }, 3000);
        });
    });
  }
})();
