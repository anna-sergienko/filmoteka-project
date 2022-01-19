import Pagination from 'tui-pagination';
import refs from './refs.js';

const { paginationSearch , paginationTrending } = refs;

const options1 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  usageStatistics: false, 
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected acent">{{page}}</strong>',
  },
};

const options2 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  usageStatistics: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected acent">{{page}}</strong>',
  },
};
 
const searchQueryPagination = new Pagination(paginationSearch, options1);
const trendingPaginationHome = new Pagination(paginationTrending, options2); 

export { trendingPaginationHome, searchQueryPagination };



//-----создание списка-для-пагинации-------
/* const options = {
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


export {pagination}; */