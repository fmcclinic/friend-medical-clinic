// components/specialties/specialties.js
document.addEventListener('DOMContentLoaded', function() {
    // Get all specialty cards
    const cards = document.querySelectorAll('.specialty-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add delay for each card
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe each card
    cards.forEach(card => observer.observe(card));

    // Handle detail buttons
    const detailButtons = document.querySelectorAll('.specialty-card button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = e.target.closest('.specialty-card');
            const specialtyName = card.querySelector('h3').textContent;
            
            // You can add modal or navigation logic here
            console.log(`Showing details for: ${specialtyName}`);
        });
    });
});