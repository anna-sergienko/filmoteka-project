import refs from '../js/refs.js';


const { lightbox, lightboxOpenLink, lightboxCloseBtn, bodyLightbox, lightboxContainer } = refs;

lightboxCloseBtn.addEventListener('click', lightboxClose)
lightbox.addEventListener("click", lightboxCloseOnBackdrop)


// ----- закрыть lightbox -----
function lightboxClose() {

    lightboxContainer.classList.add('modal__hidden')
    setTimeout(() => {
        lightbox.classList.add('none')
        bodyLightbox.classList.remove('lightbox__open')
    }, 350)
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

