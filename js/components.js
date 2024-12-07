// js/components.js
class ComponentLoader {
   constructor() {
       this.loadedComponents = new Set();
   }

   async loadComponent(path, targetId) {
       try {
           const response = await fetch(path);
           if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
           const html = await response.text();
           
           const target = document.getElementById(targetId);
           if (target) {
               target.innerHTML = html;
               
               // Load associated CSS
               const cssPath = path.replace('.html', '/header.css');
               await this.loadCSS(cssPath);
               
               // Load associated JavaScript
               const jsPath = path.replace('.html', '/header.js');
               await this.loadJS(jsPath);
               
               this.loadedComponents.add(targetId);
           }
       } catch (error) {
           console.error(`Error loading component ${targetId}:`, error);
       }
   }

   async loadCSS(path) {
       if (!document.querySelector(`link[href="${path}"]`)) {
           const link = document.createElement('link');
           link.rel = 'stylesheet';
           link.href = path;
           document.head.appendChild(link);
       }
   }

   async loadJS(path) {
       if (!document.querySelector(`script[src="${path}"]`)) {
           const script = document.createElement('script');
           script.src = path;
           document.body.appendChild(script);
       }
   }

   async loadAllComponents() {
       const components = [
           { path: 'components/header/header.html', id: 'header' },
           { path: 'components/hero/hero.html', id: 'hero' },
           { path: 'components/specialties/specialties.html', id: 'specialties' },
           { path: 'components/gallery/gallery.html', id: 'gallery' },
           { path: 'components/news/news.html', id: 'news' },
           { path: 'components/contact/contact.html', id: 'contact' },
           { path: 'components/footer/footer.html', id: 'footer' }
       ];

       for (const component of components) {
           await this.loadComponent(component.path, component.id);
       }
   }
}

// Initialize and load components
const componentLoader = new ComponentLoader();
document.addEventListener('DOMContentLoaded', () => {
   componentLoader.loadAllComponents();
});