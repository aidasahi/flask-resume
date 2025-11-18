// ===================================
// ACCORDION TOGGLE FUNCTION
// ===================================

/**
 * This function toggles (opens/closes) accordion items
 * It's called when user clicks on accordion header
 * @param {HTMLElement} header - The clicked accordion header
 */
function toggleAccordion(header) {
    // Get the parent accordion item
    const accordionItem = header.parentElement;
    
    // Check if this accordion is currently active (open)
    const isActive = accordionItem.classList.contains('active');
    
    // Close ALL accordions first (optional - comment out if you want multiple open at once)
    const allAccordions = document.querySelectorAll('.accordion-item');
    allAccordions.forEach(item => {
        item.classList.remove('active');
    });
    
    // If this accordion was NOT active, open it
    // (If it WAS active, it stays closed after the above loop)
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}


// ===================================
// CONTACT FORM HANDLING
// ===================================

/**
 * Wait for the page to fully load before running this code
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the contact form element
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Add event listener for form submission
    contactForm.addEventListener('submit', function(e) {
        // Prevent the default form submission (which would reload the page)
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Send data to Flask backend using fetch API
        fetch('/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())  // Convert response to JSON
        .then(data => {
            // Show success message
            formMessage.textContent = data.message;
            formMessage.className = 'form-message success';
            
            // Clear the form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            // Show error message if something went wrong
            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
            
            console.error('Error:', error);
        });
    });
});


// ===================================
// SMOOTH SCROLL ANIMATION (Optional Enhancement)
// ===================================

/**
 * This adds a smooth scroll effect when clicking on internal links
 * (Currently not used, but you can add navigation links later)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===================================
// SCROLL ANIMATIONS (Optional Enhancement)
// ===================================

/**
 * Add animations when elements come into view while scrolling
 * This is optional but adds a nice touch!
 */
function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Call the scroll animation function when page loads
document.addEventListener('DOMContentLoaded', addScrollAnimations);


// ===================================
// CONSOLE MESSAGE (Fun Easter Egg!)
// ===================================

console.log('%c👋 Hello there!', 'font-size: 20px; color: #C1666B; font-weight: bold;');
console.log('%cThanks for checking out my code! - Aida', 'font-size: 14px; color: #2C3E50;');
console.log('%cMath • Code • Curiosity', 'font-style: italic; color: #8B956D;');