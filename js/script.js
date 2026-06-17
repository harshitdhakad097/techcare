/* =====================================================
   TECHCURE - MAIN JAVASCRIPT FILE
   Purpose: Interactivity + Theme Switch
   Beginner friendly with explanations
===================================================== */

/* -----------------------------
   THEME TOGGLE (LIGHT / DARK)
------------------------------ */

// Select the theme toggle button from HTML
const themeToggle = document.getElementById("themeToggle");

// Check if user already selected a theme before
// localStorage helps browser remember settings
const savedTheme = localStorage.getItem("theme");

// If theme was saved earlier, apply it
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️"; // Sun icon for light mode
}

// When user clicks the theme button
themeToggle.addEventListener("click", () => {

    // Toggle dark class on body
    document.body.classList.toggle("dark");

    // Check current theme and save it
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

/* -----------------------------
   FUTURE JAVSASCRIPT IDEAS
   (You can add later safely)
------------------------------ */

// Example (commented for learning):
// - Contact form validation
// - Mobile menu toggle
// - Page animations



/* -----------------------------
   RATING WIDGET (FRONT-END ONLY)
   - Renders 5 clickable stars
   - Persists user's rating per page in localStorage
   - Accessible: uses buttons with aria-labels
------------------------------ */

function renderStars(container, currentRating) {
    container.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'star';
        btn.innerText = '★';
        btn.setAttribute('aria-label', i + ' star');
        btn.dataset.value = i;

        if (i <= currentRating) btn.classList.add('filled');

        btn.addEventListener('click', () => setRating(container, i));
        btn.addEventListener('mouseover', () => highlight(container, i));
        btn.addEventListener('focus', () => highlight(container, i));
        btn.addEventListener('mouseout', () => renderStars(container, getStoredRating(container)));
        btn.addEventListener('blur', () => renderStars(container, getStoredRating(container)));

        container.appendChild(btn);
    }
}

function highlight(container, upto) {
    const stars = container.querySelectorAll('.star');
    stars.forEach(s => {
        const val = Number(s.dataset.value);
        if (val <= upto) s.classList.add('filled'); else s.classList.remove('filled');
    });
}

function getStoredRating(container) {
    const key = 'rating:' + (container.dataset.key || location.pathname);
    const val = Number(localStorage.getItem(key) || 0);
    return val;
}

function setRating(container, value) {
    const key = 'rating:' + (container.dataset.key || location.pathname);
    localStorage.setItem(key, String(value));
    renderStars(container, value);
    updateMessage(container, value);
}

function updateMessage(container, value) {
    const msg = container.parentElement.querySelector('.rating-msg');
    if (!msg) return;
    if (value > 0) msg.textContent = `You rated this site ${value}/5 — thanks!`;
    else msg.textContent = '';
}

function initRatingWidgets() {
    const widgets = document.querySelectorAll('.rating-widget');
    widgets.forEach(w => {
        const current = getStoredRating(w);
        renderStars(w, current);
        updateMessage(w, current);
    });
}

document.addEventListener('DOMContentLoaded', initRatingWidgets);


