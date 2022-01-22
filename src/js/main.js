import filmCard from '../templates/movie-card.hbs';
import lightboxTpl from '../templates/lightboxTpl.hbs';
import refs from './refs.js';
import Api from './api.js';
import filters from './filters.js';
import { lightboxCloseOnEscape } from './lightbox.js';
import { trendingPaginationHome, searchQueryPagination } from './pagination.js';

const {
  headerError,
  headerSection,
  paginationSearch,
  paginationTrending,
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
  lightboxContainer,
  lightboxHandlebars,
} = refs;

const api = new Api();
export let scrollToMe;

headerHome.addEventListener('click', onLoadTrendingMoviesForToday);
headerLogo.addEventListener('click', onLoadTrendingMoviesForToday);
headerFormSubmitBtn.addEventListener('click', onSearchMovies);

headerWatchedBtn.addEventListener('click', emptyWatchedListError);
headerQueueBtn.addEventListener('click', emptyQueueListError);
// headerHome.addEventListener('click', headerHomeClearError);
mainList.addEventListener('click', lightboxOpen)

// ----- выполняеться при загруки -----
onLoadTrendingMoviesForToday()

//----- переключатель класов -----
function switchClass(refsRemove, refsAdd, cl) {
  refsRemove.classList.remove(cl);
  refsAdd.classList.add(cl);
}

//----- пагинация списка самых популярных фильмов на сегодняя -----
trendingPaginationHome.on('afterMove', e => {
  api.page = e.page;
  api.fetchTrendingMoviesForToday()
    .then((movies) => {
      appendMovieCardMarkup(movies);
     
    })
    .catch(err => console.log(err))
});

// ----- функция для загрузки списка самых популярных фильмов на сегодняя -----
export default function onLoadTrendingMoviesForToday() {

  api.fetchTrendingMoviesForToday().then(movies => {
    clearMovieCardContainer();
    appendMovieCardMarkup(movies);

    switchClass(paginationTrending, paginationSearch, 'visually-hidden');
    trendingPaginationHome.setTotalItems(movies.total_results);
    trendingPaginationHome.movePageTo(1);
    console.log(movies);
  });
}

// ----- пагинация загрузки фильмов по ключевому слову -----
searchQueryPagination.on('beforeMove', (e) => {
  api.page = e.page;
  api.fetchSearchMovies()
    .then((movies) => {
      appendMovieCardMarkup(movies);
      
    })
    .catch(err => console.log(err))
});

// ----- функция для загрузки фильмов по ключевому слову -----
function onSearchMovies(event) {
  api.query = headerFormInput.value.trim();
  api.resetPage(); 
  event.preventDefault();
  if (api.query === '') {
    event.preventDefault();
    
    headerError.classList.remove('hidden', 'none');
    setTimeout(() => {
      headerError.classList.add('hidden', 'none');
    }, 3000);
    return;
  }

  if (api.query !== '') {
    api.fetchSearchMovies()
      .then((movies) => {
        if (movies.results.length < 1) {
          headerError.classList.remove('hidden', 'none');
          setTimeout(() => {
            headerError.classList.add('hidden', 'none');
          }, 3000);
          cleanInput()
          return;
        };
        if (movies.results.length > 1) {
          headerError.classList.add('hidden', 'none');
          clearMovieCardContainer();
          appendMovieCardMarkup(movies.results);
          
          cleanInput()

          switchClass(paginationSearch, paginationTrending, 'visually-hidden');
          searchQueryPagination.setTotalItems(movies.total_results);
          searchQueryPagination.movePageTo(1);
          console.log(movies);
        }

      })
      .catch(err => console.log(err))
  }
}

// ----- функция для очистки инпута  -----
function cleanInput() {
  headerFormInput.value = '';
}

// ----- функция для разметки картки фильма  -----
async function appendMovieCardMarkup(movies) {
  const markup = await filmCard(movies.results);
  cardList.innerHTML = markup;
}

// // ----- функция для очистки разметки картки фильма -----
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

// ---- открыть lightbox по нажатию на картинку -----
function lightboxOpen(e) {
  let movieId = e.target.dataset.id
  api.idquery = movieId
  api.fetchMovieDetails().then((movie) => {
    console.log(movie)
    lightboxHandlebars.insertAdjacentHTML('afterbegin', lightboxTpl(movie))
  })
  if (e.target.classList.contains('lightbox-open')) {
    lightbox.classList.remove('none')
    bodyLightbox.classList.add('lightbox__open')
    setTimeout(() => {
      lightboxContainer.classList.remove('modal__hidden')
    }, 50)

    window.addEventListener('keydown', lightboxCloseOnEscape);
  }
  return;
}


