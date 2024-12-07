// components/footer/footer.js
class FooterManager {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.backToTopBtn = document.getElementById('backToTop');
        this.footer = document.querySelector('footer');
        this.links = document.querySelectorAll('.footer-link');
    }

    bindEvents() {
        // Back to Top button
        window.addEventListener('scroll', () => this.handleScroll());
        this.backToTopBtn?.addEventListener('click', () => this.scrollToTop());

        // Smooth scroll for footer links
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e));
        });
    }

    handleScroll() {
        if (!this.backToTopBtn) return;

        if (window.pageYOffset > 500) {
            this.backToTopBtn.classList.add('visible');
        } else {
            this.backToTopBtn.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterManager();
});

// Add animation class to footer elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.footer-section').forEach(section => {
    observer.observe(section);
});