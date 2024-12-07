// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuButton = document.getElementById('mobile-menu-button'); 
const newsItems = document.querySelectorAll('#news-list li');
const newsImage = document.getElementById('news-image');
const newsContent = document.getElementById('news-content');
const appointmentForm = document.getElementById('appointment-form');

// News Data
const newsData = {
   1: {
       title: "'Rejuvenating' vision for aging eyes",
       date: "Monday, 02/12/2024",
       content: "From the age of 40, presbyopia often begins to emerge, bringing challenges such as blurry vision for close objects; difficulty seeing in low-light conditions; eye strain, and headaches.",
       image: "assets/images/news/news-1.jpg"
   },
   2: {
       title: "Dr Huynh Huu Danh, Specialist level I at FV Hospital",
       date: "Monday, 02/12/2024", 
       content: "As a young Vietnamese doctor with international specialist qualifications...",
       image: "assets/images/news/news-2.jpg"
   },
   3: {
       title: "Vo Trieu Dat, MD, MSc: 'The pure joy of welcoming new life'",
       date: "Monday, 02/12/2024",
       content: "With years of experience in obstetrics and gynecology...", 
       image: "assets/images/news/news-3.jpg"
   }
};

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
   mobileMenu.classList.toggle('hidden');
});

// News Section Functionality 
newsItems.forEach(item => {
   item.addEventListener('click', function() {
       const newsId = this.getAttribute('data-news-id');
       const news = newsData[newsId];

       // Update active state
       newsItems.forEach(i => i.classList.remove('active'));
       this.classList.add('active');

       // Update content
       newsImage.src = news.image;
       newsContent.innerHTML = `
           <div class="bg-white rounded-lg shadow p-6">
               <h3 class="text-xl font-bold text-blue-600 mb-2">${news.title}</h3>
               <p class="text-gray-500 text-sm mb-4">${news.date}</p>
               <p class="text-gray-700">${news.content}</p>
           </div>
       `;
   });
});

// Appointment Form Handling
appointmentForm.addEventListener('submit', function(e) {
   e.preventDefault();
   
   // Form validation
   const formData = new FormData(this);
   let isValid = true;
   let errorMessage = '';

   // Basic validation
   if (!formData.get('name')) {
       errorMessage += 'Vui lòng nhập họ tên\n';
       isValid = false;
   }

   if (!formData.get('phone')) {
       errorMessage += 'Vui lòng nhập số điện thoại\n';
       isValid = false;
   }

   if (!formData.get('date')) {
       errorMessage += 'Vui lòng chọn ngày khám\n';
       isValid = false;
   }

   if (!isValid) {
       alert(errorMessage);
       return;
   }

   // Success message
   alert('Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!');
   this.reset();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function(e) {
       e.preventDefault();
       document.querySelector(this.getAttribute('href')).scrollIntoView({
           behavior: 'smooth'
       });
   });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
   const header = document.querySelector('header');
   if (window.scrollY > 100) {
       header.classList.add('shadow-md', 'bg-white/95');
   } else {
       header.classList.remove('shadow-md', 'bg-white/95');
   }
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
   const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));

   if ('IntersectionObserver' in window) {
       let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
           entries.forEach(function(entry) {
               if (entry.isIntersecting) {
                   let lazyImage = entry.target;
                   lazyImage.src = lazyImage.dataset.src;
                   lazyImage.removeAttribute('data-src');
                   lazyImageObserver.unobserve(lazyImage);
               }
           });
       });

       lazyImages.forEach(function(lazyImage) {
           lazyImageObserver.observe(lazyImage);
       });
   }
});