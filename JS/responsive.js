// Global Responsive JavaScript for Bright Futures Website
// This file handles mobile navigation and responsive features across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (navToggle && navMenu) {
        // Enhanced mobile menu toggle with animation timing
        navToggle.addEventListener('click', function() {
            const isActive = navToggle.classList.contains('active');
            
            if (!isActive) {
                // Opening menu
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                
                // Animate menu items with staggered delay
                const navItems = navMenu.querySelectorAll('.nav-item');
                navItems.forEach((item, index) => {
                    item.style.animationDelay = `${0.1 + (index * 0.05)}s`;
                });
                
                // Prevent body scrolling when menu is open on mobile
                if (window.innerWidth <= 768) {
                    document.body.classList.add('nav-open');
                }
            } else {
                // Closing menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Reset animation delays
                const navItems = navMenu.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    item.style.animationDelay = '';
                });
            }
        });
        
        // Handle dropdown clicks on mobile
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('Dropdown clicked:', dropdown); // Debug log
                        
                        // Close other dropdowns first
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        const wasActive = dropdown.classList.contains('active');
                        dropdown.classList.toggle('active');
                        
                        console.log('Dropdown toggled:', !wasActive); // Debug log
                    }
                });
                
                // Also handle touch events for better mobile support
                dropdownToggle.addEventListener('touchstart', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        // The click event will handle the toggle
                    }
                }, { passive: false });
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && !link.classList.contains('dropdown-toggle')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    // Close any open dropdowns
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });
        
        // Close mobile menu when clicking on dropdown links
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });
        
        // Enhanced outside click handling with better detection
        document.addEventListener('click', function(e) {
            const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
            const isMenuActive = navMenu.classList.contains('active');
            
            if (!isClickInsideNav && isMenuActive) {
                // Smooth close animation
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Close dropdowns with animation
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                // Reset nav item animations
                const navItems = navMenu.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    item.style.animationDelay = '';
                });
            }
        });
        
        // Enhanced window resize handling with debouncing
        const handleResize = ResponsiveUtils.debounce(() => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Reset dropdowns and animations
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                const navItems = navMenu.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    item.style.animationDelay = '';
                });
            }
        }, 250);
        
        window.addEventListener('resize', handleResize);
    }
    
    // Go to Top Button functionality
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
    
    // Dynamic year update
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Image loading optimization for mobile
    function optimizeImagesForDevice() {
        const images = document.querySelectorAll('img');
        const isMobile = window.innerWidth <= 768;
        
        images.forEach(img => {
            if (isMobile && img.dataset.mobileSrc) {
                img.src = img.dataset.mobileSrc;
            }
        });
    }
    
    // Run on load and resize
    optimizeImagesForDevice();
    window.addEventListener('resize', optimizeImagesForDevice);
    
    // Lazy loading for better performance on mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Responsive video handling
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (window.innerWidth <= 480) {
            // Pause autoplay videos on small screens to save bandwidth
            video.autoplay = false;
            video.muted = true;
        }
    });
    
    // Form optimization for mobile
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Add better mobile input handling
            if (window.innerWidth <= 768) {
                input.addEventListener('focus', function() {
                    // Scroll input into view on mobile
                    setTimeout(() => {
                        this.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 300);
                });
            }
        });
    });
    
    // Enhanced touch gesture support for mobile navigation
    let touchStartX, touchStartY, touchStartTime;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        const timeDiff = touchEndTime - touchStartTime;
        
        // Detect swipe gestures (minimum 50px movement, maximum 300ms duration)
        if (Math.abs(diffX) > 50 && Math.abs(diffY) < 100 && timeDiff < 300) {
            if (diffX > 0) {
                // Swipe left - close mobile menu with animation
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    
                    // Reset nav item animations
                    const navItems = navMenu.querySelectorAll('.nav-item');
                    navItems.forEach(item => {
                        item.style.animationDelay = '';
                    });
                }
            } else {
                // Swipe right - could trigger menu open (optional)
                // Currently disabled to avoid accidental triggers
            }
        }
    }, { passive: true });
});

// Utility functions for responsive behavior
window.ResponsiveUtils = {
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024,
    
    // Debounce function for resize events
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Smooth scroll utility
    smoothScrollTo: (element, offset = 0) => {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};
