<script>
import axios from "axios";
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      searchText: '',
      languages: [],
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
    },
    nameLanguage(language) {
      for (let i = 0; i < this.languages.length; i++) {
        const element = this.languages[i];
        if (element.iso_639_1 === language) {
          return element.english_name;
        }
      }
    }
  },
  mounted() {
    axios
      .get('https://api.themoviedb.org/3/configuration/languages?api_key=e99307154c6dfb0b4750f6603256716d')
      .then((response) => {
        console.log(response.data);
        this.languages = response.data
      })
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <!-- <input type="text" name="searchMovie" id="searchMovie" v-model="searchText">
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
          <img :src="urlImage(movie.original_language)" :alt="nameLanguage(movie.original_language)">
        </div>
      </li>
      <li>
        <i class="fa-solid fa-star" style="color: #FFD43B;" v-for=" in conversionVote(movie.vote_average)"></i>
        <i class="fa-regular fa-star" v-for=" in (5 - conversionVote(movie.vote_average))"></i>
      </li>
    </ul>
  </div> -->
</template>

<style scoped></style>
