import refs from '../js/refs.js';
export { startPreloader, stopPreloader }

const { preloader, mainSection } = refs;

// ----- закрывает после первой загрузки страницыn-----
window.onload = function () {
    preloader.classList.add('none')
    mainSection.classList.remove('main__preloader')
}

// ----- для запуска -----
function startPreloader() {
    preloader.classList.remove('none')
    mainSection.classList.add('main__preloader')
}

// ----- для остановки -----
function stopPreloader() {
    preloader.classList.add('preloader--hide')
    setTimeout(() => {
        preloader.classList.add('none')
        mainSection.classList.remove('main__preloader')
    }, 400)

}

