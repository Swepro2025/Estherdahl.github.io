document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    nextSlideBtn.addEventListener('click', nextSlide);
    prevSlideBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    heroSlider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    const testimonialDots = document.querySelector('.testimonial-dots');
    
    let currentTestimonial = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        testimonialDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }
    
    nextTestimonialBtn.addEventListener('click', nextTestimonial);
    prevTestimonialBtn.addEventListener('click', prevTestimonial);
    
    // Auto testimonial change
    let testimonialInterval = setInterval(nextTestimonial, 7000);
    
    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(nextTestimonial, 7000);
    });
});