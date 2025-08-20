document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cookie management modal (simplified version)
    const manageCookiesBtn = document.getElementById('manageCookies');
    if (manageCookiesBtn) {
        manageCookiesBtn.addEventListener('click', function() {
            alert('Cookie preference center would open here. In a real implementation, this would show a modal with cookie settings.');
        });
    }

    // Mobile menu toggle (same as main site)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Initialize cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('estherDahlCart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    updateCartCount();

    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.privacy-section');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});