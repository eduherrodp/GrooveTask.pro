// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS | can also import JavaScript plugins individually 
import * as bootstrap from 'bootstrap';
import lottie from 'lottie-web';

// Create a function when scrollbutton is clicked scroll to the next section (just the first section)
document.getElementById('scrollButton-features').addEventListener('click', function() {
    document.getElementById('section-1').scrollIntoView({behavior: "smooth"});
});
document.getElementById('scrollButton-pricing').addEventListener('click', function() {
    document.getElementById('section-1').scrollIntoView({behavior: "smooth"});
});

document.getElementById('scrollButton-pricing').addEventListener('click', function() {
    document.getElementById('section-2').scrollIntoView({behavior: "smooth"});
});

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
}

// Call the function to render lottie animation
renderLottieAnimation();
