// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS | can also import JavaScript plugins individually 
import * as bootstrap from 'bootstrap';
import lottie from 'lottie-web';

// Verifica si la página actual es index.html
if (window.location.pathname === '/index.html') {
    // Comprueba si los elementos existen antes de agregar los event listeners
    var scrollButtonFeatures = document.getElementById('scrollButton-features');
    var scrollButtonPricing = document.getElementById('scrollButton-pricing');
    var section1 = document.getElementById('section-1');
    var section2 = document.getElementById('section-2');

    if (scrollButtonFeatures && section1) {
        scrollButtonFeatures.addEventListener('click', function () {
            section1.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (scrollButtonPricing && section2) {
        scrollButtonPricing.addEventListener('click', function () {
            section2.scrollIntoView({ behavior: "smooth" });
        });
    }
} else {
    // Si no estás en la página index.html, el script no hace nada
}



// Create a function to render lottie animation
function renderLottieAnimation() {

    // Render lottie animation ../svg1.json and render in the div with id lottie, lottie2, lottie3 

    lottie.loadAnimation({
        container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../svg1.json'
    });

    lottie.loadAnimation({
        container: document.getElementById('lottie2'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../svg2.json'
    });

    lottie.loadAnimation({
        container: document.getElementById('lottie3'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../svg3.json'
    });
    lottie.loadAnimation({
        container: document.getElementById('lottie4'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../svg4.json'
    });
}

// Call the function to render lottie animation
renderLottieAnimation();
