// import clearInnerHTML from './common.js'
// import { homePage, myLibrary } from './header.js'
import refs from './refs.js';

// console.log('main');
const {
    headerHome,
    headerQueueBtn,
    mainSection,
    mainList,
    headerMyLibrary,
    headerWatchedBtn,
    mainErrorQueue,
    mainErrorWatched,
} = refs;

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
