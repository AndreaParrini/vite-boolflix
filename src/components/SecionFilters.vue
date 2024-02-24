<script>
import { store } from '../store.js';

export default {
    name: 'SectionFilters',
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
    <section class="section_filters">
        <div class="movies">
            <div>Filtra per genere i film cercati</div>
            <select name="genreMovie" id="genreMovie" v-model="store.selectGenreMovie" @change="filterMovies()">
                <option value="" selected>All</option>
                <option :value="genre.id" v-for="genre in store.allGenresMovie">{{ genre.name }}</option>
            </select>
            <div v-if="store.filterMovie.length === 0"> Non ci sono film per questo genere</div>
        </div>
        <div class="serietv">
            <div>Filtra per genere le Serie Tv cercate</div>
            <select name="genreSerieTv" id="genreSerieTv" v-model="store.selectGenreSerieTv" @change="filterSerieTv()">
                <option value="" selected>All</option>
                <option :value="genre.id" v-for="genre in store.allGenresSerieTv">{{ genre.name }}</option>
            </select>
            <div v-if="store.filterSerieTv.length === 0"> Non ci sono SerieTv per questo genere</div>
        </div>

    </section>
</template>

<style scoped>
.section_filters {
    display: flex;
    justify-content: space-between;
    padding: 2rem;

    & .movies,
    .serietv {
        text-align: center;

        & div {
            margin: 0.5rem 0;
            color: var(--boolflix-red);

            &:first-child {
                text-transform: uppercase;
                color: white;
                font-weight: bold;
            }
        }
    }

    & select {
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
}
</style>