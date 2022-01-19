import filmCard from '../templates/movie-card.hbs';
import refs from './refs.js';
import Api from './api.js';
import filters from './filters.js';

const {
    headerError,
    bodyLightbox,
    cardList,
    headerLogo,
    headerFormInput,
    headerFormSubmitBtn,
    headerHome,
    headerQueueBtn,
    mainSection,
    mainList,
    headerMyLibrary,
    headerWatchedBtn,
    mainErrorQueue,
    mainErrorWatched,
} = refs;

const api = new Api();

headerHome.addEventListener('click', onLoadTrendingMoviesForToday);
headerLogo.addEventListener('click', onLoadTrendingMoviesForToday);
headerFormSubmitBtn.addEventListener('click', onSearchMovies);

headerWatchedBtn.addEventListener('click', emptyWatchedListError);
headerQueueBtn.addEventListener('click', emptyQueueListError);
// headerHome.addEventListener('click', headerHomeClearError);
mainList.addEventListener('click', lightboxOpen)

// ----- выполняеться при загруки -----
onLoadTrendingMoviesForToday()

// ----- Функция для загрузки списка самых популярных фильмов на сегодняя -----
export default function onLoadTrendingMoviesForToday() {

    api.fetchTrendingMoviesForToday().then(movies => {
        appendMovieCardMarkup(movies);
        clearMovieCardContainer();
        console.log(movies);
    });
}

// ----- Функция для загрузки фильмов по ключевому слову -----
function onSearchMovies(event) {
    event.preventDefault();
    api.query = headerFormInput.value.trim();

    api.fetchSearchMovies().then(movies => {

        appendMovieCardMarkup(movies);
        filters(movies);
        console.log(movies);
        clearMovieCardContainer();

    });
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


function lightboxOpen(e) {
    console.log(e.currentTarget, e.target, e.target.nodeName)
    if (e.target.nodeName !== "IMG") {
        return;
    }
    lightbox.classList.remove('none')
    bodyLightbox.classList.add('lightbox__open')
}

