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
    },
    methods: {

    }
}
</script>

<template>
    <section class="error" v-if="store.error">
        {{ store.errorMessage }}
    </section>
    <section class="section_movies" v-else>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl" v-for=" movie  in  store.movies  ">
                <CardItem :movie="movie" :key="movie.id"></CardItem>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
