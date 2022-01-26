import filmCard from '../templates/movie-card.hbs';
import lightboxTpl from '../templates/lightboxTpl.hbs';
import refs from './refs.js';
import Api from './api.js';
import localStorage from './local-storage.js'
import { startPreloader, stopPreloader } from './preloader.js'
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
  lightboxAddToWatchedBtn,
  lightbox,
  toTopButton,

} = refs;

const api = new Api();

export let scrollToMe;


headerHome.addEventListener('click', onLoadTrendingMoviesForToday);
headerLogo.addEventListener('click', onLoadTrendingMoviesForToday);
headerFormSubmitBtn.addEventListener('click', onSearchMovies);

// headerWatchedBtn.addEventListener('click', emptyWatchedListError);
// headerQueueBtn.addEventListener('click', emptyQueueListError);
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
  startPreloader()
  api.page = e.page;
  api.fetchTrendingMoviesForToday()
    .then(async movies => {
      const genres = await api.fetchGenre();
      return { movies, genres };
    })
    .then(obj => {
      const data = obj.movies.results.map(({ release_date, genre_ids, ...movie }) => {
        const data = {
          ...movie,
          release_date: release_date?.split('-')[0],
          genres: genre_ids.map(id => obj.genres[id]),   // переобразование id в name

        };


        if (data.genres.length > 3) {
          data.genres.splice(2, genre_ids.length - 2, 'Other');
        }
        return { ...data, genres: data.genres.join(', ') };
      }); console.log(data)

      headerSection.scrollIntoView({ behavior: "smooth" });
      appendMovieCardMarkup(data);
      stopPreloader()
    })
    .catch(err => console.log(err))
})

// ----- функция для загрузки списка самых популярных фильмов на сегодняя -----
export default function onLoadTrendingMoviesForToday() {
  startPreloader()
  api.fetchTrendingMoviesForToday().then(movies => {
    clearMovieCardContainer();
    appendMovieCardMarkup(movies);
    switchClass(paginationTrending, paginationSearch, 'visually-hidden');
    trendingPaginationHome.setTotalItems(movies.total_results);
    trendingPaginationHome.movePageTo(1);
    stopPreloader()
  });
}

// ----- пагинация загрузки фильмов по ключевому слову -----
searchQueryPagination.on('beforeMove', (e) => {
  startPreloader()
  api.page = e.page;
  api.fetchSearchMovies()
    .then(async movies => {
      const genres = await api.fetchGenre();
      return { movies, genres };
    })
    .then(obj => {
      const data = obj.movies.results.map(({ release_date, genre_ids, ...movie }) => {
        const data = {
          ...movie,
          release_date: release_date?.split('-')[0],
          genres: genre_ids.map(id => obj.genres[id]),   // переобразование id в name
        };
        if (data.genres.length > 3) {
          data.genres.splice(2, genre_ids.length - 2, 'Other');
        }
        return { ...data, genres: data.genres.join(', ') };
      });
      mainSection.scrollIntoView({ behavior: "smooth" });
      appendMovieCardMarkup(data);
      stopPreloader()
    })
    .catch(err => console.log(err))
});

// ----- функция для загрузки фильмов по ключевому слову -----
function onSearchMovies(event) {
  startPreloader()
  api.query = headerFormInput.value.trim();
  api.resetPage();
  event.preventDefault();
  if (api.query === '') {
    event.preventDefault();
    headerError.classList.remove('hidden', 'none');
    setTimeout(() => {
      headerError.classList.add('hidden', 'none');
    }, 3000);
    stopPreloader()
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
          stopPreloader()
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
          stopPreloader()
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
export async function appendMovieCardMarkup(data) {
  const markup = await filmCard(data);
  cardList.innerHTML = markup;
}

// ----- функция для очистки разметки картки фильма -----

export function clearMovieCardContainer() {
  cardList.innerHTML = '';
}

// ----- очищает список -----
function clearMainList() {
  mainList.innerHTML = '';
}

// ----- пустой список Watched -----
export function emptyWatchedListError() {
  mainSection.classList.add('main-error');
  mainErrorWatched.classList.remove('none');
  mainErrorQueue.classList.add('none');
  mainList.classList.add('card__list--none')
}

// ----- пустой список Queue -----
export function emptyQueueListError() {
  mainSection.classList.add('main-error');
  mainErrorQueue.classList.remove('none');
  mainErrorWatched.classList.add('none');
  mainList.classList.add('card__list--none')
}

// ----- вернуть в нормальный стиль main -----
export function clearEmptyError() {
  mainErrorWatched.classList.add('none');
  mainErrorQueue.classList.add('none');
  mainSection.classList.remove('main-error');
}

// ---- открыть lightbox по нажатию на картинку -----
async function lightboxOpen(e) {
  // console.log(e.target.classList)
  if (!(e.target.classList.contains('lightbox-open'))) {
    // console.log('test');
    return
  }
  toTopButton.classList.remove('show');
  startPreloader()
  let GenresToArray = {}
  let lightboxHTML = {};
  let watchedlog = {};
  let queuelog = {};
  let movieId = e.target.dataset.id   // проверка data-id
  api.idQuery = movieId   //запрос на api по фильму             
  await api.fetchMovieDetails().then((movie) => {

    localStorage.setItem('currentMovieId', movie.id)
    console.log(movie)
    let genresFromMovieId = movie.genres
    console.log(genresFromMovieId);
    GenresToArray = genresFromMovieId.map((el) => {
      return el.name
    })


    console.log(GenresToArray);
    let genresForModal = { renderGenres: (GenresToArray.join(', ')) }
    console.log(genresForModal);

    lightboxHTML = { ...genresForModal, ...movie }
    console.log(lightboxHTML);
    if (!(localStorage.getItem('userWatchedList') === undefined) && localStorage.getItem('userWatchedList').includes(localStorage.getItem('currentMovieId'))) {
      let watchedState = { watched: true }
      watchedlog = { ...watchedState, ...lightboxHTML }
      // console.log(watchedlog);
      lightboxHTML = watchedlog
    }
    if (!(localStorage.getItem('userQueueList') === undefined) && localStorage.getItem('userQueueList').includes(localStorage.getItem('currentMovieId'))) {
      let queueState = { queue: true }
      queuelog = { ...queueState, ...lightboxHTML }
      // console.log(queuelog);
      lightboxHTML = queuelog
      // lightboxHandlebars.insertAdjacentHTML('afterbegin', lightboxTpl(watchedlog)) // рендерит ответ с api по шаблону lightboxTpl
    }
    // && (localStorage.getItem('userWatchedList')).includes(localStorage.getItem('currentMovieId')))

    // console.log(`in localStorage currentMovieId: ${localStorage.getItem('currentMovieId')}`);
    lightboxHandlebars.insertAdjacentHTML('afterbegin', lightboxTpl(lightboxHTML)) // рендерит ответ с api по шаблону lightboxTpl
    stopPreloader()
  })
  if (e.target.classList.contains('lightbox-open')) {
    lightbox.classList.remove('none')
    bodyLightbox.classList.add('lightbox__open')
    setTimeout(() => {
      lightboxContainer.classList.remove('modal__hidden')
    }, 50)
    window.addEventListener('keydown', lightboxCloseOnEscape);
    // lightboxAddToWatchedBtn.addEventListener("click", () => {
    //   console.log("click");
    // });
  }
  return;
}




