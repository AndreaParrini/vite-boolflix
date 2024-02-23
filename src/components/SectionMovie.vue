<script>
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
    }
}
</script>

<template>
    <section class="error" v-if="store.error">
        {{ store.errorMessage }}
    </section>
    <section class="section_movies" v-else>
        <div class="row">
            <CardItem :movie="movie" :type="'movie'" :key="movie.id" v-for=" movie  in  store.movies  "></CardItem>
            <CardItem :movie="serieTv" :type="'serieTv'" :key="serieTv.id" v-for=" serieTv  in  store.serieTv  "></CardItem>
        </div>
    </section>
</template>

<style scoped></style>
