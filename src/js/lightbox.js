import refs from '../js/refs.js';


const { lightbox, lightboxOpenLink, lightboxCloseBtn, bodyLightbox } = refs;

lightboxCloseBtn.addEventListener('click', lightboxClose)
lightbox.addEventListener("click", lightboxCloseOnBackdrop)


// ----- закрыть lightbox -----
function lightboxClose() {
    lightbox.classList.add('none')
    bodyLightbox.classList.remove('lightbox__open')
}


// ----- закрыть lightbox по backdrop -----
function lightboxCloseOnBackdrop(e) {
    if (e.currentTarget === e.target) {
        lightboxClose();
    };
}

// ----- закрыть lightbox по escape -----
export function lightboxCloseOnEscape(e) {
    if (e.code === 'Escape') {
        lightboxClose();
    };
}

