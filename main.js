import AOS from 'aos';
import 'aos/dist/aos.css';

// This initializes the animations with our custom luxury settings
AOS.init({
    duration: 1000, // Animations take 1 second (slow and elegant)
    once: true,     // Animations only happen once when scrolling down
    offset: 100,    // Triggers the animation slightly before it comes into view
});