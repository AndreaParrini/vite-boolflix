<script>
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      searchText: '',
      movies: [],
      base_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=1624b90122a6e598e03c4e5d2ad8bd21'
    }
  },
  methods: {
    searchMovie() {
      const url = `${this.base_api_url}&query=${this.searchText}`
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          console.log(response.data.results);
          this.movies = response.data.results;
        })

    },
    urlImage(codiceIso) {
      const url = `/images/icons8-${codiceIso}-100.png`
      return url;
    }
  }
}
</script>

<template>
  <input type="text" name="searchMovie" id="searchMovie" v-model="searchText">
  <button @click="searchMovie">Search</button>
  <div v-for="movie in  movies " style="border: 2px solid black;">
    <ul>
      <li>
        <div>{{ movie.title }}</div>
      </li>
      <li>
        <div>{{ movie.original_title }}</div>
      </li>
      <li>
        <!-- <div>{{ movie.original_language }}</div> -->
        <div>
          <img v-if="urlImage(movie.original_language)" :src="urlImage(movie.original_language)"
            :alt="movie.original_language">
          <div v-else>pipppo</div>
        </div>
      </li>
      <li>
        <div>{{ movie.vote_average }}</div>
      </li>
    </ul>




  </div>
</template>

<style></style>
