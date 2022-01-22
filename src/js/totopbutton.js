import refs from "./refs.js"

const { toTopButton } = refs;

window.onscroll = function() {scrollFunction()};
toTopButton.addEventListener('click', onTopBtnClick);

// ----- функция появления "Кнопки наверх" при скролле -----
function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        toTopButton.classList.add('show')
    } else {
        toTopButton.classList.remove('show');
    }
}

// ----- клик по "Кнопке наверх", переход на верх сайта -----
function onTopBtnClick() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.animate({ scrollTop: 0 }, '300');
}
