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
    if (themeToggle) updateThemeIcon();
}

if (themeToggle) {
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
}

function updateThemeIcon() {
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (!icon) return;
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

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navMenuLinks = document.querySelectorAll('.nav-menu a');
if (menuToggle && navMenu) {
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============= SMOOTH SCROLLING =============

const smoothLinks = document.querySelectorAll('a[href^="#"]');
if (smoothLinks.length) {
    smoothLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

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

if (emergencyBtn && emergencyModal) {
    emergencyBtn.addEventListener('click', () => {
        emergencyModal.classList.add('active');
    });
}

// Close modals when close button is clicked
const closeButtons = document.querySelectorAll('.close-btn');
if (closeButtons.length) {
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });
}

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
    if (emergencyModal) emergencyModal.classList.remove('active');
    if (quickFormModal) quickFormModal.classList.add('active');
}

// Quick form submission
const quickSupportForm = document.getElementById('quickSupportForm');
if (quickSupportForm) {
    quickSupportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you shortly.');
        if (quickFormModal) quickFormModal.classList.remove('active');
        quickSupportForm.reset();
    });
}

// ============= CHAT WIDGET =============

if (chatToggle && chatWidget) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        const chatInput = document.getElementById('chatInput');
        if (chatWidget.classList.contains('active') && chatInput) {
            chatInput.focus();
        }
    });
}

