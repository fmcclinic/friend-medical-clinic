// components/hero/hero.js
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-slide');
        this.nextBtn = document.querySelector('.next-slide');
        this.interval = null;
        
        this.init();
    }

    init() {
        this.showSlide(0);
        this.addListeners();
        this.startAutoplay();
        document.querySelector('.hero-slider').classList.add('loaded');
    }

    showSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        this.currentSlide = index;
        if (this.currentSlide >= this.slides.length) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.slides.length - 1;

        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    addListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoplay());
        slider.addEventListener('mouseleave', () => this.startAutoplay());

        this.addTouchSupport();
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    startAutoplay() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoplay() {
        clearInterval(this.interval);
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.hero-slider');
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new HeroSlider());