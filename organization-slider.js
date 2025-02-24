document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.org-slider');
    const dots = document.querySelectorAll('.org-slider-dot');

    // Check if slider elements exist
    if (!slider || !dots.length) {
        console.warn('Organization slider elements not found');
        return;
    }

    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoPlayInterval;

    function goToSlide(index) {
        if (!slider) return;
        slider.style.transform = `translateX(-${index * 25}%)`;        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                // Swipe left
                goToSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 0) {
                // Swipe right
                goToSlide(currentSlide - 1);
            }
        }
    }

    // Start auto-play
    startAutoPlay();
});