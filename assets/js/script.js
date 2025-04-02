// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Navbar scroll effect with blur
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-white/95', 'shadow-lg');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling with loading state
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        
        try {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-0 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('translate-y-0');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-y-[-100%]');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.card, .testimonial-card').forEach(card => {
    card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-500');
    observer.observe(card);
});

// Testimonial slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-card');
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
    }
    
    // Auto-advance slides
    setInterval(nextSlide, 5000);
}

// Add hover effect to service cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('shadow-2xl', 'scale-105');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('shadow-2xl', 'scale-105');
    });
}); 