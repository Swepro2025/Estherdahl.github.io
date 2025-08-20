document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image
            const newImageSrc = this.getAttribute('data-large');
            mainImage.src = newImageSrc;
            mainImage.alt = this.querySelector('img').alt;
        });
    });
    
    // Color Swatch Selection
    const colorSwatches = document.querySelectorAll('.swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically update product images based on color selection
        });
    });
    
    // Quantity Selector
    const quantityInput = document.querySelector('.quantity-selector input');
    const minusBtn = document.querySelector('.quantity-selector .minus');
    const plusBtn = document.querySelector('.quantity-selector .plus');
    
    minusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentNode;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.display = 'none';
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.accordion-content').style.display = 'block';
            }
        });
    });
    
    // Image Zoom Functionality
    const zoomImage = document.getElementById('zoom-image');
    const zoomResult = document.getElementById('zoom-result');
    
    if (zoomImage && zoomResult) {
        zoomImage.addEventListener('mousemove', function(e) {
            if (!zoomResult.style.display || zoomResult.style.display === 'none') {
                zoomResult.style.display = 'block';
            }
            
            // Get the position of the image
            const imgRect = this.getBoundingClientRect();
            
            // Calculate the position of the cursor relative to the image
            const x = e.clientX - imgRect.left;
            const y = e.clientY - imgRect.top;
            
            // Calculate the percentage position
            const xPercent = (x / imgRect.width) * 100;
            const yPercent = (y / imgRect.height) * 100;
            
            // Update the background position of the zoom result
            zoomResult.style.backgroundImage = `url(${this.src})`;
            zoomResult.style.backgroundSize = `${imgRect.width * 2}px ${imgRect.height * 2}px`;
            zoomResult.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        });
        
        zoomImage.addEventListener('mouseleave', function() {
            zoomResult.style.display = 'none';
        });
    }
    
    // Add to Cart Functionality
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-info h1').textContent;
            const selectedColor = document.querySelector('.swatch.active').getAttribute('data-color');
            const selectedSize = document.querySelector('#size').value;
            const quantity = document.querySelector('.quantity-selector input').value;
            const price = document.querySelector('.current-price').textContent;
            
            // Here you would typically add to cart logic
            alert(`${quantity} ${productName} (${selectedColor}, ${selectedSize}) added to cart`);
            
            // Update cart count in header
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + parseInt(quantity);
            }
        });
    }
    
    // Wishlist Functionality
    const wishlistBtn = document.querySelector('.wishlist-btn');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart"></i> Saved';
            } else {
                this.innerHTML = '<i class="far fa-heart"></i> Wishlist';
            }
        });
    }
});