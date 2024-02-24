<script>
import { store } from '../store.js';
import CardItem from './CardItem.vue';
import SecionFilters from './SecionFilters.vue';

export default {
    name: 'SectionMovie',
    components: {
        CardItem,
        SecionFilters
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <section class="error" v-if="store.error">
        {{ store.errorMessage }}
    </section>
    <section class="section_movies" v-else>
        <SecionFilters></SecionFilters>
        <div class="row">
            <CardItem :movie="movie" :type="'movie'" :key="movie.id" v-for=" movie  in  store.filterMovie  "></CardItem>
            <CardItem :movie="serieTv" :type="'serieTv'" :key="serieTv.id" v-for=" serieTv  in  store.filterSerieTv  ">
            </CardItem>
        </div>
    </section>
</template>

<style scoped></style>