const chatCloseBtn = document.querySelector('.chat-close');
if (chatCloseBtn && chatWidget) {
    chatCloseBtn.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    if (!chatInput || !chatMessages) return;

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
const chatInputElement = document.getElementById('chatInput');
if (chatInputElement) {
    chatInputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ============= BOOKING FORM SUBMISSION =============

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
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

// Observe all service cards, testimonial cards, etc.
document.querySelectorAll('.service-card, .testimonial-card, .blog-card').forEach(el => {
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
        if (chatWidget) {
            chatWidget.classList.remove('active');
        }
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

/* ==============================
   ADVANCED SERVICE REVIEWS (FRONT-END ONLY)
   - Allows users to submit a review (rating + comment + name)
   - Stores reviews per-page in localStorage under `reviews:<path>`
   - Shows total reviews, average rating, and previous reviews list
   - No backend required; data is stored locally in the user's browser
   ============================== */

function getReviewsKey(section) {
    return 'reviews:' + (section.dataset.key || location.pathname);
}

function loadReviews(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.warn('Failed to parse reviews from localStorage', e);
        return [];
    }
}

function saveReviews(key, reviews) {
    try {
        localStorage.setItem(key, JSON.stringify(reviews));
    } catch (e) {
        console.warn('Could not save reviews to localStorage', e);
    }
}

function submitReviewToDatabase(review, pageKey) {
    // Placeholder for backend integration.
    // Replace this with your own API call to store reviews in your database.
    console.log('Review ready for database submission:', review, 'pageKey:', pageKey);
    // Example:
    // return fetch('/api/reviews', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ page: pageKey, ...review })
    // });
}

function calcAverage(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10; // one decimal
}

function createStarElements(rating) {
    const wrapper = document.createElement('span');
    wrapper.className = 'review-stars';
    for (let i = 1; i <= 5; i++) {
        const iEl = document.createElement('i');
        iEl.className = 'fas fa-star';
        if (i <= rating) iEl.classList.add('filled');
        wrapper.appendChild(iEl);
    }
    return wrapper;
}

function renderStats(section, reviews) {
    let stats = section.querySelector('.rating-stats');
    if (!stats) {
        stats = document.createElement('div');
        stats.className = 'rating-stats';
        const widget = section.querySelector('.rating-widget');
        if (widget) {
            const widgetParent = widget.parentElement;
            if (widgetParent && widgetParent === section) {
                section.insertBefore(stats, widget);
            } else if (widgetParent) {
                widgetParent.insertBefore(stats, widget);
            } else {
                section.appendChild(stats);
            }
        } else {
            section.appendChild(stats);
        }
    }

    const avg = calcAverage(reviews);
    const total = reviews.length;
    const starsMarkup = createStarElements(Math.round(avg)).outerHTML;
    stats.innerHTML = `
        <div class="rating-summary">
            <strong>${avg}</strong>
            <span class="rating-average-label">Average service rating</span>
            <div class="rating-summary-stars">${starsMarkup}</div>
            <span>${total} review${total !== 1 ? 's' : ''}</span>
        </div>
    `;
}

function renderReviewList(section, reviews) {
    let heading = section.querySelector('.review-list-title');
    if (!heading) {
        heading = document.createElement('div');
        heading.className = 'review-list-title';
        heading.textContent = 'Latest service reviews';
        section.appendChild(heading);
    }

    let list = section.querySelector('.review-list');
    if (!list) {
        list = document.createElement('div');
        list.className = 'review-list';
        section.appendChild(list);
    }

    if (heading.nextElementSibling !== list) {
        section.insertBefore(list, heading.nextElementSibling);
    }

    if (!reviews || reviews.length === 0) {
        list.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review our service.</p>';
        return;
    }

    // most recent first
    const sorted = reviews.slice().sort((a, b) => (b.time || 0) - (a.time || 0));
    list.innerHTML = '';
    sorted.forEach(r => {
        const item = document.createElement('div');
        item.className = 'review-item';
        const header = document.createElement('div');
        header.className = 'review-header';
        const name = document.createElement('strong');
        name.textContent = r.name ? r.name : 'Anonymous';
        header.appendChild(name);
        const meta = document.createElement('span');
        meta.className = 'review-meta';
        const d = new Date(r.time || Date.now());
        meta.textContent = ' • ' + d.toLocaleString();
        header.appendChild(meta);

        const stars = createStarElements(Number(r.rating) || 0);
        const comment = document.createElement('p');
        comment.className = 'review-comment';
        comment.textContent = r.comment || '';

        item.appendChild(header);
        item.appendChild(stars);
        if (r.comment) item.appendChild(comment);
        list.appendChild(item);
    });
}

function renderReviewForm(section) {
    // container where users interact
    let container = section.querySelector('.rating-widget');
    if (!container) {
        container = document.createElement('div');
        container.className = 'rating-widget';
        section.appendChild(container);
    }

    container.innerHTML = '';

    const form = document.createElement('form');
    form.className = 'review-form';
    form.setAttribute('aria-label', 'Submit a service review');

    // star selector
    const starWrapper = document.createElement('div');
    starWrapper.className = 'star-selector';
    let selected = 0;
    for (let i = 1; i <= 5; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'star';
        b.dataset.value = i;
        b.innerText = '★';
        b.setAttribute('aria-label', i + ' stars');
        b.addEventListener('click', () => {
            selected = i;
            [...starWrapper.querySelectorAll('.star')].forEach(s => {
                if (Number(s.dataset.value) <= i) s.classList.add('filled'); else s.classList.remove('filled');
            });
        });
        starWrapper.appendChild(b);
    }

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Your name (optional)';
    nameInput.name = 'reviewer';

    const comment = document.createElement('textarea');
    comment.placeholder = 'Leave a short comment (optional)';
    comment.name = 'comment';
    comment.rows = 3;

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'btn btn-primary';
    submit.textContent = 'Submit Review';

    const msg = document.createElement('p');
    msg.className = 'rating-msg';

    form.appendChild(starWrapper);
    form.appendChild(nameInput);
    form.appendChild(comment);
    form.appendChild(submit);
    form.appendChild(msg);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selected <= 0) {
            msg.textContent = 'Please select a rating (1-5 stars).';
            return;
        }

        const review = {
            name: nameInput.value.trim(),
            rating: selected,
            comment: comment.value.trim(),
            time: Date.now()
        };

        const key = getReviewsKey(section);
        const reviews = loadReviews(key);
        reviews.push(review);
        saveReviews(key, reviews);
        submitReviewToDatabase(review, key);

        // reset
        selected = 0;
        form.reset();
        [...starWrapper.querySelectorAll('.star')].forEach(s => s.classList.remove('filled'));

        msg.textContent = 'Thanks! Your review was saved locally and is ready for backend sync.';
        renderStats(section, reviews);
        renderReviewList(section, reviews);
    });

    container.appendChild(form);
}

function initReviewSections() {
    const sections = document.querySelectorAll('.rating-section');
    sections.forEach(section => {
        // change heading if present
        const heading = section.querySelector('h3');
        if (heading) heading.textContent = 'Rate our service';

        const key = getReviewsKey(section);
        const reviews = loadReviews(key);
        renderStats(section, reviews);
        renderReviewForm(section);
        renderReviewList(section, reviews);
    });
}

document.addEventListener('DOMContentLoaded', initReviewSections);
