import refs from './refs.js';
import onLoadTrendingMoviesForToday from './main'; 

const { headerError, headerFormInput } = refs;

export default function filterInput(movies) {
    nothingFound(movies);
    successfulRequest(movies);
}

function nothingFound(movies) {
    if (movies.results.length === 0) {
        onLoadTrendingMoviesForToday();   
        cleanInput()
    }
}  
 
function successfulRequest(movies) {
    if (movies.results.length >= 1) {
        headerError.classList.add('hidden', 'none')
        cleanInput()
    }
} 

function cleanInput() {
  headerFormInput.value = '';
}


