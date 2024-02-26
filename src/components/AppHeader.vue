<script>
import { store } from "../store.js"

export default {
    name: 'AppHeader',
    data() {
        return {
            store
        }
    },
    methods: {
        goToHomePage() {
            store.loader = true;
            store.searchText = "";
            store.filterMovie = [];
            store.filterSerieTv = [];
            store.movies = [];
            store.serieTv = [];
        }
    }
}
</script>

<template>
    <header>
        <div class="container">
            <h2 class="title" @click="goToHomePage()"> Boolflix </h2>
            <input type="text" name="searchMovie" id="searchMovie" v-model="store.searchText"
                placeholder="Insert here a name" @keyup.enter="store.searchAll">
        </div>
    </header>
</template>



<style scoped>
header {
    background-color: var(--boolflix-dark);

    & .container {
        display: flex;
        justify-content: space-between;
        padding: 2rem 0;
        align-items: center;

        & .title {
            color: var(--boolflix-red);
            text-transform: uppercase;
            cursor: pointer;
        }

        & input {
            width: 180px;
            padding: 0.5rem;
        }

    }

}
</style>