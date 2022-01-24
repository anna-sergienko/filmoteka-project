import refs from "./refs";
import localStorage from './local-storage.js'
import Api from './api.js';
import libraryFilmCard from '../templates/libraryTpl.hbs';
import { emptyWatchedListError, emptyQueueListError, clearMovieCardContainer, appendMovieCardMarkup, clearEmptyError } from "./main";
import watchedBtn from "./header";
import QueueBtn from "./header";

const { headerMyLibrary, cardList, headerQueueBtn, headerWatchedBtn, lightboxAddToWatchedBtn, lightboxAddToQueueBtn, lightbox, mainList } = refs;

const api = new Api();
let moviesAddedToWatchedList = [];
let moviesAddedToQueueList = [];
let userWatchedListMarkup = [];
let userQueueListMarkup = [];
headerMyLibrary.addEventListener("click", showUserWatchedListMarkup);
headerWatchedBtn.addEventListener("click", showUserWatchedListMarkup);
headerQueueBtn.addEventListener("click", showUserQueueListMarkup);
lightbox.addEventListener("click", click)

renderUserMovieList()

// ----- делигатор ----- 
function click(e) {
  // console.log(e.target);
  if (e.target.classList.contains('lightbox-add-to-watched-btn-js')) {
    // console.log('add to watched button pressed');
    addMovieToWatchedList()
    renderUserMovieList()
  }
  if (e.target.classList.contains('lightbox-add-to-queue-btn-js')) {
    // console.log('lightbox: add to queue');
    addMovieToQueueList()
    renderUserQueueList()
  }
}


function addMovieToWatchedList() {
  const movie = localStorage.getItem('currentMovieId') // берет id открытого в модалке фильма
  moviesAddedToWatchedList = localStorage.getItem('userWatchedList')
  if (moviesAddedToWatchedList === undefined) { // проверка на наличие списка у пользователя
    moviesAddedToWatchedList = []; // если нет задать пустой массив
  }
  if (!moviesAddedToWatchedList.includes(movie)) {
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

function addMovieToQueueList() {
  const movie = localStorage.getItem('currentMovieId') // берет id открытого в модалке фильма
  moviesAddedToQueueList = localStorage.getItem('userQueueList')
  if (moviesAddedToQueueList === undefined) { // проверка на наличие списка у пользователя
    moviesAddedToQueueList = []; // если нет задать пустой массив
  }
  if (!moviesAddedToQueueList.includes(movie)) {
    moviesAddedToQueueList.push(movie) // добавляет в список фильмов id фильма
    localStorage.setItem('userQueueList', moviesAddedToQueueList) // сохраняет скисок фильмов в localStorage с ключом userQueueList
    return
  } else {
    // console.log(typeof moviesAddedToQueueList[0], typeof movie);
    moviesAddedToQueueList = moviesAddedToQueueList.filter(id => id != movie) // фильтрует список от текущего id фильма
    localStorage.setItem('userQueueList', moviesAddedToQueueList) // сохраняет скисок фильмов в localStorage с ключом userQueueList
    return
  }
}




function renderUserMovieList() {
  let markupAccumulator = ""
  const userWatchedList = localStorage.getItem('userWatchedList')
  console.log(userWatchedList);

  if (userWatchedList.length > 0) {
    userWatchedList.forEach(async function createMarkup(movieId) {
      api.idQuery = movieId
      console.log(api.idQuery);
      await api.fetchMovieDetails().then((movieDetails) => {
        console.log(movieDetails);
        markupAccumulator = markupAccumulator.concat(libraryFilmCard(movieDetails))
        console.log(markupAccumulator);
        userWatchedListMarkup = markupAccumulator;
        console.log(userWatchedListMarkup);
        // return userWatchedListMarkup
      })
    })
  }
}
function showUserWatchedListMarkup() {
  clearEmptyError()
  const userWatchedList = localStorage.getItem('userWatchedList')
  console.log(userWatchedList, typeof userWatchedList);
  if (userWatchedList === undefined || userWatchedList.length === 0) {
    emptyWatchedListError()
  } else {
    renderUserMovieList()
    mainList.classList.remove('card__list--none')
    cardList.innerHTML = ''
    cardList.innerHTML = userWatchedListMarkup
    console.log(userWatchedListMarkup);
  }
}


function renderUserQueueList() {
  let markupAccumulator = ""
  const userQueueList = localStorage.getItem('userQueueList')
  console.log(userQueueList);

  if (userQueueList.length > 0) {
    userQueueList.forEach(function createMarkup(movieId) {
      api.idQuery = movieId
      console.log(api.idQuery);
      api.fetchMovieDetails().then((movieDetails) => {
        console.log(movieDetails);
        markupAccumulator = markupAccumulator.concat(libraryFilmCard(movieDetails))
        console.log(markupAccumulator);
        userQueueListMarkup = markupAccumulator
        // return userQueueListMarkup
      })
    })
  }
}



function showUserQueueListMarkup() {
  clearEmptyError()
  const userQueueList = localStorage.getItem('userQueueList')
  if (userQueueList === undefined || userQueueList.length === 0) {
    emptyQueueListError()
  } else {
    mainList.classList.remove('card__list--none')
    cardList.innerHTML = ''

    renderUserMovieList()
    cardList.innerHTML = userQueueListMarkup
  }
}
