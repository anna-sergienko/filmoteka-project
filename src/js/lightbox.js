import refs from '../js/refs.js';

const { lightbox, lightboxOpenLink, lightboxCloseBtn } = refs;

lightboxCloseBtn.addEventListener('click', lightboxClose)
// lightboxOpenLink.addEventListener('click', lightboxOpen)



function lightboxClose() {
    lightbox.classList.toggle('none')
    bodyLightbox.classList.toggle('body__lightbox-open')
}

