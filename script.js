// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initBMICalculator();
    initContactForm();
    initScrollEffects();
    initLoadingAnimations();
    initClassesFilter();

});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Navbar scroll effect removed - header is now static

    // Mobile menu toggle - Değerlendirme formu 8
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on links - Değerlendirme formu 8
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Smooth scrolling for navigation links - Değerlendirme formu 5
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// BMI Calculator functionality
function initBMICalculator() {
    // Add global function for button onclick
    window.calculateBMI = function() {
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const bmiResult = document.getElementById('bmiResult');

        if (height && weight && height > 0 && weight > 0) {
            // BMI calculation: BMI = kg/m²
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const bmiRounded = Math.round(bmi * 10) / 10;

            // Determine BMI category
            let category = '';
            let categoryClass = '';
            let categoryDescription = '';

            if (bmi < 18.5) {
                category = 'Underweight';
                categoryClass = 'underweight';
                categoryDescription = 'You may need to gain weight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal Weight';
                categoryClass = 'normal';
                categoryDescription = 'You have a healthy weight';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
                categoryClass = 'overweight';
                categoryDescription = 'You may need to lose weight';
            } else {
                category = 'Obese';
                categoryClass = 'obese';
                categoryDescription = 'Consider consulting a healthcare provider';
            }

            // Calculate progress percentage for visual representation (0-40 BMI range)
            const progressPercentage = Math.min((bmi / 40) * 100, 100);

            // Display animated result
            displayAnimatedBMIResult(bmiResult, bmiRounded, category, categoryClass, categoryDescription, height, weight, progressPercentage);

            // Scroll to result with delay to allow animation
            setTimeout(() => {
                bmiResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            // Show inline error message instead of alert
            showBMIError(bmiResult, 'Please enter valid height and weight values.');
        }
    };

    // Function to display animated BMI result
    function displayAnimatedBMIResult(resultElement, bmiValue, category, categoryClass, description, height, weight, progressPercentage) {
        // Create the result HTML structure
        resultElement.innerHTML = `
            <div class="bmi-result-header">
                <h4>Your BMI Result</h4>
                <div class="bmi-loading-spinner"></div>
            </div>
            <div class="bmi-visual-container">
                <div class="bmi-circular-progress">
                    <svg class="progress-ring" width="120" height="120">
                        <circle class="progress-ring-background" cx="60" cy="60" r="50"></circle>
                        <circle class="progress-ring-progress ${categoryClass}" cx="60" cy="60" r="50" style="--progress: ${progressPercentage}"></circle>
                    </svg>
                    <div class="bmi-value-container">
                        <div class="bmi-value" data-target="${bmiValue}">0.0</div>
                        <div class="bmi-unit">BMI</div>
                    </div>
                </div>
            </div>
            <div class="bmi-category-container">
                <div class="bmi-category ${categoryClass}">${category}</div>
                <div class="bmi-description">${description}</div>
            </div>
            <div class="bmi-details">
                <div class="bmi-detail-item">
                    <span class="detail-label">Height:</span>
                    <span class="detail-value">${height} cm</span>
                </div>
                <div class="bmi-detail-item">
                    <span class="detail-label">Weight:</span>
                    <span class="detail-value">${weight} kg</span>
                </div>
            </div>
            <div class="bmi-ranges">
                <div class="range-item">
                    <div class="range-color underweight"></div>
                    <span>Underweight (&lt;18.5)</span>
                </div>
                <div class="range-item">
                    <div class="range-color normal"></div>
                    <span>Normal (18.5-24.9)</span>
                </div>
                <div class="range-item">
                    <div class="range-color overweight"></div>
                    <span>Overweight (25-29.9)</span>
                </div>
                <div class="range-item">
                    <div class="range-color obese"></div>
                    <span>Obese (≥30)</span>
                </div>
            </div>
        `;

        // Show result with slide-in animation
        resultElement.classList.remove('show');
        resultElement.classList.add('show', 'animating');

        // Start animations after a short delay
        setTimeout(() => {
            // Hide loading spinner
            const spinner = resultElement.querySelector('.bmi-loading-spinner');
            if (spinner) spinner.style.display = 'none';

            // Animate BMI value counting
            animateValue(resultElement.querySelector('.bmi-value'), 0, bmiValue, 1500);

            // Animate category appearance
            setTimeout(() => {
                resultElement.querySelector('.bmi-category-container').classList.add('show');
            }, 800);

            // Animate details appearance
            setTimeout(() => {
                resultElement.querySelector('.bmi-details').classList.add('show');
            }, 1200);

            // Animate ranges appearance
            setTimeout(() => {
                resultElement.querySelector('.bmi-ranges').classList.add('show');
            }, 1600);

            // Remove animating class
            setTimeout(() => {
                resultElement.classList.remove('animating');
            }, 2000);
        }, 500);
    }

    // Function to show error message
    function showBMIError(resultElement, message) {
        resultElement.innerHTML = `
            <div class="bmi-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
        resultElement.classList.add('show', 'error');

        // Remove error after 3 seconds
        setTimeout(() => {
            resultElement.classList.remove('show', 'error');
        }, 3000);
    }

    // Function to animate number counting
    function animateValue(element, start, end, duration) {
        if (!element) return;

        const startTime = performance.now();
        const startValue = start;
        const endValue = end;

        function updateValue(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (endValue - startValue) * easeOutQuart;

            element.textContent = currentValue.toFixed(1);

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }

        requestAnimationFrame(updateValue);
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Your message has been sent successfully! We will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Classes filter functionality
function initClassesFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classDetails = document.querySelectorAll('.class-detail');

    // Set first button as active and show first content by default
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('active');
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Hide all class details with fade out
            classDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // Show selected class detail with fade in
            setTimeout(() => {
                const targetDetail = document.querySelector(`.class-detail[data-category="${filterValue}"]`);
                if (targetDetail) {
                    targetDetail.classList.add('active');
                }
            }, 150);
        });
    });
}



// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for loading animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.class-card, .trainer-card, .review-card, .purchase-card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Loading animations
function initLoadingAnimations() {
    // Add staggered animation delays
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const trainerCards = document.querySelectorAll('.trainer-card');
    trainerCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });

    const purchaseCards = document.querySelectorAll('.purchase-card');
    purchaseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Utility function for smooth scrolling to any element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add CSS animations for loading effects
const animationStyles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .loading {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .loading.loaded {
        opacity: 1;
        transform: translateY(0);
    }

    .stat-item {
        animation: fadeIn 0.6s ease forwards;
    }

    .class-card,
    .trainer-card,
    .review-card,
    .purchase-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .class-card:hover,
    .trainer-card:hover,
    .review-card:hover,
    .purchase-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
