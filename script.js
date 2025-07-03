
// Form handling and interactions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        showLoadingState();
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Show success message
            showToast();
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            resetButtonState();
        }, 1000);
    });

    // Show loading state on submit button
    function showLoadingState() {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            Sending...
        `;
    }

    // Reset button to normal state
    function resetButtonState() {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = `
            <i class="fas fa-paper-plane"></i>
            Send Message
        `;
    }

    // Show toast notification
    function showToast() {
        toast.classList.add('show');
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Form validation
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing validation classes
        field.classList.remove('error');
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        return true;
    }

    function clearValidation(e) {
        e.target.classList.remove('error');
    }

    // Smooth scrolling for any internal links (if needed)
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

    // Add animation classes when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe contact cards for animation
    document.querySelectorAll('.contact-card').forEach(card => {
        observer.observe(card);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }

    // Add focus styles for better accessibility
    document.querySelectorAll('input, select, textarea, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
});

// Add CSS for validation and animation states
const additionalStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .contact-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .contact-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .focused {
        outline: 2px solid #ea580c;
        outline-offset: 2px;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
