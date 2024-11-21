// Reemplaza esto con tu k  -   e  -  y de Pexels, Es gratis. Dejo esta expuesta.
const PARTS = ['h82S0GkwM3BZF', 'cKsV9z4vvIQUY3v', '0NOo9F4dit5Fs', 'fXz', 'RJM', 'few', '0Lmmr', 'r'];

let currentPage = 1;

let currentCategory = 'all';

let currentSearch = '';

let loading = false;

let currentImages = [];

let currentView = 'grid';

let currentFilter = 'all';

// Elementos DOM    
const galleryGrid = document.getElementById('galleryGrid');

const loadingElement = document.getElementById('loading');

const modal = document.getElementById('modal');

const modalImage = document.getElementById('modalImage');
    
const modalPhotographer = document.getElementById('modalPhotographer');

const modalDescription = document.getElementById('modalDescription');

const searchInput = document.querySelector('.search-input');

const A_K = PARTS.join('');

const toast = document.getElementById('toast');

let currentImageIndex = 0;

    
// Función para mostrar toast
function showToast(message, duration = 3000) {
    
    toast.textContent = message;
    
    toast.style.display = 'block';
    
    setTimeout(() => {
    
        toast.style.display = 'none';
    
    }, duration);
    
}

    
// Función para cargar imágenes desde Pexels
async function fetchImages(category, page, search = '') {
    
    try {
    
        loading = true;
    
        loadingElement.style.display = 'block';
    
        
    
        let url;
    
        if (search) {
    
            url = `https://api.pexels.com/v1/search?query=${search}&per_page=20&page=${page}`;
    
        } else {
    
            const query = category === 'all' ? 'beautiful' : category;
    
            url = `https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${page}`;
    
        }
        
    
        const response = await fetch(url, {
    
            headers: {
    
                'Authorization': A_K
    
            }
    
        });
    
        
    
        const data = await response.json();
    
        return data.photos;
    
    } catch (error) {
    
        console.error('Error fetching images:', error);
    
        showToast('Error loading images. Please try again.');
    
        return [];
    
    } finally {
    
        loading = false;
    
        loadingElement.style.display = 'none';
    
    }
    
}

    
// Función para filtrar imágenes por orientación
    
function filterImagesByOrientation(photos, filter) {
    
    if (filter === 'all') return photos;
    
    
    return photos.filter(photo => {
    
        const ratio = photo.width / photo.height;
    
        switch (filter) {
    
            case 'portrait':
    
            return ratio < 0.8;
    
                case 'landscape':
    
            return ratio > 1.2;
    
                case 'square':
    
            return ratio >= 0.8 && ratio <= 1.2;
    
                default:
    
            return true;
    
            }
    
    });
    
}

    
// Función para crear elementos de imagen
    
function createImageElement(photo) {
    
    const div = document.createElement('div');
    
    div.className = 'gallery-item';
    
    
    const img = document.createElement('img');
    
    img.src = photo.src.medium;
    
    img.alt = photo.photographer;
    
    img.loading = "lazy"; // Lazy loading para mejor rendimiento
    
    
    const info = document.createElement('div');
    
    info.className = 'image-info';
    
    
    const photographer = document.createElement('div');
    
    photographer.className = 'photographer';
    
    photographer.textContent = photo.photographer;
    
    
    const stats = document.createElement('div');
    
    stats.className = 'image-stats';
    
    stats.innerHTML = `
    
    <span>📏 ${photo.width} x ${photo.height}</span>
    
        <span>👁️ ${Math.floor(Math.random() * 10000)} views</span>
    
        `;
    
    
    info.appendChild(photographer);
    
    info.appendChild(stats);
    
    div.appendChild(img);
    
    div.appendChild(info);
    
    
    // Event listener para abrir el modal
    
    div.addEventListener('click', () => {
    
        currentImageIndex = currentImages.indexOf(photo);
    
        showModal(photo);
    
    });
    
    
    return div;
    
}

    
// Función para mostrar imágenes en la galería
    
