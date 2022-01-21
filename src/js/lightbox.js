import refs from '../js/refs.js';
import { scrollToMe } from './main.js';
import api from './api.js';



const { lightbox, lightboxHandlebars, lightboxOpenLink, lightboxCloseBtn, bodyLightbox, lightboxContainer, lightboxAddToWatchedBtn } = refs;


lightboxCloseBtn.addEventListener('click', lightboxClose)
lightbox.addEventListener("click", lightboxCloseOnBackdrop)
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






function onWatchedBtnClick(e) {
  const id = e.target.dataset.id;
  e.preventDefault();

  const watchedFilms = getWatchedMovieList();
  const currentFilms = window.movies || [];
  console.log(currentFilms);

  const isFilmExist = watchedFilms.find(item => item.id == id);

  if (isFilmExist) {
    const newState = watchedFilms.filter(item => item.id != id);
    localStorage.setItem('watched', JSON.stringify(newState))
  } else {
    const findedFilm = currentFilms.find(item => item.id == id);
    watchedFilms.unshift(findedFilm)
    localStorage.setItem('watched', JSON.stringify(watchedFilms))
  }
}

function getWatchedMovieList() {
  if (!(localStorage.getItem('watched')) || JSON.parse(localStorage.getItem('watched')).length === 0) {
    console.log('empty');
    return [];
  } else {
    return JSON.parse(localStorage.getItem('watched'));
  }

};
