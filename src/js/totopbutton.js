import refs from "./refs.js"

const { toTopButton, headerSection } = refs;

window.onscroll = function() {scrollFunction()};
toTopButton.addEventListener('click', onTopBtnClick);

// ----- функция появления "Кнопки наверх" при скролле -----
function scrollFunction() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        toTopButton.classList.add('show')
    } else {
        toTopButton.classList.remove('show');
    }
}

// // ----- клик по "Кнопке наверх", переход на верх сайта -----
function onTopBtnClick(e) {
    headerSection.scrollIntoView({ behaviour: "smooth" });
}
