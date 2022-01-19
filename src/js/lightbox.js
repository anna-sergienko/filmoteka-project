import refs from '../js/refs.js';

const { lightbox, lightboxOpenLink, lightboxCloseBtn } = refs;

lightboxCloseBtn.addEventListener('click', lightboxClose)

function lightboxClose() {
    lightbox.classList.toggle('none')
    bodyLightbox.classList.toggle('lightbox__open')
}

