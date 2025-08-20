document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for collection navigation
    const collectionLinks = document.querySelectorAll('.collection-nav a');
    
    collectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active link
                collectionLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight current collection in nav as user scrolls
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.collection-section').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                collectionLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top-section a');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add to cart functionality (consistent with main site)
	
    const addToCartBtns = document.querySelectorAll('.btn-secondary');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.closest('.collection-item');
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            
            // Here you would add to cart logic
            alert(`${productName} added to cart`);
            
            // Update cart count in header
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + 1;
            }
        });
    });
});