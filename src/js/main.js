import filmCard from '../templates/movie-card.hbs'
import refs from './refs.js';
import Api from './api.js'; 

const { cardList, headerHome, headerLogo, headerFormInput, headerFormSubmitBtn } = refs; 

const api = new Api();

window.addEventListener('load', onLoadTrendingMoviesForToday);
headerHome.addEventListener('click', onLoadTrendingMoviesForToday);
headerLogo.addEventListener('click', onLoadTrendingMoviesForToday); 
headerFormSubmitBtn.addEventListener('click', onSearchMovies);

// ----- Функция для загрузки списка самых популярных фильмов на сегодняя -----
function onLoadTrendingMoviesForToday(event) {
    event.preventDefault(); 
    
        api.fetchTrendingMoviesForToday().then(movies => {
        appendMovieCardMarkup(movies); 
        clearMovieCardContainer();
        console.log(movies);
    })
}

// ----- Функция для загрузки фильмов по ключевому слову -----
function onSearchMovies(event) {
     event.preventDefault(); 
        api.query = headerFormInput.value.trim(); 
    
        api.fetchSearchMovies().then(movies => {
        appendMovieCardMarkup(movies); 
        clearMovieCardContainer();
        console.log(movies);
    })
}

// ----- Функция для разметки картки фильма  -----
async function appendMovieCardMarkup(movies) {
    const markup = await filmCard(movies);
    cardList.innerHTML = markup;
} 

// ----- Функция для очистки разметки картки фильма -----
function clearMovieCardContainer() {
    cardList.innerHTML = '';
}