function displayImages(photos, append = false) {
    
    const filteredPhotos = filterImagesByOrientation(photos, currentFilter);
    
    
    if (!append) {
    
        galleryGrid.innerHTML = '';
    
        currentImages = [];
    
    }
    
    
    if (filteredPhotos.length === 0 && !append) {
    
        const noResults = document.createElement('div');
    
        noResults.className = 'no-results';
    
        noResults.textContent = 'No images found. Try a different search or filter.';
    
        galleryGrid.appendChild(noResults);
    
        return;
    
    }
    
    
    filteredPhotos.forEach(photo => {
    
        currentImages.push(photo);
    
        const imageElement = createImageElement(photo);
    
        galleryGrid.appendChild(imageElement);
    
    });
    
}

    
// Función para mostrar el modal
    
function showModal(photo) {
    
    modal.style.display = 'block';
    
    modalImage.src = photo.src.large2x;
    
    modalPhotographer.textContent = `Photographer: ${photo.photographer}`;
    
    modalDescription.textContent = photo.alt || 'No description available';
    
    
    // Deshabilitar scroll del body
    
    document.body.style.overflow = 'hidden';
    
    
    // Actualizar botones de navegación
    
    updateModalNavigation();
    
}

    
// Función para actualizar la navegación del modal
    
function updateModalNavigation() {
    
    const prevBtn = modal.querySelector('.prev');
    
    const nextBtn = modal.querySelector('.next');
    
    
    prevBtn.style.visibility = currentImageIndex > 0 ? 'visible' : 'hidden';
    
    nextBtn.style.visibility = currentImageIndex < currentImages.length - 1 ? 'visible' : 'hidden';
    
}

    
// Función para manejar la descarga de imágenes
    
function downloadImage(url, filename) {
    
    showToast('Starting download...');
    
    
    fetch(url)
    
    .then(response => response.blob())
    
        .then(blob => {
    
            const link = document.createElement('a');
    
            link.href = URL.createObjectURL(blob);
    
            link.download = filename || 'world-image.jpg';
    
            document.body.appendChild(link);
    
            link.click();
    
            document.body.removeChild(link);
    
            showToast('Download complete!');
    
        })
    
        .catch(() => {
    
            showToast('Download failed. Please try again.');
    
        });
    
    }

    
// Event Listeners
    
document.querySelector('.download-btn').addEventListener('click', () => {
    
    const photo = currentImages[currentImageIndex];
    
    downloadImage(photo.src.original, `pexels-${photo.photographer}-${photo.id}.jpg`);
    
});

    
// Búsqueda con debounce
    
let searchTimeout;
    
searchInput.addEventListener('input', (e) => {
    
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(async () => {
    
        currentSearch = e.target.value.trim();
    
        currentPage = 1;
    
        const photos = await fetchImages(currentCategory, currentPage, currentSearch);
    
        displayImages(photos);
    
    }, 500);
    
});

    
// Cambio de vista (grid/list)
    
document.querySelectorAll('.view-btn').forEach(button => {
    
    button.addEventListener('click', () => {
    
        const view = button.dataset.view;
    
        if (view === currentView) return;
        
    
        document.querySelector('.view-btn.active').classList.remove('active');
    
        button.classList.add('active');
        
    
        currentView = view;
    
        galleryGrid.className = `gallery-grid ${view}-view`;
    
    });
    
});

    
// Filtros de orientación
    
document.querySelectorAll('.filter-btn').forEach(button => {
    
    button.addEventListener('click', () => {
    
        const filter = button.dataset.filter;
    
        if (filter === currentFilter) return;
        
    
        document.querySelector('.filter-btn.active').classList.remove('active');
    
        button.classList.add('active');
        
    
        currentFilter = filter;
    
        displayImages(currentImages);
    
    });
    
});

    
// Eventos del modal
    
modal.querySelector('.close-modal').addEventListener('click', () => {
    
    modal.style.display = 'none';
    
    document.body.style.overflow = 'auto';
    
});

    
modal.querySelector('.prev').addEventListener('click', () => {
    
    if (currentImageIndex > 0) {
    
        currentImageIndex--;
    
        showModal(currentImages[currentImageIndex]);
    
    }
    
});

    
modal.querySelector('.next').addEventListener('click', () => {
    
    if (currentImageIndex < currentImages.length - 1) {
    
        currentImageIndex++;
    
        showModal(currentImages[currentImageIndex]);
    
    }
    
});

    
// Cerrar modal con tecla Escape
    
