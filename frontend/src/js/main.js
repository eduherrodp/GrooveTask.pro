import lottie from 'lottie-web';
import AOS from 'aos';
document.addEventListener('DOMContentLoaded', () => {
     // Initialize AOS for scroll animations
     AOS.init({
        debounceDelay: 50, // The delay on debounce used while resizing window (in ms)
        offset: 100, // Offset (in px) from the original trigger point
        duration: 1800, // Duration of animation (in ms)
        easing: 'ease', // Easing type
        once: false, 
        mirror: true,
        delay: 50,
    });

    function scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Function to load lottie animation
    function renderLottieAnimation() {
        const animations = [
            { id: 'lottie', path: '../assets/svg1.json' },
            { id: 'lottie2', path: '../assets/svg2.json' },
            { id: 'lottie3', path: '../assets/svg3.json' },
            { id: 'lottie4', path: '../assets/svg4.json' },
        ];
        animations.forEach(animation => {
            const container = document.getElementById(animation.id);
            if (container) {
                lottie.loadAnimation({
                    container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: animation.path,
                });
            }
        });
    }

    // Check if the current page is index.html
    const title = document.getElementsByTagName('title')[0].innerHTML;
    if (title === 'GrooveTask') {
        // Event listeners for the scroll buttons
        document.getElementById('scrollButton-features')?.addEventListener('click', () => {
            scrollToElement('#section-1');
        });
        document.getElementById('scrollButton-pricing')?.addEventListener('click', () => {
            scrollToElement('#section-2');
        });
    }

    // Event listener for the get started button
    const getStarted = document.getElementById('getStarted');
    if (getStarted) {
        getStarted.addEventListener('click', () => {
            window.location.href = '../pages/signup.html';
        });
    }

    // Render lottie animation
    renderLottieAnimation();
});
