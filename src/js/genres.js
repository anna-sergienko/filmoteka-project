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
      /*  console.log(film)       */                         // об'єкти фільмів з назвами жанрів
      return film.genre_ids;                          // масиви жанрів
    });

    const genresNameArray = genresIdsArray.map(elm => {
     /*  console.log(elm)  */
      return elm.map(id => {                          // Id жанрів
        const genreObj = this.genresName.find(gen => gen.id === id);
        const genreName = id = genreObj.name;
         /* console.log(genreName)  */
        return (genreName);                           // імена жанрів
      });
    });
     console.log(genresNameArray)
    const genresNameForMovie = genresNameArray.map(arrayNamesGenres => {  // масив з іменами жанрів
       /* console.log(arrayNamesGenres)  */
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
    filmGenres.forEach(elm => {
      /* console.log(elm)  */                      // фільм з заміненими жанрами
      elm.genre_ids = genresNameForMovie[index];
      /* console.log(elm.genre_ids)  */            // імена жанрів з Other, наприклад: Thriller,  Horror,  Other
      index += 1;
    });
  }

  addGenresInDetails(movieDetails) {
    for (const key in movieDetails) {
          let arrayGenres = movieDetails.genres;
          /*  console.log(key)  */
          console.log(arrayGenres)             //окремі масиви жанрів
        
          let genresArrayName = arrayGenres.map(elm => {
            /* console.log(elm.name)    */          //імена жанрів
            let nameObj = elm.name
            return (nameObj);
          });

          const genresNameDetails = genresArrayName.forEach(genre => {
            
            /* console.log(genre)   */                       //імена жанрів з Other
            if (genresArrayName.length === 2) {
              console.log(`${genresArrayName[0]},  ${genresArrayName[1]}`)
              return `${genresArrayName[0]},  ${genresArrayName[1]}`;
            }

            if (genresArrayName.length > 2) {
              console.log(`${genresArrayName[0]},  ${genresArrayName[1]},  Other`)
              return `${genresArrayName[0]},  ${genresArrayName[1]},  Other`;
            }
          })
          
        }
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
