import refs from "./refs";
import localStorage from './local-storage.js'
import Api from './api.js';
import libraryFilmCard from '../templates/libraryTpl.hbs';
import { emptyWatchedListError, emptyQueueListError, clearMovieCardContainer, appendMovieCardMarkup, clearEmptyError } from "./main";
import watchedBtn from "./header";
import QueueBtn from "./header";
import Genres from './genres.js'

const { headerMyLibrary, cardList, headerQueueBtn, headerWatchedBtn, lightboxAddToWatchedBtn, lightboxAddToQueueBtn, lightbox, mainList } = refs;

const api = new Api();
const genresAppend = new Genres();
let moviesAddedToWatchedList = [];
let moviesAddedToQueueList = [];
let userWatchedListMarkup = [];
let userQueueListMarkup = [];
headerMyLibrary.addEventListener("click", showUserWatchedListMarkup);
headerWatchedBtn.addEventListener("click", showUserWatchedListMarkup);
headerQueueBtn.addEventListener("click", showUserQueueListMarkup);
lightbox.addEventListener("click", click)

renderUserMovieList()
renderUserQueueList()

// ----- делигатор ----- 
function click(e) {
  // console.log(e.target);
  if (e.target.classList.contains('lightbox-add-to-watched-btn-js')) {

    // console.log('add to watched button pressed');
    addMovieToWatchedList()
    renderUserMovieList()
    if ((localStorage.getItem('userWatchedList')).includes(localStorage.getItem('currentMovieId'))) {
      // console.log('yes in watchedList');
      e.target.classList.add('movie-info__button-add-to-watched__pressed')
      e.target.classList.remove('movie-info__button-add-to-watched__unpressed')
    } else {
      // console.log('not in watchedList');
      e.target.classList.add('movie-info__button-add-to-watched__unpressed')
      e.target.classList.remove('movie-info__button-add-to-watched__pressed')
    }
  }
  if (e.target.classList.contains('lightbox-add-to-queue-btn-js')) {
    // console.log('lightbox: add to queue');
    addMovieToQueueList()
    renderUserQueueList()
    if ((localStorage.getItem('userQueueList')).includes(localStorage.getItem('currentMovieId'))) {
      // console.log('yes in queueList');
      e.target.classList.add('movie-info__button-add-to-queue__pressed')
      e.target.classList.remove('movie-info__button-add-to-queue__unpressed')
    } else {
      // console.log('not in queueList');
      e.target.classList.add('movie-info__button-add-to-queue__unpressed')
      e.target.classList.remove('movie-info__button-add-to-queue__pressed')
    }
  }
}




function addMovieToQueueList() {
  const movie = localStorage.getItem('currentMovieId') // берет id открытого в модалке фильма
  moviesAddedToQueueList = localStorage.getItem('userQueueList')
  if (moviesAddedToQueueList == undefined) { // проверка на наличие списка у пользователя
    moviesAddedToQueueList = []; // если нет задать пустой массив
    // console.log(moviesAddedToQueueList);
  }
  if (!moviesAddedToQueueList.includes(movie)) {
    // lightboxQueueBtnTextChange()
    moviesAddedToQueueList.push(movie) // добавляет в список фильмов id фильма
    localStorage.setItem('userQueueList', moviesAddedToQueueList) // сохраняет скисок фильмов в localStorage с ключом userQueueList
    return
  } else {
    // console.log(typeof moviesAddedToQueueList[0], typeof movie);
    moviesAddedToQueueList = moviesAddedToQueueList.filter(id => id != movie) // фильтрует список от текущего id фильма
    localStorage.setItem('userQueueList', moviesAddedToQueueList) // сохраняет скисок фильмов в localStorage с ключом userQueueList
    // console.log('im here');
    return
  }
}

function renderUserQueueList() {
  let markupAccumulator = ""
  const userQueueList = localStorage.getItem('userQueueList')
  // console.log('step 2');
  // console.log(userQueueListMarkup);
  if (userQueueList === undefined || userQueueList.length === 0) {
    if (headerQueueBtn.classList.contains('btn--selected')) {
      cardList.innerHTML = ''
      emptyQueueListError()
      return
    }
    return
  }
  if (userQueueList.length > 0) {
    userQueueList.forEach(function createMarkup(movieId) {
      api.idQuery = movieId

      // console.log(api.idQuery);
      api.fetchMovieDetails().then((movieDetails) => {
        markupAccumulator = markupAccumulator.concat(libraryFilmCard(movieDetails))
        // console.log(markupAccumulator);
        userQueueListMarkup = markupAccumulator
        if (headerQueueBtn.classList.contains('btn--selected')) {
          cardList.innerHTML = ''
          cardList.insertAdjacentHTML('afterbegin', userQueueListMarkup)
          console.log('true');
        }
      })
    })
    // console.log(markupAccumulator);
  }
}

