// Configuration
const CONFIG = {
    API_KEY: [...'h82S0GkwM3BZFcKsV9z4vvIQUY3v0NOo9F4dit5FsfXzRJMfew0Lmmrr'].join(''),
    BATCH_SIZE: 20,
    SCROLL_THRESHOLD: 100,
    DEBOUNCE_DELAY: 500,
    SWIPE_THRESHOLD: 50,
    DEFAULT_QUERY: 'beautiful'
};

// State management using a singleton pattern
const GalleryState = {
    currentPage: 1,
    currentCategory: 'all',
    currentSearch: '',
    loading: false,
    currentImages: [],
    currentView: 'grid',
    currentFilter: 'all',
    currentImageIndex: 0,
    
    // Reset state
    reset() {
        this.currentPage = 1;
        this.currentImages = [];
    }
};

// DOM Elements cache
const Elements = {
    galleryGrid: document.getElementById('galleryGrid'),
    loadingElement: document.getElementById('loading'),
    modal: document.getElementById('modal'),
    modalImage: document.getElementById('modalImage'),
    modalPhotographer: document.getElementById('modalPhotographer'),
    modalDescription: document.getElementById('modalDescription'),
    modalCamera: document.getElementById('modalCamera'),
    modalDimensions: document.getElementById('modalDimensions'),
    modalDate: document.getElementById('modalDate'),
    searchInput: document.querySelector('.search-input'),
    toast: document.getElementById('toast')
};

// Utility functions
const Utils = {
    debounce(func, delay = CONFIG.DEBOUNCE_DELAY) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    },

    async fetchWithRetry(url, options, retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return await response.json();
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
            }
        }
    },

    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },

    getRandomViews() {
        return Math.floor(1000 + Math.random() * 9000);
    }
};

