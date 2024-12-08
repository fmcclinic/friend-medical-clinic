// js/main.js

class FMCApp {
    constructor() {
        this.init();
    }
 
    async init() {
        await this.loadComponents();
        this.setupEventListeners();
        this.initializeComponents();
    }
 
    // Load tất cả components
    async loadComponents() {
        try {
            const components = [
                { id: 'header', path: 'components/header/header.html' },
                { id: 'hero', path: 'components/hero/hero.html' },
                { id: 'specialties', path: 'components/specialties/specialties.html' },
                { id: 'gallery', path: 'components/gallery/gallery.html' },
                { id: 'news', path: 'components/news/news.html' },
                { id: 'contact', path: 'components/contact/contact.html' },
                { id: 'footer', path: 'components/footer/footer.html' }
            ];
 
            for (const component of components) {
                const element = document.getElementById(component.id);
                if (element) {
                    const response = await fetch(component.path);
                    const html = await response.text();
                    element.innerHTML = html;
                }
            }
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }
 
    // Setup các event listeners chung
    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
 
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
 
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && mobileMenuBtn && 
                !mobileMenuBtn.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
 
    // Initialize các component riêng lẻ
    initializeComponents() {
        this.initHeader();
        this.initHero();
        this.updateStatus();
        this.setupScrollToTop();
    }
 
    // Header initialization
    initHeader() {
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }
 
    // Hero slider initialization
    initHero() {
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            new HeroSlider();
        }
    }
 
    // Scroll handling
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
 
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
 
        // Animate elements on scroll
        this.animateOnScroll();
    }
 
    // Status badge update
    updateStatus() {
        const updateStatusBadge = () => {
            const now = new Date();
            const hours = now.getHours();
            const day = now.getDay();
            const statusBadge = document.querySelector('.status-badge');
 
            if (statusBadge) {
                const isOpen = (day === 0) ? 
                    (hours >= 8 && hours < 12) : // Chủ nhật
                    (hours >= 8 && hours < 20);  // Thứ 2-7
 
                statusBadge.textContent = isOpen ? 'Đang mở cửa' : 'Đã đóng cửa';
                statusBadge.classList.toggle('bg-green-500', isOpen);
                statusBadge.classList.toggle('bg-red-500', !isOpen);
            }
        };
 
        // Update immediately and then every minute
        updateStatusBadge();
        setInterval(updateStatusBadge, 60000);
    }
 
    // Scroll to top button
    setupScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.remove('hidden');
                } else {
                    scrollBtn.classList.add('hidden');
                }
            });
 
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
 
    // Animate elements when they come into view
    animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
 
    // Helper function to check if element is in viewport
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
 }
 
 // Initialize app when DOM is loaded
 document.addEventListener('DOMContentLoaded', () => {
    window.app = new FMCApp();
 });
 
 // Global error handling
 window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
 });
 
 // Handle page visibility
 document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        window.app.updateStatus();
    }
 });