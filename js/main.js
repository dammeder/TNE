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

  /* ---------- Driver Application Form ---------- */
  // [PLACEHOLDER] — Replace this URL with your Google Apps Script Web App URL
  var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

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
        headers: { 'Content-Type': 'application/json' },
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
