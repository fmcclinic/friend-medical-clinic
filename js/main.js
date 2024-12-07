// js/main.js

// Main Application Class
class FMCApp {
    constructor() {
        this.init();
    }
 
    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupStatusBadge();
    }
 
    // Xử lý scroll effects
    setupScrollEffects() {
        const header = document.querySelector('header');
        let lastScroll = 0;
 
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
 
            // Header effect
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
 
            // Hide/Show header on scroll
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
 
            lastScroll = currentScroll;
        });
    }
 
    // Xử lý mobile menu
    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
 
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                menuBtn.classList.toggle('active');
            });
 
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    menuBtn.classList.remove('active');
                }
            });
        }
    }
 
    // Xử lý status badge (Đang mở cửa/Đóng cửa)
    setupStatusBadge() {
        const updateStatus = () => {
            const now = new Date();
            const hours = now.getHours();
            const day = now.getDay();
            const statusBadge = document.querySelector('.status-badge');
 
            if (statusBadge) {
                let isOpen = false;
 
                if (day === 0) { // Chủ nhật
                    isOpen = hours >= 8 && hours < 12;
                } else { // Thứ 2-7
                    isOpen = hours >= 8 && hours < 20;
                }
 
                statusBadge.textContent = isOpen ? 'Đang mở cửa' : 'Đã đóng cửa';
                statusBadge.classList.toggle('bg-green-500', isOpen);
                statusBadge.classList.toggle('bg-red-500', !isOpen);
            }
        };
 
        // Update immediately and then every minute
        updateStatus();
        setInterval(updateStatus, 60000);
    }
 
    // Utility function for smooth scroll
    scrollToElement(element, offset = 0) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop - offset
        });
    }
 }
 
 // Initialize application when DOM is loaded
 document.addEventListener('DOMContentLoaded', () => {
    window.FMCApp = new FMCApp();
 });
 
 // Global error handling
 window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Here you can add error reporting logic
 });
 
 // Handle page visibility changes
 document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh dynamic content when page becomes visible
        window.FMCApp.setupStatusBadge();
    }
 });