document.addEventListener('keydown', (e) => {
    
    if (e.key === 'Escape' && modal.style.display === 'block') {
    
        modal.style.display = 'none';
    
        document.body.style.overflow = 'auto';
    
    }
    
});

    
// Infinite scroll con throttle
    
let scrollTimeout;
    
window.addEventListener('scroll', () => {
    
    if (loading) return;
    
    
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(async () => {
    
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
        if (scrollTop + clientHeight >= scrollHeight - 100) {
    
            currentPage++;
    
            const photos = await fetchImages(currentCategory, currentPage, currentSearch);
    
            displayImages(photos, true);
    
        }
    
    }, 100);
    
});

    
// Función para guardar el estado de la galería
    
function saveGalleryState() {
    
    const state = {
    
        category: currentCategory,
    
        view: currentView,
    
        filter: currentFilter,
    
        search: currentSearch
    
    };
    
    localStorage.setItem('galleryState', JSON.stringify(state));
    
}

    
// Función para restaurar el estado de la galería
    
function restoreGalleryState() {
    
    const savedState = localStorage.getItem('galleryState');
    
    if (savedState) {
    
        const state = JSON.parse(savedState);
    
        currentCategory = state.category;
    
        currentView = state.view;
    
        currentFilter = state.filter;
    
        currentSearch = state.search;
        
    
        // Restaurar UI
    
        document.querySelector(`.category-btn[data-category="${state.category}"]`)?.classList.add('active');
    
        document.querySelector(`.view-btn[data-view="${state.view}"]`)?.classList.add('active');
    
        document.querySelector(`.filter-btn[data-filter="${state.filter}"]`)?.classList.add('active');
    
        searchInput.value = state.search;
        
    
        galleryGrid.className = `gallery-grid ${state.view}-view`;
    
    }
    
}

    
// Guardar estado al cerrar/recargar
    
window.addEventListener('beforeunload', saveGalleryState);

    
// Restaurar estado al cargar
    
document.addEventListener('DOMContentLoaded', () => {
    
    restoreGalleryState();
    
    fetchImages(currentCategory, currentPage, currentSearch).then(photos => {
    
        displayImages(photos);
    
    });
    
});

    
// Agregar soporte para gestos táctiles en el modal
    
let touchStartX = 0;
    
let touchEndX = 0;

    
modalImage.addEventListener('touchstart', e => {
    
    touchStartX = e.changedTouches[0].screenX;
    
});

    
modalImage.addEventListener('touchend', e => {
    
    touchEndX = e.changedTouches[0].screenX;
    
    handleSwipe();
    
});


    
// Variables de seguimiento para la navegaciòn por teclado
let pressStartX = 0; 

let pressEndX = 0; 

// Agrega un event listener para las teclas de flecha
document.addEventListener('keydown', handleArrowKey);

function handleSwipe() {
    const swipeThreshold = 50;

    const diff = pressEndX - pressStartX;

    if (Math.abs(diff) > swipeThreshold) {

        if (diff > 0 && currentImageIndex > 0) {

            // Swipe derecha -> imagen anterior

            currentImageIndex--;

            showModal(currentImages[currentImageIndex]);

        } else if (diff < 0 && currentImageIndex < currentImages.length - 1) {

            // Swipe izquierda -> imagen siguiente

            currentImageIndex++;

            showModal(currentImages[currentImageIndex]);
        }
    }
}

// Nueva función para manejar las teclas de flecha

function handleArrowKey(event) {

    if (event.key === 'ArrowRight' && currentImageIndex < currentImages.length - 1) {

        // Flecha derecha -> imagen siguiente

        currentImageIndex++;

        showModal(currentImages[currentImageIndex]);

    } else if (event.key === 'ArrowLeft' && currentImageIndex > 0) {

        // Flecha izquierda -> imagen anterior

        currentImageIndex--;

        showModal(currentImages[currentImageIndex]);
    }
}

