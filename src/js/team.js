import refs from './refs.js';

const { footerLink, teamModalBackdrop, teamModalCloseBtn } = refs;

footerLink.addEventListener("click", teamModalOpen);
teamModalCloseBtn.addEventListener("click", teamModalCloseOnBtn);
teamModalBackdrop.addEventListener("click", teamModalCloseOnBackdrop)


// ----- открытие модалки команды по кнопке-----
function teamModalOpen(e) {
  window.addEventListener('keydown', teamModalCloseOnEscape);
  teamModalBackdrop.classList.remove("team__backdrop-is-hidden"); 
}

// ----- закрытие модалки команды по кнопке-----
function teamModalCloseOnBtn(e) {
  window.removeEventListener('keydown', teamModalCloseOnEscape);
  teamModalBackdrop.classList.add("team__backdrop-is-hidden"); 
}

// ----- закрытие модалки команды по клику вне модалки-----
function teamModalCloseOnBackdrop(e) {
  if(e.currentTarget === e.target) {
    teamModalCloseOnBtn();
  };
}

 // ----- закрытие модалки команды по Escape-----
function teamModalCloseOnEscape(e) {
  if(e.code === 'Escape') {
    teamModalCloseOnBtn();
  };
}
