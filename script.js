const imagesData = [
  // Nature
  { id: 1, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop', category: 'nature', title: 'Forest Pathway' },
  { id: 2, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop', category: 'nature', title: 'Mountain Landscape' },
  { id: 3, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000&auto=format&fit=crop', category: 'nature', title: 'Serene Lake' },
  // Architecture
  { id: 4, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop', category: 'architecture', title: 'Modern Skyscraper' },
  { id: 5, src: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1000&auto=format&fit=crop', category: 'architecture', title: 'Geometric Building' },
  { id: 6, src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1000&auto=format&fit=crop', category: 'architecture', title: 'City Street' },
  // Animals
  { id: 7, src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop', category: 'animals', title: 'Curious Cat' },
  { id: 8, src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop', category: 'animals', title: 'Loyal Dog' },
  { id: 9, src: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1000&auto=format&fit=crop', category: 'animals', title: 'Red Fox' }
];

const galleryContainer = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
let currentFilteredImages = [...imagesData];

// Initialize Gallery
function renderGallery(images) {
  galleryContainer.innerHTML = '';
  
  images.forEach((img, index) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.setAttribute('data-category', img.category);
    
    // Using a closure to capture the correct filtered index for lightbox
    item.addEventListener('click', () => openLightbox(index));
    
    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy">
      <div class="overlay">
        <div class="info">
          <h3>${img.title}</h3>
          <span>${img.category}</span>
        </div>
      </div>
    `;
    
    galleryContainer.appendChild(item);
  });
}

// Initial render
renderGallery(currentFilteredImages);

// Filtering Logic
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    e.target.classList.add('active');
    
    const category = e.target.getAttribute('data-category');
    
    if (category === 'all') {
      currentFilteredImages = [...imagesData];
    } else {
      currentFilteredImages = imagesData.filter(img => img.category === category);
    }
    
    // Re-render gallery with animation delay effect
    galleryContainer.style.opacity = '0';
    setTimeout(() => {
      renderGallery(currentFilteredImages);
      galleryContainer.style.opacity = '1';
    }, 300);
  });
});

galleryContainer.style.transition = 'opacity 0.3s ease';

// Lightbox Logic
function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxContent();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const currentImage = currentFilteredImages[currentImageIndex];
  lightboxImg.src = currentImage.src;
  lightboxImg.alt = currentImage.title;
  lightboxCaption.textContent = currentImage.title;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentFilteredImages.length;
  updateLightboxContent();
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentFilteredImages.length) % currentFilteredImages.length;
  updateLightboxContent();
}

// Event Listeners for Lightbox Controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close Lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
    closeLightbox();
  }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNextImage();
  if (e.key === 'ArrowLeft') showPrevImage();
});