function showUserQueueListMarkup() {
  clearEmptyError()
  const userQueueList = localStorage.getItem('userQueueList')
  if (userQueueList === undefined || userQueueList.length === 0) {
    emptyQueueListError()
  } else {
    mainList.classList.remove('card__list--none')
    cardList.innerHTML = ""

    renderUserMovieList()
    cardList.insertAdjacentHTML('afterbegin', userQueueListMarkup);
  }
}
function addMovieToWatchedList() {
  const movie = localStorage.getItem('currentMovieId') // берет id открытого в модалке фильма
  moviesAddedToWatchedList = localStorage.getItem('userWatchedList')
  if (moviesAddedToWatchedList === undefined) { // проверка на наличие списка у пользователя
    moviesAddedToWatchedList = []; // если нет задать пустой массив
  }
  if (!moviesAddedToWatchedList.includes(movie)) {
    // lightboxWatchedBtnTextChange()
    moviesAddedToWatchedList.push(movie) // добавляет в список фильмов id фильма
    localStorage.setItem('userWatchedList', moviesAddedToWatchedList) // сохраняет скисок фильмов в localStorage с ключом userWatchedList
    return
  } else {
    // console.log(typeof moviesAddedToWatchedList[0], typeof movie);
    moviesAddedToWatchedList = moviesAddedToWatchedList.filter(id => id != movie) // фильтрует список от текущего id фильма
    localStorage.setItem('userWatchedList', moviesAddedToWatchedList) // сохраняет скисок фильмов в localStorage с ключом userWatchedList
    return
  }
}

function showUserWatchedListMarkup() {
  clearEmptyError()
  const userWatchedList = localStorage.getItem('userWatchedList')
  // console.log(userWatchedList, typeof userWatchedList);
  if (userWatchedList === undefined || userWatchedList.length === 0) {
    emptyWatchedListError()
  } else {
    renderUserMovieList()
    mainList.classList.remove('card__list--none')
    cardList.innerHTML = ''
    cardList.insertAdjacentHTML('afterbegin', userWatchedListMarkup);
    // console.log(userWatchedListMarkup);
  }
}


function renderUserMovieList() {
  let markupAccumulator = ""
  // console.log('step 2');
  const userWatchedList = localStorage.getItem('userWatchedList')
   // console.log(userWatchedList);
  if (userWatchedList === undefined || userWatchedList.length === 0) {
    if (headerWatchedBtn.classList.contains('btn--selected')) {
      // console.log('empty');
      cardList.innerHTML = ''
      emptyWatchedListError()
      return
    }
    return
  }
  if (userWatchedList.length > 0) {
    userWatchedList.forEach(async function createMarkup(movieId) {
      api.idQuery = movieId
       console.log(api.idQuery);
      await api.fetchMovieDetails().then((movieDetails) => {

        let genAr = movieDetails.genres;
        const obj = { name: 'Other' };
        
          if (genAr.length <= 2) {
            genAr === genAr;
          }
          if (genAr.length === 3) {
            genAr === genAr.splice(2, 1, obj);  
          }
          if (genAr.length === 4) {
            genAr === genAr.splice(2, 2, obj);
          }
          if (genAr.length === 5) {
            genAr === genAr.splice(2, 3, obj);
          }
         console.log(genAr)
          if (movieDetails.release_date || null) {
            movieDetails.release_date = movieDetails.release_date.slice(0, 4);
          } 
          if (movieDetails.release_date === undefined) {
            return (movieDetails.release_date = 'No date');
          }
      
        markupAccumulator = markupAccumulator.concat(libraryFilmCard(movieDetails))
        // console.log(markupAccumulator);
        userWatchedListMarkup = markupAccumulator;
        // console.log(userWatchedListMarkup);
        if (headerWatchedBtn.classList.contains('btn--selected')) {
          cardList.innerHTML = ''
          cardList.insertAdjacentHTML('afterbegin', userWatchedListMarkup)
        }
      })
    })
  }
}

// export function lightboxWatchedBtnTextChange() {
//   if ((localStorage.getItem('userWatchedList')).includes(localStorage.getItem('currentMovieId'))) {
//     console.log('yes in watchedList');
//     console.log();
//     lightboxAddToWatchedBtn.classList.toggle('movie-info__button-add-to-watched__pressed')
//     return
//   }
//   console.log('not in watchedList');
// }

// export function lightboxQueueBtnTextChange() {
//   if ((localStorage.getItem('userQueueList')).includes(localStorage.getItem('currentMovieId'))) {
//     // console.log('yes in queueList');
//     return
//   }
//   // console.log('not in queueList');
// }



