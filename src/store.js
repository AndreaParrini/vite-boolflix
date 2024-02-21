import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
    // STATE

    searchText: '',
    languages: [],
    movies: [],
    loader: true,
    error: false,
    base_api_url_movies: 'https://api.themoviedb.org/3/search/movie?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',
    base_api_url_serietv: 'https://api.themoviedb.org/3/search/tv?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',

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
                const allSerieTV = response.data.results;
                if (response.data.results.length != 0) {
                    for (let i = 0; i < allSerieTV.length; i++) {
                        const element = allSerieTV[i];
                        this.movies.push(element)
                    }
                    this.error = false;
                } else {
                    this.movies = [];
                    this.error = true;

                }
                this.loader = false

            })
    },
    searchAll() {
        this.searchMovie();
        this.searchSerieTv();
    },
})