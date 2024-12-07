// components/gallery/gallery.js
class GalleryManager {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.currentIndex = 0;
        this.images = Array.from(document.querySelectorAll('.gallery-item'));
        this.setupIntersectionObserver();
    }

    initElements() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = this.lightbox.querySelector('img');
        this.lightboxTitle = this.lightbox.querySelector('h3');
        this.lightboxDesc = this.lightbox.querySelector('p');
        this.closeBtn = document.getElementById('closeLightbox');
        this.prevBtn = document.getElementById('prevImage');
        this.nextBtn = document.getElementById('nextImage');
    }

    bindEvents() {
        // Open lightbox
        document.querySelectorAll('.view-image').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-item');
                this.openLightbox(item);
            });
        });

        // Close lightbox
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });

        // Navigation
        this.prevBtn.addEventListener('click', () => this.showPrevImage());
        this.nextBtn.addEventListener('click', () => this.showNextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevImage();
                    break;
                case 'ArrowRight':
                    this.showNextImage();
                    break;
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.images.forEach((image, index) => {
            image.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(image);
        });
    }

    openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;

        this.currentIndex = this.images.indexOf(item);
        this.updateLightboxContent(img.src, title, desc);
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxFromIndex();
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxFromIndex();
    }

    updateLightboxFromIndex() {
        const item = this.images[this.currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;
        this.updateLightboxContent(img.src, title, desc);
    }

    updateLightboxContent(src, title, desc) {
        this.lightboxImg.src = src;
        this.lightboxTitle.textContent = title;
        this.lightboxDesc.textContent = desc;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
});