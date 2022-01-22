import refs from './refs.js';

const { toTopButton, mainSection, footerLink, teamModalBackdrop, teamModalCloseBtn, bodyLightbox, teamContainer, footerSection } = refs;

footerLink.addEventListener("click", teamModalOpen);
teamModalCloseBtn.addEventListener("click", teamModalCloseOnBtn);
teamModalBackdrop.addEventListener("click", teamModalCloseOnBackdrop)


// ----- открытие модалки команды по кнопке-----
function teamModalOpen(e) {
  window.addEventListener('keydown', teamModalCloseOnEscape);
  teamModalBackdrop.classList.remove("team__backdrop-is-hidden");
  bodyLightbox.classList.add('lightbox__open')
  setTimeout(() => {
    teamContainer.classList.remove('modal__hidden')
  }, 100)

  toTopButton.classList.remove('show');
}

// ----- закрытие модалки команды по кнопке-----
function teamModalCloseOnBtn(e) {
  window.removeEventListener('keydown', teamModalCloseOnEscape);
  teamContainer.classList.add('modal__hidden')

  setTimeout(() => {
    teamModalBackdrop.classList.add("team__backdrop-is-hidden");
    bodyLightbox.classList.remove('lightbox__open')
  }, 350)
  footerSection.scrollIntoView({ behavior: "auto" })
}

// ----- закрытие модалки команды по клику вне модалки-----
function teamModalCloseOnBackdrop(e) {
  if (e.currentTarget === e.target) {
    teamModalCloseOnBtn();
  };
}

// ----- закрытие модалки команды по Escape-----
function teamModalCloseOnEscape(e) {
  if (e.code === 'Escape') {
    teamModalCloseOnBtn();
  };
}
