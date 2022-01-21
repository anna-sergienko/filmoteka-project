import axios from "axios";

const API_KEY = 'd3c00761eff125b45afbcd52d8235bc7';
const BASE_URL = 'https://api.themoviedb.org/3/';

// ----- Общий класс для запроса фильмов из API -----
export default class Api {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.movie_id = null; 
    }

    // ----- Метод класса для запроса на список самых популярных фильмов на сегодня -----
    async fetchTrendingMoviesForToday() {
        const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.page}&language=en-US`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log(data)
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    // ----- Метод класса для запроса фильмов по ключевому слову  -----
    async fetchSearchMovies() {
        const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    // ----- Метод класса для запроса полной информации о фильме для страницы фильма -----
    async fetchMovieDetails() {
        const url = `${BASE_URL}movie/${this.movie_id}?api_key=${API_KEY}`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    // ----- Метод класса для запроса жанра фильмов -----
    async fetchGenre() {
        const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    decrementPage() {
        this.page -= 1;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get idquery() {
        return this.movie_id
    }
    set idquery(newId) {
        this.movie_id = newId;
    }
}

