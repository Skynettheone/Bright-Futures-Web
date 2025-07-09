document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Enhanced header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Go to top button functionality
    const goToTopButton = document.querySelector('.go-to-top');
    if (goToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                goToTopButton.classList.add('show');
            } else {
                goToTopButton.classList.remove('show');
            }
        });

        // Smooth scroll to top
        goToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for cards
                if (entry.target.classList.contains('card')) {
                    entry.target.style.animationDelay = 
                        Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1 + 's';
                }
                
                // Special handling for progress bars
                if (entry.target.classList.contains('progress')) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width') || '67%';
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 500);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.card, .stat-item, .progress-bar, .hero-content, .about-content, .cards-header, .involved-content');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Touch device handling
            if ('ontouchstart' in window) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        }
    });

    // Responsive image loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Handle form submissions with better UX
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                submitButton.style.opacity = '0.7';
                submitButton.style.pointerEvents = 'none';
                
                // Add loading state
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Submitting...';
                
                // Reset after 3 seconds (adjust based on your form handling)
                setTimeout(() => {
                    submitButton.style.opacity = '1';
                    submitButton.style.pointerEvents = 'auto';
                    submitButton.textContent = originalText;
                }, 3000);
            }
        });
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
        
        // Navigate to top with Ctrl+Home
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Optimize animations for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Responsive font size adjustment
    function adjustFontSizes() {
        const baseSize = Math.min(window.innerWidth / 90, 16);
        document.documentElement.style.fontSize = baseSize + 'px';
    }

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            adjustFontSizes();
            
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }, 250);
    });

    // Initial font size adjustment
    adjustFontSizes();

    // Add touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        const hoverElements = document.querySelectorAll('.card, .cta-button, .nav-link');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 150);
            });
        });
    }

    // Performance optimization: Passive event listeners
    const passiveEvents = ['scroll', 'touchstart', 'touchmove'];
    passiveEvents.forEach(eventType => {
        document.addEventListener(eventType, function() {}, { passive: true });
    });

    // Current year update for footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    console.log('Mobile responsive enhancements loaded successfully');
});

// CSS Custom Properties for dynamic theming
document.documentElement.style.setProperty('--primary-color', '#FFCC00');
document.documentElement.style.setProperty('--secondary-color', '#2c3e50');
document.documentElement.style.setProperty('--accent-color', '#FFD700');
document.documentElement.style.setProperty('--text-color', '#2c3e50');
document.documentElement.style.setProperty('--background-color', '#ffffff');
document.documentElement.style.setProperty('--border-radius', '12px');
document.documentElement.style.setProperty('--box-shadow', '0 4px 20px rgba(0, 0, 0, 0.1)');
