import Pagination from 'tui-pagination';
import Api from '../js/api.js';
import refs from './refs.js';

//-----создание списка-для-пагинации-------
const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};
const pagination = new Pagination('pagination', options);
function chooseRender(currentPage) {
  Api.fetchSearchMovies(currentPage);
  if (Api.searchQuery === '') {
    incrementPage()
    
  } else {
    decrementPage()
    
  }
};

export {pagination};