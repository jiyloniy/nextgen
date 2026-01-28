w// Lightbox Gallery Script
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    let mediaElements = [];
    let touchStartX = 0;
    let touchEndX = 0;

    // Create lightbox HTML
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-close" onclick="closeLightbox()">
                <i class="fas fa-times"></i>
            </div>
            <div class="lightbox-prev" onclick="prevImage()">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="lightbox-content" id="lightbox-content"></div>
            <div class="lightbox-next" onclick="nextImage()">
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="lightbox-counter" id="lightbox-counter"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightboxElement = document.getElementById('lightbox');

    // Collect all media elements
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        
        if (img) {
            mediaElements.push({ type: 'image', src: img.src, alt: img.alt });
        } else if (video) {
            const source = video.querySelector('source');
            mediaElements.push({ type: 'video', src: source.src });
        }

        // Add click event
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Open lightbox
    window.openLightbox = function(index) {
        currentIndex = index;
        showMedia();
        lightboxElement.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close lightbox
    window.closeLightbox = function() {
        lightboxElement.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Pause video if playing
        const video = document.querySelector('#lightbox-content video');
        if (video) {
            video.pause();
        }
    };

    // Next image
    window.nextImage = function() {
        currentIndex = (currentIndex + 1) % mediaElements.length;
        showMedia();
    };

    // Previous image
    window.prevImage = function() {
        currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
        showMedia();
    };

    // Show current media
    function showMedia() {
        const content = document.getElementById('lightbox-content');
        const counter = document.getElementById('lightbox-counter');
        const media = mediaElements[currentIndex];

        if (media.type === 'image') {
            content.innerHTML = `<img src="${media.src}" alt="${media.alt || 'Image'}">`;
        } else {
            content.innerHTML = `
                <video controls autoplay>
                    <source src="${media.src}" type="video/mp4">
                </video>
            `;
        }

        counter.textContent = `${currentIndex + 1} / ${mediaElements.length}`;
    }

    // Touch events for mobile swipe
    lightboxElement.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightboxElement.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                prevImage();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxElement.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Close on background click
    lightboxElement.addEventListener('click', function(e) {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // Prevent scrolling when lightbox is open
    lightboxElement.addEventListener('touchmove', function(e) {
        if (e.target === lightboxElement) {
            e.preventDefault();
        }
    }, { passive: false });
});
