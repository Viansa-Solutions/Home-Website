// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const nav = document.querySelector('nav');
const navLine = document.querySelector('.nav-line');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('navbar-scrolled');
    nav.classList.remove('navbar-transparent');
    navLine.classList.add('visible');
  } else {
    nav.classList.remove('navbar-scrolled');
    nav.classList.add('navbar-transparent');
    navLine.classList.remove('visible');
  }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    // Toggle icon
    if (isOpen) {
      menuBtn.innerHTML = '<i data-lucide="x"></i>';
    } else {
      menuBtn.innerHTML = '<i data-lucide="menu"></i>';
    }
    lucide.createIcons();
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });
}

// Process Line Animation
const processSection = document.getElementById('process');
const processLine = document.getElementById('process-line');

if (processSection && processLine) {
  window.addEventListener('scroll', () => {
    const sectionTop = processSection.offsetTop;
    const sectionHeight = processSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let percent = ((scrollPosition - sectionTop) / sectionHeight) * 100;
    percent = Math.max(0, Math.min(100, percent));

    processLine.style.height = percent + "%";
  });
}

// Pricing Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const from = parseInt(target.getAttribute('data-from') || '0');
      const to = parseInt(target.getAttribute('data-to') || '0');
      
      if (!isNaN(from) && !isNaN(to)) {
        let startTimestamp = null;
        const duration = 2000;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const current = Math.floor(progress * (to - from) + from);
          target.textContent = `₹${current.toLocaleString()}/-`;
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            target.textContent = `₹${to.toLocaleString()}/-`;
          }
        };
        
        window.requestAnimationFrame(step);
        observer.unobserve(target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.new-price').forEach((el) => {
  observer.observe(el);
});

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});
