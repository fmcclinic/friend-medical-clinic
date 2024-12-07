// components/header/header.js
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const statusBadge = document.querySelector('.status-badge');

    // Scroll Effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
        } else if (currentScroll > lastScroll) {
            header.classList.add('scrolled');
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Menu
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Update opening hours status
    function updateStatus() {
        const now = new Date();
        const hours = now.getHours();
        const day = now.getDay();
        
        let isOpen = false;
        
        if (day === 0) { // Sunday
            isOpen = hours >= 8 && hours < 12;
        } else { // Monday to Saturday
            isOpen = hours >= 8 && hours < 20;
        }
        
        statusBadge.classList.toggle('closed', !isOpen);
        statusBadge.querySelector('span').textContent = isOpen ? 'Đang mở cửa' : 'Đã đóng cửa';
    }

    updateStatus();
    setInterval(updateStatus, 60000); // Update every minute
});