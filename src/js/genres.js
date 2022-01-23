
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
      return film.genre_ids;
    });

    const genresNameArray = genresIdsArray.map(elm => {
      return elm.map(id => {
        const genreObj = this.genresName.find(gen => gen.id === id);
        const genreName = id = genreObj.name;
        return (genreName);
      });
    });

    const genresNameForMovie = genresNameArray.map(ArrNames => {
      if (ArrNames.length === 0) {
        return (ArrNames = 'No genre information');
      }

      if (ArrNames.length === 1) {
        return ArrNames;
      }

      if (ArrNames.length === 2) {
        return `${ArrNames[0]},  ${ArrNames[1]}`;
      }

      if (ArrNames.length > 2) {
        return `${ArrNames[0]},  ${ArrNames[1]},  Other`;
      }
    });

    let index = 0;
    filmGenres.forEach(elm => {
      elm.genre_ids = genresNameForMovie[index];
      index += 1;
    });
  }

  changeDate(date) {
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