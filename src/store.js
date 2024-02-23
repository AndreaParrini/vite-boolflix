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
    base_api_url_movies: 'https://api.themoviedb.org/3/search/movie?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',
    base_api_url_serietv: 'https://api.themoviedb.org/3/search/tv?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',
    //base_api_url_cast_serietv: `https//api.themoviedb.org/3/tv/${id}/credits?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT`,
    base_api_url_cast_movie: `https//api.themoviedb.org/3/movie/`,


    // ACTIONS
    searchMovie() {
        const url = `${this.base_api_url_movies}&query=${this.searchText}`
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                /* console.log(response);
                console.log(response.data.results); */
                if (response.data.results.length != 0) {
                    this.movies = response.data.results;
                    this.error = false;
                } else {
                    this.movies = [];
                    this.error = true;
                    this.erroreMessage();
                }
                this.loader = false;
            })
    },
    searchSerieTv() {
        const url = `${this.base_api_url_serietv}&query=${this.searchText}`
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                /* console.log(response);
                console.log(response.data.results); */
                if (response.data.results.length != 0) {
                    this.serieTv = response.data.results;
                    this.error = false;
                } else {
                    this.movies = [];
                    this.error = true;
                    this.erroreMessage();
                }
                this.loader = false

            })
    },
    searchAll() {
        this.searchMovie();
        this.searchSerieTv();
    },
    erroreMessage() {
        if (store.searchText) {
            this.errorMessage = 'Per la ricerca effettuata non ci sono risultati, modifica e riprova.'
        } else {
            this.errorMessage = 'Non hai inserito nulla, inserisci nel campo apposito e clicca enter.'

        }
    },
    getAllGenresMovie() {
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
            .then((response) => {
                this.allGenresMovie = response.data.genres;
            });
    },
    getAllGenresSerieTv() {
        axios
            .get('https://api.themoviedb.org/3/genre/tv/list?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
            .then((response) => {
                this.allGenresSerieTv = response.data.genres;
            });
    }
})