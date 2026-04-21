/* ================================
   TECHCARE SOLUTIONS - JAVASCRIPT
   ================================ */

// ============= DARK MODE TOGGLE =============

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        updateThemeIcon();
    } else {
        localStorage.setItem('theme', 'dark');
        updateThemeIcon();
    }
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============= MENU TOGGLE =============

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============= SMOOTH SCROLLING =============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============= FAQ ACCORDION =============

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// ============= EMERGENCY BUTTON & MODALS =============

const emergencyBtn = document.getElementById('emergencyBtn');
const emergencyModal = document.getElementById('emergencyModal');
const quickFormModal = document.getElementById('quickFormModal');
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');

emergencyBtn.addEventListener('click', () => {
    emergencyModal.classList.add('active');
});

// Close modals when close button is clicked
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Quick action functions
function quickCall() {
    window.location.href = 'tel:+919238150103';
}

function quickWhatsApp() {
    window.location.href = 'https://wa.me/919238150103?text=Hi%20TechCare%20Solutions%20I%20need%20technical%20support';
}

function quickForm() {
    document.getElementById('emergencyModal').classList.remove('active');
    quickFormModal.classList.add('active');
}

// Quick form submission
document.getElementById('quickSupportForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly.');
    quickFormModal.classList.remove('active');
    document.getElementById('quickSupportForm').reset();
});

// ============= CHAT WIDGET =============

chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('active');
    if (chatWidget.classList.contains('active')) {
        document.getElementById('chatInput').focus();
    }
});

const chatCloseBtn = document.querySelector('.chat-close');
chatCloseBtn.addEventListener('click', () => {
    chatWidget.classList.remove('active');
});

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.classList.add('message', 'user-message');
    userMsgDiv.textContent = message;
    chatMessages.appendChild(userMsgDiv);
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response
    setTimeout(() => {
        const botMsgDiv = document.createElement('div');
        botMsgDiv.classList.add('message', 'bot-message');
        
        // Simple chatbot responses
        const responses = [
            'Thanks for reaching out! How can we help you?',
            'Our support team will be with you shortly. For urgent matters, please call us at +91 9876 543210.',
            'You can also reach us via WhatsApp for faster response!',
            'What specific issue are you facing with your computer?',
            'We offer 24/7 support - feel free to contact us anytime!',
            'Would you like to book a service appointment?'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        botMsgDiv.textContent = randomResponse;
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

// Send message on Enter key
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ============= BOOKING FORM SUBMISSION =============

const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        issue: formData.get('issue'),
        service: formData.get('service'),
        preferredTime: formData.get('preferred-time')
    };
    
    // In a real application, you would send this data to a server
    console.log('Booking Data:', data);
    
    // Show success message
    alert(`Thank you, ${data.name}! Your booking has been received. We'll contact you at ${data.phone} shortly to confirm the appointment.`);
    
    // Reset form
    bookingForm.reset();
    
    // In production, you would send this data to a backend:
    // fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // }).then(response => response.json())
    //   .then(data => console.log('Success:', data))
    //   .catch(error => console.error('Error:', error));
});

// ============= NAVBAR SCROLL EFFECT =============

const navbar = document.querySelector('.navbar');
let lastScrollPos = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.15)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.05)';
    }
    
    lastScrollPos = currentScroll;
});

// ============= SCROLL ANIMATIONS =============

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, pricing cards, etc.
document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============= ACTIVE NAVBAR LINK =============

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
});

// ============= FORM VALIDATION =============

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Add real-time validation to booking form
const bookingPhone = document.getElementById('phone');
const bookingEmail = document.getElementById('email');

bookingPhone.addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = 'var(--border-color)';
    }
});

bookingEmail.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = 'var(--border-color)';
    }
});

// ============= COUNTER ANIMATION =============

function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 100);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 100);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const h3 = entry.target.querySelector('h3');
            const target = parseInt(h3.textContent);
            countUp(h3, target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ============= MOBILE OPTIMIZATION =============

// Adjust floating buttons on mobile
function adjustFloatingButtons() {
    if (window.innerWidth <= 480) {
        document.querySelector('.floating-buttons').style.bottom = '10px';
        document.querySelector('.floating-buttons').style.right = '10px';
    }
}

window.addEventListener('resize', adjustFloatingButtons);
adjustFloatingButtons();

// ============= TYPING EFFECT FOR HERO TITLE (OPTIONAL) =============

function typeText(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-content h1');
//     const text = heroTitle.textContent;
//     typeText(heroTitle, text);
// });

// ============= PRELOADER (OPTIONAL) =============

window.addEventListener('load', () => {
    // Remove any loading indicators
    document.body.style.opacity = '1';
});

// ============= DYNAMIC PHONE NUMBER (FOR TESTING) =============

// In production, store phone numbers in environment variables or config
const PHONE_NUMBER = '+919238150103';
const WHATSAPP_NUMBER = '919238150103';

// Update all phone links (optional - already set in HTML)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = `tel:${PHONE_NUMBER}`;
});

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20TechCare%20Solutions%20I%20need%20technical%20support`;
});

// ============= PAGE PERFORMANCE OPTIMIZATION =============

// Lazy loading for images (if implemented)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
}

// ============= ACCESSIBILITY IMPROVEMENTS =============

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        chatWidget.classList.remove('active');
    }
});

// ============= ADDITIONAL UTILITY FUNCTIONS =============

// Get URL parameters
function getQueryParam(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

// Scroll to top button (optional)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============= INITIALIZATION =============

console.log('TechCare Solutions website loaded successfully!');
console.log('Version: 1.0.0');
console.log('Developed with ❤️');
