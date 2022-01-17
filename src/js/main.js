
import filmCard from '../templates/movie-card.hbs'
import refs from './refs.js';
import Api from './api.js'; 

const { cardList, headerLogo, headerFormInput, headerFormSubmitBtn, headerHome,
    headerQueueBtn,
    mainSection,
    mainList,
    headerMyLibrary,
    headerWatchedBtn,
    mainErrorQueue,
    mainErrorWatched,} = refs; 

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

// import clearInnerHTML from './common.js'
// import { homePage, myLibrary } from './header.js'
import refs from './refs.js';

// console.log('main');

headerWatchedBtn.addEventListener('click', emptyWatchedListError);
headerQueueBtn.addEventListener('click', emptyQueueListError);
headerHome.addEventListener('click', headerHomeClearError);

// ----- очищает список -----
function clearMainList() {
    mainList.innerHTML = '';
}

// ----- пустой список Watched -----
function emptyWatchedListError() {
    clearMainList();
    mainSection.classList.add('main-error');
    mainErrorWatched.classList.remove('none');
    mainErrorQueue.classList.add('none');
}

// ----- пустой список Queue -----
function emptyQueueListError() {
    clearMainList();
    mainSection.classList.add('main-error');
    mainErrorQueue.classList.remove('none');
    mainErrorWatched.classList.add('none');
}

// ----- вернуть в нормальный стиль main -----
function clearEmptyError() {
    mainErrorWatched.classList.add('none');
    mainErrorQueue.classList.add('none');
    mainSection.classList.remove('main-error');
}

// ----- ТЕСТОВАЯ ФУНКЦИЯ -----
function headerHomeClearError() {
    clearEmptyError();
    mainList.insertAdjacentHTML(
        'afterbegin',
        `
                <li class="card__item">
                <a class="card__lightbox">
                    <img class="card__img" src="./images/demo.jpg" alt="">
                    <div class="card__info">
                        <p class="card__title">MONSTER HUNTER</p>
                        <p class="card__text">
                            <span class="card__text--genre">Drama, Action</span><span>&nbsp;|&nbsp;</span>
                            <span class="card__text--date">2020</span>
                            <span class="card__rating">8.0</span>
                        </p>
                    </div>
                </a>
            </li>
            `,
    );

}
