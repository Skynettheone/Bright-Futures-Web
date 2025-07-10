// Mobile responsive utilities for Bright Futures website
// This file ensures consistent mobile behavior across all pages

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileFeatures);
    } else {
        initMobileFeatures();
    }
    
    function initMobileFeatures() {
        setupMobileMenu();
        setupMobileDropdowns();
        setupResponsiveHelpers();
        setupTouchOptimizations();
    }
    
    function setupMobileMenu() {
        // Create toggle function if it doesn't exist
        if (typeof window.toggleMobileMenu !== 'function') {
            window.toggleMobileMenu = function() {
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                
                if (navMenu && mobileToggle) {
                    navMenu.classList.toggle('active');
                    mobileToggle.classList.toggle('active');
                }
            };
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const nav = document.querySelector('.nav-container');
            
            if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
                if (!nav.contains(e.target)) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    closeAllDropdowns();
                }
            }
        });
        
        // Close menu on non-dropdown nav links
        document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu on dropdown links
        document.querySelectorAll('.dropdown-link').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
                closeAllDropdowns();
            });
        });
    }
    
    function setupMobileDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const isActive = dropdown.classList.contains('active');
                        
                        // Close all dropdowns first
                        closeAllDropdowns();
                        
                        // Toggle current dropdown
                        if (!isActive) {
                            dropdown.classList.add('active');
                        }
                    }
                });
            }
        });
    }
    
    function setupResponsiveHelpers() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                    closeAllDropdowns();
                }
            }, 100);
        });
        
        // Prevent zoom on double tap for iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    function setupTouchOptimizations() {
        // Add touch class to body for CSS targeting
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }
        
        // Improve tap highlighting
        const interactiveElements = document.querySelectorAll('button, a, .nav-link, .card, input, textarea');
        interactiveElements.forEach(element => {
            element.style.webkitTapHighlightColor = 'rgba(255, 204, 0, 0.2)';
        });
    }
    
    function closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu) navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
    }
    
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Export functions for use in other scripts
    window.MobileUtils = {
        closeMobileMenu: closeMobileMenu,
        closeAllDropdowns: closeAllDropdowns,
        toggleMobileMenu: window.toggleMobileMenu
    };
    
})();
