<script>
import axios from "axios";
import AppHeader from './components/AppHeader.vue'
import AppMain from "./components/AppMain.vue";
import AppFooter from "./components/AppFooter.vue";
import { store } from "./store";

export default {
  name: 'App',
  data() {
    return {
      store
    }
  },
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  methods: {
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
  <AppMain></AppMain>
  <AppFooter></AppFooter>
</template>

<style scoped></style>
