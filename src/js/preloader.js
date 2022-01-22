import refs from '../js/refs.js';
export { startPreloader, stopPreloader }

const { preloader, mainSection } = refs;

// ----- закрывает после первой загрузки страницыn-----
// window.onload = function () {
//     preloader.classList.add('none')
//     mainSection.classList.remove('main__preloader')
// }

// ----- для запуска -----
function startPreloader() {
    // mainSection.scrollIntoView({ behavior: "smooth" })
    preloader.classList.remove('preloader--hide')
    preloader.classList.remove('none')
    mainSection.classList.add('main__preloader')
    console.log('preloader started');
}


// ----- для остановки -----
function stopPreloader() {
    preloader.classList.add('preloader--hide')
    setTimeout(() => {
        preloader.classList.add('none')
        mainSection.classList.remove('main__preloader')
    }, 400)

}

//! ----- разкоментировать для запуска preloader без загрузки -----
// setTimeout(() => { startPreloader() }, 1000)


