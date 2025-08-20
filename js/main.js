document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Search Modal
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.querySelector('.search-modal');
    const closeSearch = document.querySelector('.close-search');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchModal.classList.add('active');
    });
    
    closeSearch.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });

    // Cart Sidebar
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.btn-secondary');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartTotal = document.querySelector('.total-amount');
    
    let cart = [];
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.closest('.collection-item');
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            const productImg = product.querySelector('img').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show cart sidebar
            cartSidebar.classList.add('active');
            
            // Show success message
            alert(`${productName} has been added to your cart.`);
        });
    });
    
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartItemsContainer.innerHTML = '';
        } else {
            emptyCart.style.display = 'none';
            
            let cartHTML = '';
            let totalAmount = 0;
            
            cart.forEach((item, index) => {
                const priceNumber = parseFloat(item.price.replace('$', '').replace(',', ''));
                totalAmount += priceNumber * item.quantity;
                
                cartHTML += `
                    <div class="cart-item">
                        <div class="cart-item-img">
                            <img src="${item.img}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">${item.price}</div>
                            <div class="cart-item-remove" data-index="${index}">Remove</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = cartHTML;
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    cart.splice(index, 1);
                    updateCart();
                });
            });
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                        updateCart();
                    }
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    cart[index].quantity += 1;
                    updateCart();
                });
            });
        }
    }
    
    // Initialize cart
    updateCart();
});