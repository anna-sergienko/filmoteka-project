import refs from '../js/refs.js';
import { scrollToMe } from './main.js';


const { lightbox, lightboxOpenLink, lightboxCloseBtn, bodyLightbox, lightboxContainer, footerSection } = refs;

lightboxCloseBtn.addEventListener('click', lightboxClose)
lightbox.addEventListener("click", lightboxCloseOnBackdrop)


// ----- закрыть lightbox -----
function lightboxClose() {
    lightboxContainer.classList.add('modal__hidden')
    setTimeout(() => {
        lightbox.classList.add('none')
        bodyLightbox.classList.remove('lightbox__open')
    }, 350)
    scrollToMe[0].scrollIntoView({ behavior: "auto" })
    setTimeout(() => {
        scrollToMe.forEach(function (el) { el.classList.remove('main-scroll-to-me-js') })
        // .classList.remove('main-scroll-to-me-js')
        // scrollToMe.classList.remove('main-scroll-to-me-js')
    }, 1000)

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

