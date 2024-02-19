<script>
import axios from "axios";
import AppHeader from './components/AppHeader.vue'
import { store } from "./store";

export default {
  name: 'App',
  components: {
    AppHeader
  },
  methods: {
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
    },
    getAllLanguages() {
      axios
        .get('https://api.themoviedb.org/3/configuration/languages?api_key=e99307154c6dfb0b4750f6603256716d')
        .then((response) => {
          store.languages = response.data;
        })
    }
  },
  mounted() {
    this.getAllLanguages();
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
