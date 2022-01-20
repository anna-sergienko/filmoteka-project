import refs from '../js/refs.js';

const { headerLogoIcon, footerHeart, mainSection } = refs;

footerHeart.addEventListener('click', bookmark)

function bookmark() {
    // console.log('click');
    // browser.bookmarks.create({
    //     title: "bookmarks.create() on MDN",
    //     url: "https://developer.mozilla.org/Add-ons/WebExtensions/API/bookmarks/create"
    // });
    mainSection.scrollIntoView()
}


