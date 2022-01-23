
import refs from "./refs";
import Api from "./api";
import filmCard from '../templates/movie-card.hbs';
import localStorage from "./local-storage";
import { emptyWatchedListError, emptyQueueListError, clearMovieCardContainer, appendMovieCardMarkup  } from "./main";
import watchedBtn from "./header";
import QueueBtn from "./header";

const {headerMyLibrary, cardList, headerQueueBtn, headerWatchedBtn,lightboxAddToWatchedBtn, lightboxAddToQueueBtn } = refs;

headerMyLibrary.addEventListener("click", onMyLibraryClick);
headerWatchedBtn.addEventListener("click", onWatchedBtnClick);
headerQueueBtn.addEventListener("click", onQueueBtnClick);
lightboxAddToWatchedBtn.addEventListener("click", btnListener);

async function pullMovieCard(movieArray) {
  cardList.innerHTML = "";
  const markup = await filmCard(movieArray);
  
  cardList.innerHTML = markup;
  console.log(cardList);
  console.log(markup);
}


export function btnListener() {
  console.log("click");
}


// showWatchedMovies();

function onMyLibraryClick(e) {
  e.preventDefault();
  clearMovieCardContainer();
  showWatchedMovies();
}



// function onWatchedBtnClick(e) {
//   console.log("button presed");
//   e.preventDefault();
//   showWatchedMovies();
// }


function onQueueBtnClick(e) {
  e.preventDefault();
  clearMovieCardContainer();
  showQueueMovies()

}

// нажатие на кнопку watched
function onWatchedBtnClick(e) {
  console.log("pressed");
  e.preventDefault();
  const id = e.target.dataset.id;

  const watchedFilms = getWatchedMovieList();
  const currentFilms = window.movies || [];
  console.log(currentFilms);

  const isFilmExist = watchedFilms.find(item => item.id == id);

  if (isFilmExist) {
    const newState = watchedFilms.filter(item => item.id != id);
    localStorage.setItem('Watched', JSON.stringify(newState))
  } else {
    const findedFilm = currentFilms.find(item => item.id == id);
    watchedFilms.unshift(findedFilm)
    localStorage.setItem('Watched', JSON.stringify(watchedFilms))
  }
  
}


function showWatchedMovies() {
   let moviesArray = getWatchedMovieList();
  console.log(moviesArray);
  if (!moviesArray || moviesArray.length === 0) {
    // emptyWatchedListError();
    console.log("empty");
    return;
  }

  pullMovieCard(moviesArray);

}


function showQueueMovies() {
  let moviesArray = getQueueMovieList();

  if (!moviesArray || moviesArray.length === 0) {
  
    // emptyQueueListError();
    return;
  }

  cardList.innerHTML = "";
  pullMovieCard();
}

function getQueueMovieList() {
  if (!(localStorage.getItem('Queue')) || JSON.parse(localStorage.getItem('Queue')).length === 0 ) {
      console.log('empty');
      return [];
    } else {
      return JSON.parse(localStorage.getItem('Queue'));
    }
}


function getWatchedMovieList() {
  if (!(localStorage.getItem('Watched')) || JSON.parse(localStorage.getItem('Watched')).length === 0) {
    console.log('empty');
    return [];
  } else {
    return JSON.parse(localStorage.getItem('Watched'));
  }

};



