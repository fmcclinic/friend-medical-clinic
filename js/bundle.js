// js/bundle.js

// Main App Class
class App {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.initializeComponents();
    }

    async loadComponents() {
        // Load all HTML components first
        const components = [
            { id: 'header', path: './components/header/header.html' },
            { id: 'hero', path: './components/hero/hero.html' },
            // ... other components
        ];

        for (const component of components) {
            await this.loadComponent(component.id, component.path);
        }
    }

    async loadComponent(id, path) {
        try {
            const response = await fetch(path);
            const html = await response.text();
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading ${id}:`, error);
        }
    }

    initializeComponents() {
        // Initialize components only after all HTML is loaded
        this.header = new Header();
        this.hero = new Hero();
        // ... initialize other components
    }
}

// Component Classes
class Header {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
    }

    bindEvents() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.mobileMenu.classList.toggle('hidden');
            });
        }
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});