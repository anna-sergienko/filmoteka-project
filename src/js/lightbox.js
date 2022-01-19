import refs from '../js/refs.js';

const { lightbox, lightboxOpenLink, lightboxCloseBtn, bodyLightbox } = refs;

lightboxCloseBtn.addEventListener('click', lightboxClose)

function lightboxClose() {
    lightbox.classList.add('none')
    bodyLightbox.classList.remove('lightbox__open')
}

