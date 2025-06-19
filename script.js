// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initBMICalculator();
    initContactForm();
    initScrollEffects();
    initLoadingAnimations();
    initClassesFilter();

    // Mobilde trainer kart overlay tıklama ile aç/kapat
    function initTrainerOverlayMobile() {
        const trainerCards = document.querySelectorAll('.trainer-card');

        function handleTrainerClick() {
            // Sadece mobilde çalışsın
            if (window.innerWidth > 576) return;

            trainerCards.forEach(card => {
                // Önceki event listener'ları temizle
                card.removeEventListener('click', card.trainerClickHandler);

                // Yeni event listener ekle
                card.trainerClickHandler = function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Toggle mantığı
                    if (card.classList.contains('show-overlay')) {
                        card.classList.remove('show-overlay');
                    } else {
                        // Diğer kartların overlay'lerini kapat
                        trainerCards.forEach(c => c.classList.remove('show-overlay'));
                        // Bu kartın overlay'ini aç
                        card.classList.add('show-overlay');
                    }
                };

                card.addEventListener('click', card.trainerClickHandler);
            });
        }

        // İlk yükleme
        handleTrainerClick();

        // Ekran boyutu değiştiğinde
        window.addEventListener('resize', function() {
            if (window.innerWidth > 576) {
                // Desktop'ta overlay'leri kapat ve event listener'ları kaldır
                document.querySelectorAll('.trainer-card.show-overlay').forEach(c => c.classList.remove('show-overlay'));
                trainerCards.forEach(card => {
                    if (card.trainerClickHandler) {
                        card.removeEventListener('click', card.trainerClickHandler);
                    }
                });
            } else {
                // Mobile'da event listener'ları yeniden ekle
                handleTrainerClick();
            }
        });
    }
    initTrainerOverlayMobile();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navClose = document.querySelector('.nav-close');

    // Navbar scroll effect - transparent at top, solid when scrolled
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop <= 0) {
            // At the very top (home section) - transparent background
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        } else {
            // When scrolled - solid background
            navbar.style.background = '#355592';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    });

    // Set initial background color (transparent at start)
    navbar.style.background = 'transparent';

    // Mobile menu toggle - Değerlendirme formu 8
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        if (window.innerWidth <= 576) {
            if (navMenu.classList.contains('active')) {
                navClose.style.display = 'flex';
            } else {
                navClose.style.display = 'none';
            }
        }
    });

    navClose.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        navClose.style.display = 'none';
    });

    // Close mobile menu when clicking on links - Değerlendirme formu 8
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            navClose.style.display = 'none';
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
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiResultSimple = document.getElementById('bmiResultSimple');

    // Başlangıçta gizle
    bmiResultSimple.style.display = 'none';

    function animateBMIResult(html) {
        bmiResultSimple.classList.remove('hide');
        bmiResultSimple.style.opacity = 0;
        bmiResultSimple.innerHTML = html;
        bmiResultSimple.classList.add('show');
        bmiResultSimple.style.display = 'flex';
        setTimeout(() => {
            bmiResultSimple.style.transition = 'opacity 0.4s';
            bmiResultSimple.style.opacity = 1;
        }, 50);
    }

    function hideBMIResult() {
        bmiResultSimple.classList.remove('show');
        bmiResultSimple.classList.add('hide');
        bmiResultSimple.style.opacity = 0;
        // Animasyon bitince display:none yap
        bmiResultSimple.addEventListener('animationend', function handler(e) {
            if (e.animationName === 'fadeOut') {
                bmiResultSimple.style.display = 'none';
                bmiResultSimple.classList.remove('hide');
                bmiResultSimple.removeEventListener('animationend', handler);
            }
        });
    }

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (height && weight && height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const bmiRounded = Math.round(bmi * 10) / 10;

            let category = '';
            let categoryClass = '';

            if (bmi < 18.5) {
                category = 'Underweight';
                categoryClass = 'underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal';
                categoryClass = 'normal';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
                categoryClass = 'overweight';
            } else if (bmi >= 30 && bmi < 35) {
                category = 'Obese';
                categoryClass = 'obese';
            } else {
                category = 'Extremely Obese';
                categoryClass = 'extremely-obese';
            }

            const html = `
                <div class=\"bmi-value-simple\">${bmiRounded}</div>
                <div class=\"bmi-category-simple ${categoryClass}\">${category}
                    <div class=\"bmi-details\">${height}cm | ${weight}kg</div>
                </div>
            `;
            animateBMIResult(html);
        } else {
            // Geçersizse animasyonlu olarak gizle
            hideBMIResult();
            bmiResultSimple.innerHTML = '';
        }
    }

    // Add input event listeners
    if (heightInput && weightInput) {
        heightInput.addEventListener('input', calculateBMI);
        weightInput.addEventListener('input', calculateBMI);
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
