<script>
import { formToJSON } from 'axios';
import { store } from '../store';
import CardItem from './CardItem.vue';

export default {
    name: 'SectionMovie',
    components: {
        CardItem
    },
    data() {
        return {
            store
        }
    },
    methods: {
        filterMovies() {
            if (store.selectGenreMovie != "") {
                store.filterMovie = [];
                console.log('filtro');
                for (let i = 0; i < store.movies.length; i++) {
                    const element = store.movies[i];
                    for (let i = 0; i < element.genre_ids.length; i++) {
                        const genre = element.genre_ids[i];
                        if (genre === store.selectGenreMovie) {
                            store.filterMovie.push(element)
                        }
                    }
                }
            } else {
                console.log('uguale');
                store.filterMovie = store.movies;
            }

        },
        filterSerieTv() {
            if (store.selectGenreSerieTv != "") {
                store.filterSerieTv = [];
                for (let i = 0; i < store.serieTv.length; i++) {
                    const element = store.serieTv[i];
                    for (let i = 0; i < element.genre_ids.length; i++) {
                        const genre = element.genre_ids[i];
                        if (genre === store.selectGenreSerieTv) {
                            store.filterSerieTv.push(element)
                        }
                    }
                }
            } else {
                store.filterSerieTv = store.serieTv;
            }

        }
    }
}
</script>

<template>
    <section class="error" v-if="store.error">
        {{ store.errorMessage }}
    </section>
    <section class="section_movies" v-else>
        <section class="section_filters">
            <select name="genreMovie" id="genreMovie" v-model="store.selectGenreMovie" @change="filterMovies()">
                <option value="" selected>All</option>
                <option :value="genre.id" v-for="genre in store.allGenresMovie">{{ genre.name }}</option>
            </select>
            <select name="genreSerieTv" id="genreSerieTv" v-model="store.selectGenreSerieTv" @change="filterSerieTv()">
                <option value="" selected>All</option>

                <option :value="genre.id" v-for="genre in store.allGenresSerieTv">{{ genre.name }}</option>
            </select>
        </section>
        <div v-if="store.filterMovie.length === 0"> Non ci sono film per questo genere</div>
        <div class="row">
            <CardItem :movie="movie" :type="'movie'" :key="movie.id" v-for=" movie  in  store.filterMovie  "></CardItem>
            <CardItem :movie="serieTv" :type="'serieTv'" :key="serieTv.id" v-for=" serieTv  in  store.filterSerieTv  ">
            </CardItem>
        </div>
    </section>
</template>

<style scoped></style>
