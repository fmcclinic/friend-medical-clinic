// components/news/news.js
class NewsManager {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    initElements() {
        this.searchInput = document.querySelector('.search-input');
        this.categories = document.querySelectorAll('.news-category');
        this.newsCards = document.querySelectorAll('.news-card');
        this.paginationLinks = document.querySelectorAll('.pagination a');
    }

    bindEvents() {
        // Search functionality
        this.searchInput?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Category filtering
        this.categories.forEach(category => {
            category.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCategoryClick(category);
            });
        });

        // Pagination
        this.paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePagination(link);
            });
        });
    }

    handleSearch(searchTerm) {
        const normalizedTerm = searchTerm.toLowerCase().trim();
        
        this.newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(normalizedTerm) || content.includes(normalizedTerm)) {
                card.style.display = '';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }

    handleCategoryClick(selectedCategory) {
        // Remove active class from all categories
        this.categories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to selected category
        selectedCategory.classList.add('active');
        
        const category = selectedCategory.dataset.category;
        
        // Filter news cards
        this.newsCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = '';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }

    handlePagination(clickedLink) {
        // Remove active class from all pagination links
        this.paginationLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Here you would typically make an AJAX call to load new content
        // For demo purposes, we'll just animate existing content
        this.newsCards.forEach(card => {
            card.classList.add('fade-in');
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.newsCards.forEach(card => observer.observe(card));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsManager();
});