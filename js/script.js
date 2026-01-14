// ================= MOBILE MENU =================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ================= NAVBAR SCROLL =================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ================= CONTACT FORM =================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageData = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        status: "incomplete",
        time: new Date().toISOString()
    };

    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(messageData);
    localStorage.setItem("messages", JSON.stringify(messages));

    // UI feedback
    const submitButton = contactForm.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    setTimeout(() => {
        formMessage.textContent = "Thank you for your message! We'll get back to you within 24 hours.";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";
        formMessage.style.textAlign = "center";

        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1000);
});

// ================= FADE IN ANIMATION =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = '0.6s ease';
    observer.observe(el);
});
