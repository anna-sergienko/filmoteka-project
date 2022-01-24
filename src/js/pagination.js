import Pagination from 'tui-pagination';
import refs from './refs.js';

const { paginationSearch, paginationTrending } = refs;

const options1 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
         
         disabledMoveButton:
             '<span class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>'
  }
  
};

const options2 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
         
         disabledMoveButton:
             '<span class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>'
     }
}

const searchQueryPagination = new Pagination(paginationSearch, options1);
const trendingPaginationHome = new Pagination(paginationTrending, options2);  
 
export { trendingPaginationHome, searchQueryPagination };
