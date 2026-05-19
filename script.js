// Gerai Pitch Deck JS
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slide navigation
    const slides = Array.from(document.querySelectorAll('.slide'));
    const navDots = document.querySelector('.slide-nav-dots');
    let currentSlide = 0;

    // Create navigation dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        dot.dataset.slideIndex = index;
        navDots.appendChild(dot);

        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Update active dot
    function updateActiveDot(index) {
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        currentSlide = index;
        window.scrollTo({
            top: slides[index].offsetTop,
            behavior: 'smooth'
        });
        updateActiveDot(index);
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            goToSlide(Math.min(currentSlide + 1, slides.length - 1));
        } else if (e.key === 'ArrowUp') {
            goToSlide(Math.max(currentSlide - 1, 0));
        }
    });

    // Reveal-on-scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Update current slide for dots
                const slideIndex = slides.indexOf(entry.target);
                if (slideIndex !== -1) {
                    currentSlide = slideIndex;
                    updateActiveDot(slideIndex);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe all slides
    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Initialize first dot as active
    updateActiveDot(0);
});