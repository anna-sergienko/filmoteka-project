export default class Genres {
  constructor() {
    this.genresName = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" }
    ];
  }

  addGenres(filmGenres) {
    const genresIdsArray = filmGenres.map(film => {
      /*  console.log(film)   */                      // об'єкти фільмів з назвами жанрів
      return film.genre_ids;                          // масиви жанрів
    });

    const genresNameArray = genresIdsArray.map(elm => {
      return elm.map(id => {                          // Id жанрів
        const genreObj = this.genresName.find(gen => gen.id === id);
        const genreName = id = genreObj.name;
        return (genreName);                           // імена жанрів
      });
    });
     
    const genresNameForMovie = genresNameArray.map(arrayNamesGenres => {  // масив з іменами жанрів
      
      if (arrayNamesGenres.length === 0) {            // якщо немає інформації про жанри
        return (arrayNamesGenres = 'No genre information');
      }

      if (arrayNamesGenres.length === 1) {            // якщо один жанр, запиши його
        return arrayNamesGenres;
      }

      if (arrayNamesGenres.length === 2) {           // якщо два жанри, запиши їх
        return `${arrayNamesGenres[0]},  ${arrayNamesGenres[1]}`;
      }

      if (arrayNamesGenres.length > 2) {             // якщо три жанри і більше, запиши два жанри і Other
        return `${arrayNamesGenres[0]},  ${arrayNamesGenres[1]},  Other`;
      }
    });

    let index = 0;
    filmGenres.forEach(elm => {                     // фільм з заміненими жанрами                
      elm.genre_ids = genresNameForMovie[index];    // імена жанрів з Other, наприклад: Thriller,  Horror,  Other          
      index += 1;
    });
  }

  changeDate(date) {                                // зміна дати у картках фільму
    date.forEach(elm => {
      if (elm.release_date || null) {
        elm.release_date = elm.release_date.slice(0, 4);
      } else if (elm.first_air_date || null) {
        elm.first_air_date = elm.first_air_date.slice(0, 4);
      }
      if (elm.release_date === undefined) {
        return (elm.release_date = 'No date');
      }
      if (elm.first_air_date === undefined) {
        return (elm.first_air_date = 'No date');
      }
      return;
    });
  }
}

