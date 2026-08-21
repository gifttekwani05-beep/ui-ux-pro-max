// AOS-like Animation Observer
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => this.observer.observe(el));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-aos') || 'fade-up';
                const delay = entry.target.getAttribute('data-aos-delay') || '0';
                this.applyAnimation(entry.target, animationType, delay);
                this.observer.unobserve(entry.target);
            }
        });
    }

    applyAnimation(element, type, delay) {
        const animationMap = {
            'fade-up': 'slideUp',
            'fade-down': 'slideDown',
            'fade-left': 'slideLeft',
            'fade-right': 'slideRight',
            'zoom-in': 'zoomIn',
            'fade': 'fadeIn'
        };

        const animation = animationMap[type] || 'slideUp';
        element.style.animation = `${animation} 0.6s ease-out ${delay}ms forwards`;
        element.style.opacity = '0';
        element.style.animationFillMode = 'forwards';
    }
}

// Smooth Scroll Behavior
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Parallax Effect
function setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            el.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}

// Mouse Follow Animation
function setupMouseFollow() {
    const followElement = document.querySelector('.hero-animation');
    if (!followElement) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        followElement.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Animated Counter
function animateCounter(element, targetNumber, duration = 2000) {
    let currentNumber = 0;
    const increment = targetNumber / (duration / 16);

    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            element.textContent = targetNumber;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentNumber);
        }
    }, 16);
}

// Stagger Animation
function staggerAnimation(elements, animation, delayInterval = 100) {
    elements.forEach((el, index) => {
        el.style.animation = `${animation} 0.6s ease-out ${index * delayInterval}ms forwards`;
    });
}

// Ripple Effect on Click
function setupRippleEffect() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.cta-button')) {
            const button = e.target.closest('.cta-button');
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';

            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });
}

// Gradient Animation on Hover
function setupGradientAnimation() {
    const gradientElements = document.querySelectorAll('[class*="gradient"]');
    
    gradientElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'gradientShift 3s ease infinite';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.animation = 'none';
        });
    });
}

// Text Reveal Animation
function revealText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animation = `slideUp 0.5s ease-out ${index * 30}ms forwards`;
        span.style.opacity = '0';
        element.appendChild(span);
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationObserver();
    setupSmoothScroll();
    setupParallax();
    setupMouseFollow();
    setupRippleEffect();
    setupGradientAnimation();
});

// Export for use
window.AnimationUtils = {
    animateCounter,
    staggerAnimation,
    revealText
};