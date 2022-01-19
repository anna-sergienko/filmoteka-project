import refs from './refs.js';
import onLoadTrendingMoviesForToday from './main'; 
import { startPreloader, stopPreloader } from './preloader.js';
const { headerError, headerFormInput } = refs;

 export default function filterInput(movies) {
    nothingFound(movies);
    successfulRequest(movies);
} 

 function nothingFound(movies) {
     if (movies.results.length === 0) {
        startPreloader() 
        /* onLoadTrendingMoviesForToday();     */
        cleanInput()
    }
}  
 
function successfulRequest(movies) {
    if (movies.results.length >= 1) {
        headerError.classList.add('hidden', 'none')
        cleanInput()
    }
} 

 /* function cleanInput() {
  headerFormInput.value = '';
} */


