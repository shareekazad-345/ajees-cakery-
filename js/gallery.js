// 1. IMPORT OUR DATA
// We are bringing in the cakes and categories from our data file.
import { galleryItems, categories } from './galleryData.js';

// 2. GRAB THE HTML ELEMENTS
// We tell JavaScript to find the empty containers we made in gallery.html
const filterContainer = document.getElementById('filter-container');
const galleryGrid = document.getElementById('gallery-grid');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// State variables to keep track of what we are looking at
let currentCategory = 'All';
let currentImageIndex = 0;
let currentlyDisplayedItems = [...galleryItems]; // A copy of the items currently on screen

// 3. BUILD THE FILTER BUTTONS
function renderFilters() {
    filterContainer.innerHTML = ''; // Clear it out first

    categories.forEach(category => {
        const button = document.createElement('button');
        // Basic styling for all buttons
        button.className = "px-6 py-2 rounded-full font-medium tracking-widest text-xs uppercase transition-all duration-300 border ";

        // If this button is the active category, make it filled with Sage Green
        if (category === currentCategory) {
            button.className += "bg-[#A3B19B] text-white border-[#A3B19B] shadow-md";
        } else {
            // Otherwise, make it an outline button
            button.className += "bg-transparent text-[#747A59] border-[#A3B19B]/50 hover:bg-[#A3B19B]/10";
        }

        button.innerText = category;

        // When clicked, change the category and redraw the gallery!
        button.addEventListener('click', () => {
            currentCategory = category;
            renderFilters(); // Redraw buttons to update the active color
            renderGallery(); // Redraw the cakes!
        });

        filterContainer.appendChild(button);
    });
}

// 4. BUILD THE GALLERY GRID
function renderGallery() {
    galleryGrid.innerHTML = ''; // Clear out the old cakes

    // Filter the items based on the chosen category
    if (currentCategory === 'All') {
        currentlyDisplayedItems = [...galleryItems];
    } else {
        currentlyDisplayedItems = galleryItems.filter(item => item.category === currentCategory);
    }

    // Loop through the filtered items and create HTML for each one
    currentlyDisplayedItems.forEach((item, index) => {
        // We use Template Literals (the backticks ` `) to inject variables directly into HTML
        const cardHTML = `
      <div class="break-inside-avoid relative group rounded-[2rem] p-2 ${item.bgColor} border ${item.borderColor} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer mb-6" data-index="${index}">
        <div class="w-full ${item.heightClass} bg-white/50 rounded-[1.5rem] overflow-hidden relative">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          
          <div class="absolute inset-0 bg-[#3A4D39]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
             <span class="text-white font-['Playfair_Display'] italic text-xl tracking-wider drop-shadow-md px-4 text-center">View Details</span>
          </div>
        </div>
      </div>
    `;

        // Convert the string into a real HTML element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        const cardElement = tempDiv.firstElementChild;

        // Make the card open the lightbox when clicked
        cardElement.addEventListener('click', () => openLightbox(index));

        // Add it to the grid
        galleryGrid.appendChild(cardElement);
    });
}

// 5. LIGHTBOX LOGIC
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();

    // Remove 'hidden' and fade it in
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    // Small delay allows the CSS transition to happen smoothly
    setTimeout(() => lightbox.classList.remove('opacity-0'), 10);

    // Prevent the background website from scrolling while the lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    // Fade out
    lightbox.classList.add('opacity-0');

    // Wait for the fade out to finish (500ms), then hide it completely
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Allow scrolling again
    }, 500);
}

function updateLightboxImage() {
    const currentItem = currentlyDisplayedItems[currentImageIndex];
    lightboxImg.src = currentItem.image;
    lightboxCaption.innerText = currentItem.title;
}

// Next / Previous Buttons
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentlyDisplayedItems.length) % currentlyDisplayedItems.length;
    updateLightboxImage();
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentlyDisplayedItems.length;
    updateLightboxImage();
});

// Close button and clicking outside the image
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    // If they clicked the dark background (not the image itself), close it
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// INITIALIZE THE PAGE
// When the script first loads, draw the filters and the gallery!
renderFilters();
renderGallery();
