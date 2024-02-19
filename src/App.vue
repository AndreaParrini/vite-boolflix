<script>
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      searchText: '',
      movies: [],
      base_api_url_movies: 'https://api.themoviedb.org/3/search/movie?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT',
      base_api_url_serietv: 'https://api.themoviedb.org/3/search/tv?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT'

    }
  },
  methods: {
    searchMovie() {
      const url = `${this.base_api_url_movies}&query=${this.searchText}`
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          console.log(response.data.results);
          this.movies = response.data.results;
        })
    },
    searchSerieTv() {
      const url = `${this.base_api_url_serietv}&query=${this.searchText}`
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          console.log(response.data.results);
          const allSerieTV = response.data.results;
          for (let i = 0; i < allSerieTV.length; i++) {
            const element = allSerieTV[i];
            this.movies.push(element)
          }
        })
    },
    searchAll() {
      this.searchMovie();
      this.searchSerieTv();
    },
    urlImage(codiceIso) {
      const url = `/images/icons8-${codiceIso}-100.png`
      return url;
    },
    conversionVote(vote) {
      const newVote = (vote * 5) / 10;
      return Math.floor(newVote);
    }
  }
}
</script>

<template>
  <input type="text" name="searchMovie" id="searchMovie" v-model="searchText">
  <button @click="searchAll">Search</button>
  <div v-for="movie in  movies " style="border: 2px solid black;">
    <ul>
      <li>
        <div>{{ movie.title ? movie.title : movie.name }}</div>
      </li>
      <li>
        <div>{{ movie.original_title ? movie.original_title : movie.original_name }}</div>
      </li>
      <li>
        <div>
          <img :src="urlImage(movie.original_language)" :alt="movie.original_language">
        </div>
      </li>
      <li>
        <div>{{ conversionVote(movie.vote_average) }}</div>
      </li>
    </ul>




  </div>
</template>

<style></style>
