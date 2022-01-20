import refs from "./refs";
import Api from "./api";
import filmCard from '../templates/movie-card.hbs';
import LocalStorage from "./local-storage";
import emptyWatchedListError from "./main";
import emptyQueueListError from "./main";
import clearMovieCardContainer  from "./main";
import watchedBtn from "./header";
import QueueBtn from "./header";
import appendMovieCardMarkup  from "./main";



const {headerMyLibrary, cardList, headerQueueBtn, headerWatchedBtn } = refs;

headerMyLibrary.addEventListener("click", onMyLibraryClick);
headerWatchedBtn.addEventListener("click", onWatchedBtnClick);
headerQueueBtn.addEventListener("click", onQueueBtnClick);


async function pullMovieCard(movieArray) {
  cardList.innerHTML = "";
  const markup = await filmCard(movieArray);
  
  cardList.innerHTML = markup;
  console.log(cardList);
  console.log(markup);
}





showWatchedMovies();

function onMyLibraryClick(e) {
  e.preventDefault();
  showWatchedMovies();
}



function onWatchedBtnClick(e) {
  e.preventDefault();
  // watchedBtn();
  showWatchedMovies();
}


function onQueueBtnClick(e) {
  e.preventDefault();
  QueueBtn();
  // showQueueMovies();

}




function showWatchedMovies() {
  // e.preventDefault();
  // cardList.innerHTML = "";
  
  let moviesArray = getWatchedMovieList();
  console.log(moviesArray);
  if (!moviesArray || moviesArray.length === 0) {
    emptyWatchedListError();
    return;
  }

  pullMovieCard(moviesArray);

}


function showQueueMovies() {
  let moviesArray = localStorage.getQueue();

  if (!moviesArray || moviesArray.length === 0) {
  
    emptyQueueListError();
    return;
  }

  cardList.innerHTML = "";
  pullMovieCard();
}

function getQueueMovieList() {
  if (!(localStorage.getItem('Queue')) || JSON.parse(localStorage.getItem('Queue')).length === 0 ) {
      // console.log('empty');
      return [];
    } else {
      return queueMoviesList = JSON.parse(localStorage.getItem('Queue'));
    }
}

function getWatchedMovieList() {
      if (!(localStorage.getItem('watched')) || JSON.parse(localStorage.getItem('watched')).length === 0 ) {
      console.log('empty');
      return [];
    } else {
      return JSON.parse(localStorage.getItem('watched'));
    }
    
};