// API Service
const ApiService = {
    async fetchImages(category, page, search = '') {
        const query = search || (category === 'all' ? CONFIG.DEFAULT_QUERY : category);
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${CONFIG.BATCH_SIZE}&page=${page}`;
        
        try {
            const data = await Utils.fetchWithRetry(url, {
                headers: { 'Authorization': CONFIG.API_KEY }
            });
            return data.photos;
        } catch (error) {
            console.error('Error fetching images:', error);
            throw new Error('Failed to load images. Please try again.');
        }
    }
};

// UI Components
const UI = {
    showToast(message, duration = 3000) {
        Elements.toast.textContent = message;
        Elements.toast.style.display = 'block';
        setTimeout(() => Elements.toast.style.display = 'none', duration);
    },

    setLoading(isLoading) {
        GalleryState.loading = isLoading;
        Elements.loadingElement.style.display = isLoading ? 'flex' : 'none';
    },

    createImageElement(photo) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.photographer;
        img.loading = 'lazy';
        
        const info = document.createElement('div');
        info.className = 'image-info';
        
        const photographerEl = document.createElement('div');
        photographerEl.className = 'photographer';
        photographerEl.textContent = photo.photographer;
        
        const stats = document.createElement('div');
        stats.className = 'image-stats';
        stats.innerHTML = `
            <span>📏 ${photo.width} × ${photo.height}</span>
            <span>👁️ ${Utils.formatNumber(Utils.getRandomViews())}</span>
        `;
        
        info.append(photographerEl, stats);
        div.append(img, info);
        
        div.addEventListener('click', () => {
            GalleryState.currentImageIndex = GalleryState.currentImages.indexOf(photo);
            this.showModal(photo);
        });
        
        return div;
    },

    async displayImages(photos, append = false) {
        if (!append) {
            Elements.galleryGrid.innerHTML = '';
            GalleryState.currentImages = [];
        }

        if (photos.length === 0 && !append) {
            Elements.galleryGrid.innerHTML = `
                <div class="no-results">
                    No images found. Try a different search or filter.
                </div>`;
            return;
        }

        const fragment = document.createDocumentFragment();
        photos.forEach(photo => {
            GalleryState.currentImages.push(photo);
            fragment.appendChild(this.createImageElement(photo));
        });
        
        Elements.galleryGrid.appendChild(fragment);
    },

    showModal(photo) {
        Elements.modal.style.display = 'block';
        Elements.modalImage.src = photo.src.large2x;
        Elements.modalPhotographer.textContent = `Photographer: ${photo.photographer}`;
        Elements.modalDescription.textContent = photo.alt || 'No description available';
        Elements.modalDimensions.textContent = `${photo.width} × ${photo.height}`;
        
        document.body.style.overflow = 'hidden';
        this.updateModalNavigation();
    },

    updateModalNavigation() {
        const prevBtn = Elements.modal.querySelector('.prev');
        const nextBtn = Elements.modal.querySelector('.next');
        
        prevBtn.style.visibility = GalleryState.currentImageIndex > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = GalleryState.currentImageIndex < GalleryState.currentImages.length - 1 ? 'visible' : 'hidden';
    }
};

// Event Handlers
const EventHandlers = {
    async handleSearch(event) {
        GalleryState.currentSearch = event.target.value.trim();
        GalleryState.reset();
        
        try {
            UI.setLoading(true);
            const photos = await ApiService.fetchImages(
                GalleryState.currentCategory,
                GalleryState.currentPage,
                GalleryState.currentSearch
            );
            await UI.displayImages(photos);
        } catch (error) {
            UI.showToast(error.message);
        } finally {
            UI.setLoading(false);
        }
    },

    async handleScroll() {
        if (GalleryState.loading) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - CONFIG.SCROLL_THRESHOLD) {
            try {
                UI.setLoading(true);
                GalleryState.currentPage++;
                const photos = await ApiService.fetchImages(
                    GalleryState.currentCategory,
                    GalleryState.currentPage,
                    GalleryState.currentSearch
                );
                await UI.displayImages(photos, true);
            } catch (error) {
                UI.showToast(error.message);
                GalleryState.currentPage--;
            } finally {
                UI.setLoading(false);
            }
        }
    },

    handleModalNavigation(direction) {
        const newIndex = GalleryState.currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < GalleryState.currentImages.length) {
            GalleryState.currentImageIndex = newIndex;
            UI.showModal(GalleryState.currentImages[newIndex]);
        }
    },

    async downloadImage(url, filename) {
        UI.showToast('Starting download...');
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            UI.showToast('Download complete!');
        } catch (error) {
            UI.showToast('Download failed. Please try again.');
        }
    }
};

// Initialize event listeners
function initializeEventListeners() {
    // Search with debounce
    Elements.searchInput.addEventListener('input', 
        Utils.debounce(EventHandlers.handleSearch)
    );

    // Infinite scroll with throttle
    window.addEventListener('scroll', 
        Utils.debounce(EventHandlers.handleScroll, 100)
    );

    // Modal navigation
    document.addEventListener('keydown', (e) => {
        if (Elements.modal.style.display === 'block') {
            if (e.key === 'Escape') {
                Elements.modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                EventHandlers.handleModalNavigation(-1);
            } else if (e.key === 'ArrowRight') {
                EventHandlers.handleModalNavigation(1);
            }
        }
    });

    // Download button
    document.querySelector('.download-btn').addEventListener('click', () => {
        const photo = GalleryState.currentImages[GalleryState.currentImageIndex];
        EventHandlers.downloadImage(
            photo.src.original,
            `pexels-${photo.photographer}-${photo.id}.jpg`
        );
    });
}

// Initialize the gallery
async function initializeGallery() {
    try {
        UI.setLoading(true);
        initializeEventListeners();
        const photos = await ApiService.fetchImages(
            GalleryState.currentCategory,
            GalleryState.currentPage,
            GalleryState.currentSearch
        );
        await UI.displayImages(photos);
    } catch (error) {
        UI.showToast(error.message);
    } finally {
        UI.setLoading(false);
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initializeGallery);

// Mock data for the gallery
const mockImages = [
    {
        id: 1,
        url: '/api/placeholder/800/1200',
        title: 'Mountain Landscape',
        photographer: 'John Doe',
        camera: 'Sony A7III',
        dimensions: '3000 x 4000',
        date: '2024-03-15',
        category: 'nature',
        description: 'A stunning view of the mountains at sunrise.',
    },
    // Add more mock images as needed
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalPhotographer = document.getElementById('modalPhotographer');
const modalDescription = document.getElementById('modalDescription');
const modalCamera = document.getElementById('modalCamera');
const modalDimensions = document.getElementById('modalDimensions');
const modalDate = document.getElementById('modalDate');
const loading = document.getElementById('loading');
const toast = document.getElementById('toast');

// State
let currentImageIndex = 0;
let currentImages = [...mockImages];
let currentView = 'grid';
let isLoading = false;

// Initialize gallery
function initGallery() {
    setupEventListeners();
    loadImages();
    setupInfiniteScroll();
}

// Event Listeners
function setupEventListeners() {
    // Close filter menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
            filterMenu.style.display = 'none';
        }
    });

    // Modal navigation
    document.querySelector('.prev').addEventListener('click', showPreviousImage);
    document.querySelector('.next').addEventListener('click', showNextImage);
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeModal();
        }
    });

    // Like button
    document.querySelector('.like-btn').addEventListener('click', handleLike);

    // Share button
    document.querySelector('.share-btn').addEventListener('click', handleShare);

    // Download button
    document.querySelector('.download-btn').addEventListener('click', handleDownload);
}

// Load images
function loadImages(append = false) {
    isLoading = true;
    loading.classList.add('active');

    // Simulate API call
    setTimeout(() => {
        if (!append) {
            galleryGrid.innerHTML = '';
        }

        currentImages.forEach((image, index) => {
            const item = createGalleryItem(image, index);
            galleryGrid.appendChild(item);
        });

        isLoading = false;
        loading.classList.remove('active');
    }, 1000);
}

// Create gallery item
function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
        <img src="${image.url}" alt="${image.title}">
        <div class="gallery-item-overlay">
            <h3 class="gallery-item-title">${image.title}</h3>
            <p class="gallery-item-photographer">by ${image.photographer}</p>
        </div>
    `;

    item.addEventListener('click', () => openModal(index));
    return item;
}

// Modal functions
function openModal(index) {
    currentImageIndex = index;
    updateModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalContent() {
    const image = currentImages[currentImageIndex];
    modalImage.src = image.url;
    modalPhotographer.textContent = image.photographer;
    modalDescription.textContent = image.description;
    modalCamera.textContent = image.camera;
    modalDimensions.textContent = image.dimensions;
    modalDate.textContent = new Date(image.date).toLocaleDateString();
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateModalContent();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateModalContent();
}

// Interaction handlers
function handleLike() {
    const likeBtn = document.querySelector('.like-btn');
    likeBtn.querySelector('i').classList.toggle('far');
    likeBtn.querySelector('i').classList.toggle('fas');
    showToast('Added to favorites');
}

function handleShare() {
    // Implement sharing functionality
    showToast('Sharing options opened');
}

function handleDownload() {
    // Implement download functionality
    showToast('Download started');
}

// Filter images
function filterImages(category) {
    currentImages = category === 'all' 
        ? [...mockImages]
        : mockImages.filter(img => img.category === category);
    loadImages();
}

// Update gallery view
function updateGalleryView() {
    galleryGrid.className = `gallery-grid ${currentView}-view`;
}


// Enhanced Modal UI Component
class CarouselModal {
    constructor() {
        this.createModalElement();
        this.bindEvents();
        this.touchStartX = 0;
        this.currentImageIndex = 0;
    }

    createModalElement() {
        const modalHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <button class="nav-btn prev-btn">‹</button>
                <button class="nav-btn next-btn">›</button>
                
                <div class="modal-image-container">
                    <img src="" alt="" class="modal-image">
                    <div class="loading-spinner"></div>
                </div>

                <div class="modal-info">
                    <div class="modal-header">
                        <h2 class="photographer-name"></h2>
                        <div class="modal-actions">
                            <button class="action-btn download-btn">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="action-btn share-btn">
                                <i class="fas fa-share"></i> Share
                            </button>
                        </div>
                    </div>
                    
                    <div class="image-details">
                        <div class="detail-item">
                            <span class="detail-label">Dimensions:</span>
                            <span class="dimensions"></span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Views:</span>
                            <span class="views"></span>
                        </div>
                    </div>
                    
                    <p class="image-description"></p>

                    <div class="share-menu hidden">
                        <button class="share-option" data-platform="twitter">
                            <i class="fab fa-twitter"></i> Twitter
                        </button>
                        <button class="share-option" data-platform="facebook">
                            <i class="fab fa-facebook"></i> Facebook
                        </button>
                        <button class="share-option" data-platform="copy">
                            <i class="fas fa-link"></i> Copy Link
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.modal = document.createElement('div');
        this.modal.className = 'carousel-modal';
        this.modal.innerHTML = modalHTML;
        document.body.appendChild(this.modal);

        // Cache DOM elements
        this.elements = {
            overlay: this.modal.querySelector('.modal-overlay'),
            content: this.modal.querySelector('.modal-content'),
            image: this.modal.querySelector('.modal-image'),
            prevBtn: this.modal.querySelector('.prev-btn'),
            nextBtn: this.modal.querySelector('.next-btn'),
            closeBtn: this.modal.querySelector('.modal-close'),
            downloadBtn: this.modal.querySelector('.download-btn'),
            shareBtn: this.modal.querySelector('.share-btn'),
            shareMenu: this.modal.querySelector('.share-menu'),
            photographerName: this.modal.querySelector('.photographer-name'),
            dimensions: this.modal.querySelector('.dimensions'),
            views: this.modal.querySelector('.views'),
            description: this.modal.querySelector('.image-description'),
            loadingSpinner: this.modal.querySelector('.loading-spinner')
        };
    }

    bindEvents() {
        // Navigation events
        this.elements.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.elements.nextBtn.addEventListener('click', () => this.navigate(1));
        
        // Close modal events
        this.elements.closeBtn.addEventListener('click', () => this.close());
        this.elements.overlay.addEventListener('click', () => this.close());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        });

        // Touch events for swipe
        this.modal.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        this.modal.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = this.touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                this.navigate(diff > 0 ? 1 : -1);
            }
        });

        // Download and share events
        this.elements.downloadBtn.addEventListener('click', () => this.downloadCurrentImage());
        this.elements.shareBtn.addEventListener('click', () => this.toggleShareMenu());

        // Share options events
        this.modal.querySelectorAll('.share-option').forEach(button => {
            button.addEventListener('click', (e) => this.handleShare(e.currentTarget.dataset.platform));
        });

        // Image load event
        this.elements.image.addEventListener('load', () => {
            this.elements.loadingSpinner.style.display = 'none';
            this.elements.image.style.opacity = '1';
        });
    }

    async show(images, startIndex = 0) {
        this.images = images;
        this.currentImageIndex = startIndex;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        await this.updateContent();
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.elements.shareMenu.classList.add('hidden');
    }

    async navigate(direction) {
        const newIndex = this.currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < this.images.length) {
            this.currentImageIndex = newIndex;
            await this.updateContent();
        }
    }

    async updateContent() {
        const currentImage = this.images[this.currentImageIndex];
        
        // Show loading spinner and hide current image
        this.elements.loadingSpinner.style.display = 'block';
        this.elements.image.style.opacity = '0';

        // Update navigation buttons
        this.elements.prevBtn.style.display = this.currentImageIndex > 0 ? 'block' : 'none';
        this.elements.nextBtn.style.display = 
            this.currentImageIndex < this.images.length - 1 ? 'block' : 'none';

        // Update image and details
        this.elements.image.src = currentImage.src.large2x;
        this.elements.image.alt = currentImage.alt || 'Image';
        this.elements.photographerName.textContent = currentImage.photographer;
        this.elements.dimensions.textContent = `${currentImage.width} × ${currentImage.height}`;
        this.elements.views.textContent = Utils.formatNumber(Utils.getRandomViews());
        this.elements.description.textContent = currentImage.alt || 'No description available';
    }

    async downloadCurrentImage() {
        const currentImage = this.images[this.currentImageIndex];
        const filename = `pexels-${currentImage.photographer.toLowerCase().replace(/\s+/g, '-')}-${currentImage.id}.jpg`;

        try {
            UI.showToast('Starting download...');
            const response = await fetch(currentImage.src.original);
            const blob = await response.blob();
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            
            UI.showToast('Download complete!');
        } catch (error) {
            UI.showToast('Download failed. Please try again.');
            console.error('Download error:', error);
        }
    }

    toggleShareMenu() {
        this.elements.shareMenu.classList.toggle('hidden');
    }

    async handleShare(platform) {
        const currentImage = this.images[this.currentImageIndex];
        const shareUrl = currentImage.url;
        const shareText = `Check out this photo by ${currentImage.photographer} on Pexels`;

        try {
            switch (platform) {
                case 'twitter':
                    window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                        '_blank'
                    );
                    break;
                    
                case 'facebook':
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        '_blank'
                    );
                    break;
                    
                case 'copy':
                    await navigator.clipboard.writeText(shareUrl);
                    UI.showToast('Link copied to clipboard!');
                    break;
            }
        } catch (error) {
            UI.showToast('Failed to share image. Please try again.');
            console.error('Share error:', error);
        }

        this.toggleShareMenu();
    }
}

