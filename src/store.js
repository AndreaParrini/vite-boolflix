import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
    // STATE

    searchText: '',
    languages: [],
    movies: [],
    serieTv: [],
    loader: true,
    error: false,
    errorMessage: '',
    allGenresMovie: [],
    allGenresSerieTv: [],
    filterMovie: [],
    filterSerieTv: [],
    selectGenreMovie: '',
    selectGenreSerieTv: '',
    base_api_url_movies: 'https://api.themoviedb.org/3/search/movie?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',
    base_api_url_serietv: 'https://api.themoviedb.org/3/search/tv?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',


    // ACTIONS
    searchMovie() {
        const url = `${this.base_api_url_movies}&query=${this.searchText}`
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                if (response.data.results.length != 0) {
                    this.movies = response.data.results;
                    this.filterMovie = this.movies;
                    this.error = false;
                } else {
                    this.movies = [];
                    this.filterMovie = [];
                    this.error = true;
                    this.erroreMessage('Film');
                }
                this.loader = false;
            })
            .catch((error) => {
                console.error(error);
            })
    },
    searchSerieTv() {
        const url = `${this.base_api_url_serietv}&query=${this.searchText}`
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                if (response.data.results.length != 0) {
                    this.serieTv = response.data.results;
                    this.filterSerieTv = this.serieTv;
                    this.error = false;
                } else {
                    this.serieTv = [];
                    this.filterSerieTv = [];
                    this.error = true;
                    this.erroreMessage('Serie TV');
                }
                this.loader = false
            })
            .catch((error) => {
                console.error(error);
            })
    },
    searchAll() {
        this.searchMovie();
        this.searchSerieTv();
    },
    erroreMessage(type) {
        if (store.searchText) {
            this.errorMessage = `Per la ricerca effettuata non ci sono ${type}, modifica e riprova.`
        } else {
            this.errorMessage = 'Non hai inserito nulla, inserisci nel campo apposito e clicca enter.'

        }
    },
    getAllGenresMovie() {
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
            .then((response) => {
                this.allGenresMovie = response.data.genres;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getAllGenresSerieTv() {
        axios
            .get('https://api.themoviedb.org/3/genre/tv/list?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
            .then((response) => {
                this.allGenresSerieTv = response.data.genres;
            })
            .catch((error) => {
                console.error(error);
            });
    }
})