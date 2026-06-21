import AOS from 'aos';
import 'aos/dist/aos.css';

// This initializes the animations with our custom luxury settings
AOS.init({
    duration: 1000, // Animations take 1 second (slow and elegant)
    once: true,     // Animations only happen once when scrolling down
    offset: 100,    // Triggers the animation slightly before it comes into view
});


// --- MOBILE MENU LOGIC ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        // Slide menu in/out
        mobileMenu.classList.toggle('translate-x-full');

        // Animate Hamburger into an "X"
        bar1.classList.toggle('rotate-45');
        bar1.classList.toggle('translate-y-2');
        bar2.classList.toggle('opacity-0');
        bar3.classList.toggle('-rotate-45');
        bar3.classList.toggle('-translate-y-2');
    });

    // Close menu automatically when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            bar1.classList.remove('rotate-45', 'translate-y-2');
            bar2.classList.remove('opacity-0');
            bar3.classList.remove('-rotate-45', '-translate-y-2');
        });
    });
}