// Initialize the carousel modal
const carouselModal = new CarouselModal();

// Update the existing UI.createImageElement function to use the carousel modal
UI.createImageElement = function(photo) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.photographer;
    img.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'image-info';
    
    const photographerEl = document.createElement('div');
    photographerEl.className = 'photographer';
    photographerEl.textContent = photo.photographer;
    
    const stats = document.createElement('div');
    stats.className = 'image-stats';
    stats.innerHTML = `
        <span>📏 ${photo.width} × ${photo.height}</span>
        <span>👁️ ${Utils.formatNumber(Utils.getRandomViews())}</span>
    `;
    
    info.append(photographerEl, stats);
    div.append(img, info);
    
    div.addEventListener('click', () => {
        carouselModal.show(GalleryState.currentImages, GalleryState.currentImages.indexOf(photo));
    });
    
    return div;
};

//filter
document.addEventListener('DOMContentLoaded', function() {
    const filterDropdown = document.querySelector('.filter-dropdown');
    const filterBtn = filterDropdown.querySelector('.filter-btn');
    const filterMenu = document.querySelector('.filter-menu');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const activeFiltersContainer = document.getElementById('active-filters');

    // Handle filter dropdown
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('active');
        filterBtn.setAttribute('aria-expanded', 
            filterBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('active');
            filterBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle category selection
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Handle view toggle
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Handle checkbox changes and active filters
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateActiveFilters();
        });
    });

    function updateActiveFilters() {
        activeFiltersContainer.innerHTML = '';
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const filterTag = document.createElement('span');
                filterTag.className = 'filter-tag';
                filterTag.innerHTML = `
                    ${checkbox.nextElementSibling.textContent}
                    <i class="fas fa-times"></i>
                `;
                
                filterTag.addEventListener('click', () => {
                    checkbox.checked = false;
                    updateActiveFilters();
                });
                
                activeFiltersContainer.appendChild(filterTag);
            }
        });
    }

    // Keyboard navigation for dropdown
    filterMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            filterDropdown.classList.remove('active');
            filterBtn.setAttribute('aria-expanded', 'false');
            filterBtn.focus();
        }
    });
});