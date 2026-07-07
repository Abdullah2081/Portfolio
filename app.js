/* 
   M Abdullah - Portfolio JavaScript
   Handles interactive features, custom scroll reveals, mobile menu, sci-fi scroll progress,
   interactive cursor glow, and form submissions.
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Stop observing once revealed for smoother performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Sci-Fi Scroll Progress Indicator ---
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    if (scrollProgress) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    }
  });

  // --- Sci-Fi Interactive Cursor Glow ---
  const cursorGlow = document.createElement('div');
  // Styling the floating cursor glow
  cursorGlow.style.position = 'fixed';
  cursorGlow.style.width = '200px';
  cursorGlow.style.height = '200px';
  cursorGlow.style.borderRadius = '50%';
  cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(217, 70, 239, 0.03) 50%, transparent 70%)';
  cursorGlow.style.filter = 'blur(40px)';
  cursorGlow.style.pointerEvents = 'none';
  cursorGlow.style.zIndex = '99';
  cursorGlow.style.transform = 'translate(-50%, -50%)';
  cursorGlow.style.left = '-250px';
  cursorGlow.style.top = '-250px';
  cursorGlow.style.transition = 'width 0.3s ease, height 0.3s ease';
  
  // Only display cursor glow on desktop devices
  if (window.innerWidth > 768) {
    document.body.appendChild(cursorGlow);

    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });

    // Expand glow on link/button hovers
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-panel');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '280px';
        cursorGlow.style.height = '280px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(217, 70, 239, 0.05) 50%, transparent 70%)';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '200px';
        cursorGlow.style.height = '200px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(217, 70, 239, 0.03) 50%, transparent 70%)';
      });
    });
  }

  // --- Active Nav Link Highlighter ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-nav-link');
      }
    });
  });

  // --- Mobile Drawer Menu Navigation ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      
      // Toggle menu icon between bars and close (X)
      if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fas fa-bars text-2xl';
      } else {
        menuIcon.className = 'fas fa-times text-2xl';
      }
    });

    // Close mobile menu when clicking any link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.className = 'fas fa-bars text-2xl';
      });
    });
  }

  // --- Smooth Scroll for anchor tags ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Interactive Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const toastContainer = document.getElementById('toast-container');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Retrieve values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all fields.', 'error');
        return;
      }

      // Check if placeholder is still set
      if (contactForm.getAttribute('action').includes('YOUR_FORMSPREE_FORM_ID')) {
        showToast('Please configure your Formspree Form ID in index.html first.', 'error');
        return;
      }

      // Change button state to loading
      submitBtn.disabled = true;
      submitText.textContent = 'TRANSMITTING MESSAGE...';
      submitSpinner.classList.remove('hidden');
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showToast(`Thank you, ${name}! Your message has been sent to my inbox successfully.`, 'success');
          contactForm.reset();
        } else {
          const data = await response.json();
          showToast(data.errors ? data.errors.map(err => err.message).join(', ') : 'Transmission failed. Please try again.', 'error');
        }
      } catch (error) {
        showToast('Network error. Please check your internet connection.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitSpinner.classList.add('hidden');
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
    });
  }

  // --- Beautiful Toast Notifications ---
  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3 px-5 py-4 rounded-xl border glass-panel transition-all duration-500 transform translate-y-10 opacity-0 max-w-md w-full shadow-2xl`;
    
    // Customize icon and border color based on message type
    let iconClass = 'fas fa-check-circle text-emerald-400';
    let borderColor = 'rgba(0, 240, 255, 0.4)';
    
    if (type === 'error') {
      iconClass = 'fas fa-exclamation-circle text-rose-500';
      borderColor = 'rgba(244, 63, 94, 0.4)';
    }

    toast.style.borderColor = borderColor;
    
    toast.innerHTML = `
      <i class="${iconClass} text-xl"></i>
      <p class="text-sm font-medium text-slate-100 flex-1">${message}</p>
      <button class="text-slate-400 hover:text-slate-200 transition-colors">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Append toast to container
    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    // Click to close
    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      dismissToast(toast);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
      dismissToast(toast);
    }, 5000);
  }

  function dismissToast(toast) {
    toast.classList.add('translate-y-[-10px]', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }
});
