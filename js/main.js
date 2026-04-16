/* ============================================================
   TNE — Transnational Experts Inc.
   Main JavaScript — no frameworks
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM references ---------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile a');
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

  /* ---------- Mobile Nav Toggle ---------- */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

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

    // Stats counter animation (skip first item - years in operation)
    var statsSection = document.querySelector('.stats');
    if (statsSection) {
      var statsCounted = false;
      var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            var items = statsSection.querySelectorAll('.stats__item h4');
            items.forEach(function (item, index) {
              // Only animate last item (index 3 = inspections)
              if (index !== 3) return;
              
              var text = item.textContent.trim();
              // Extract number and suffix (e.g. "3M+" → 3, "M+")
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
                  // Ease-out quad
                  var eased = 1 - (1 - progress) * (1 - progress);
                  var current = isDecimal
                    ? (target * eased).toFixed(1)
                    : Math.round(target * eased);
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

  /* ---------- Driver Application Form ---------- */
  // [PLACEHOLDER] — Replace this URL with your Google Apps Script Web App URL
  var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxq1IGYrtVq36nz79x6UpUWKneHF3Lhs1KFmJyxChYtT7fkQ4BFO5o7HRXlZLn0W4KB/exec';

  if (driverForm) {
    driverForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = driverForm.querySelector('.apply__submit');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'SUBMITTING...';
      submitBtn.disabled = true;

      var formData = new FormData(driverForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      })
        .then(function () {
          submitBtn.textContent = 'APPLICATION SENT ✓';
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
