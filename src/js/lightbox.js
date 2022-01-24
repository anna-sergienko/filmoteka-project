import refs from '../js/refs.js';
import { scrollToMe } from './main.js';
import api from './api.js';
// import filmCard from '../templates/movie-card.hbs';
// import lightboxTpl from '../templates/lightboxTpl.hbs';
// import LocalStorage from "./local-storage";



const { lightbox, lightboxHandlebars, lightboxOpenLink, lightboxCloseBtn, bodyLightbox, lightboxContainer, lightboxAddToWatchedBtn, lightboxAddToQueueBtn, lightboxAddToWatchedBtnUnpressed,
lightboxAddToWatchedBtnPressed,
lightboxAddToQueueBtnUnpressed,
lightboxAddToQueueBtnPpressed  } = refs;




lightboxCloseBtn.addEventListener('click', lightboxClose);
lightbox.addEventListener("click", lightboxCloseOnBackdrop);
// lightbox.addEventListener("click", click)
// lightboxAddToWatchedBtn.addEventListener("click", click)
// lightboxAddToWatchedBtn.addEventListener("click", onWatchedBtnClick)


// ----- закрыть lightbox -----
function lightboxClose() {
  lightboxContainer.classList.add('modal__hidden')
  setTimeout(() => {
    lightbox.classList.add('none')
    lightboxHandlebars.innerHTML = ''
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
























