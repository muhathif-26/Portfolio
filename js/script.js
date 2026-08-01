/* ============================================================
   JABEER MOHAMMED MUHATHTHEEF — PORTFOLIO SCRIPT
   Vanilla JS only — no external animation libraries required.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Fast Futuristic Loading Screen Animation ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderFill = document.getElementById('loader-fill');
  const loaderStatus = document.getElementById('loader-status');

  const statusMessages = [
    'INITIALIZING SYSTEM',
    'LOADING ASSETS',
    'PORTFOLIO READY'
  ];

  let currentProgress = 0;
  function updateLoader() {
    if (currentProgress < 100) {
      currentProgress += Math.floor(Math.random() * 25) + 20;
      if (currentProgress > 100) currentProgress = 100;

      if (loaderPercent) loaderPercent.textContent = currentProgress;
      if (loaderFill) loaderFill.style.width = currentProgress + '%';

      if (loaderStatus) {
        if (currentProgress < 40) loaderStatus.textContent = statusMessages[0];
        else if (currentProgress < 85) loaderStatus.textContent = statusMessages[1];
        else loaderStatus.textContent = statusMessages[2];
      }

      setTimeout(updateLoader, 15);
    } else {
      setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('hidden');
      }, 80);
    }
  }

  updateLoader();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Live Clock ---------- */
  const clockText = document.getElementById('clock-text');
  function updateClock() {
    if (clockText) {
      const now = new Date();
      clockText.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Theme toggle (dark/light) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorageSafeGet('jmm-theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      if (themeIcon) themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      localStorageSafeSet('jmm-theme', isLight ? 'light' : 'dark');
    });
  }
  // Safe wrappers so the script never throws in restrictive environments
  function localStorageSafeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function localStorageSafeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* no-op */ } }

  /* ---------- GitHub activity card ---------- */
  const githubUsername = 'muhathif-26';
  const githubActivityCard = document.getElementById('github-activity-card');
  if (githubActivityCard) {
    const githubActivityContent = githubActivityCard.querySelector('p');
    if (githubActivityContent) {
      githubActivityContent.innerHTML = 'Loading GitHub activity…';

      fetch(`https://api.github.com/users/${githubUsername}`)
        .then((res) => {
          if (!res.ok) throw new Error('GitHub data unavailable');
          return res.json();
        })
        .then((user) => {
          githubActivityContent.innerHTML = `
            <strong>GitHub Activity Connected</strong><br>
            <span>Profile: <a href="${user.html_url}" target="_blank" rel="noopener">${githubUsername}</a></span><br>
            <span>Repos: ${user.public_repos}, Followers: ${user.followers}, Following: ${user.following}</span>
          `;
        })
        .catch(() => {
          githubActivityContent.innerHTML = `
            <strong>GitHub Activity Connected</strong><br>
            <span><a href="https://github.com/${githubUsername}" target="_blank" rel="noopener">View ${githubUsername} on GitHub</a></span>
          `;
        });
    }
  }

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ---------- Scroll to top button ---------- */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Cursor glow (desktop) ---------- */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------- Typewriter effect (replaces Typed.js) ---------- */
  const roles = [
    'Software Developer',
    'IT Undergraduate (HNDIT)',
    'Frontend Developer',
    'UI/UX Enthusiast'
  ];
  const typedEl = document.getElementById('typed-text');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
      setTimeout(typeLoop, 65);
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop, 300); return; }
      setTimeout(typeLoop, 35);
    }
  }
  if (typedEl) typeLoop();

  /* ---------- Scroll reveal (replaces AOS) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
  
  // Force reveal check on load after a small delay to avoid blank landing screens
  setTimeout(() => {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in-view');
      }
    });
  }, 100);

  /* ---------- Skill bars fill on view ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Card tilt effect ---------- */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      e.stopPropagation(); // Prevent nested tilt bubble visual bugs
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', (e) => {
      e.stopPropagation();
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('[data-ripple]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Contact Form (Direct Serverless HTTPS Delivery) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn ? btn.innerHTML : '';

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const formData = {
        name: nameInput ? nameInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        subject: subjectInput ? subjectInput.value.trim() : '',
        message: messageInput ? messageInput.value.trim() : ''
      };

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
        btn.style.opacity = '0.8';
      }

      let success = false;

      // Method 1: JSON AJAX Submission
      try {
        const relayRes = await fetch('https://formsubmit.co/ajax/e0ce131d6df7e2e344bcedca3d0df38b', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: `[Portfolio Contact] ${formData.subject || 'New Message'}`,
            message: formData.message
          })
        });
        const relayData = await relayRes.json();
        if (relayRes.ok && (relayData.success === 'true' || relayData.success === true)) {
          success = true;
        }
      } catch (err) {
        console.warn('JSON AJAX submission failed, trying URL-encoded fallback...', err);
      }

      // Method 2: URL-Encoded Fallback
      if (!success) {
        try {
          const bodyData = new URLSearchParams();
          bodyData.append('name', formData.name);
          bodyData.append('email', formData.email);
          bodyData.append('_subject', `[Portfolio Contact] ${formData.subject || 'New Message'}`);
          bodyData.append('message', formData.message);

          const urlRes = await fetch('https://formsubmit.co/ajax/e0ce131d6df7e2e344bcedca3d0df38b', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            body: bodyData
          });
          const urlData = await urlRes.json();
          if (urlRes.ok && (urlData.success === 'true' || urlData.success === true)) {
            success = true;
          }
        } catch (urlErr) {
          console.warn('URL-encoded submission failed:', urlErr);
        }
      }

      // Method 3: Native Form Post Fallback for local file:/// browsing
      if (!success && window.location.protocol === 'file:') {
        const nativeForm = document.createElement('form');
        nativeForm.method = 'POST';
        nativeForm.action = 'https://formsubmit.co/e0ce131d6df7e2e344bcedca3d0df38b';
        
        const fields = {
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Contact] ${formData.subject || 'New Message'}`,
          message: formData.message,
          _next: window.location.href
        };

        Object.keys(fields).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = fields[key];
          nativeForm.appendChild(input);
        });

        document.body.appendChild(nativeForm);
        nativeForm.submit();
        return;
      }

      if (success) {
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent Successfully!';
          btn.style.backgroundColor = '#10b981';
          btn.style.borderColor = '#10b981';
        }
        form.reset();
      } else {
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error sending message. Please try again.';
          btn.style.backgroundColor = '#ef4444';
          btn.style.borderColor = '#ef4444';
        }
      }

      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalHTML;
          btn.style.opacity = '1';
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }
      }, 4000);
    });
  }

  /* ---------- Smooth anchor scrolling offset for fixed navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ---------- Particle background (replaces Particles.js) ---------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let particles = [];
      const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 85;

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.6
          });
        }
      }
      initParticles();

      function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isLight = document.body.classList.contains('light-theme');
        const dotColor = isLight ? 'rgba(80, 90, 140, 0.5)' : 'rgba(160, 180, 255, 0.55)';
        const lineColorBase = isLight ? '80,90,140' : '130,150,255';

        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${lineColorBase}, ${0.12 * (1 - dist / 120)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(drawParticles);
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) drawParticles();
    }
  }

});
