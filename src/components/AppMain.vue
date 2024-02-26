<script>
import { store } from '../store';
import SectionHomePage from './SectionHomePage.vue';
import SectionMovie from './SectionMovie.vue';
export default {
    name: 'AppMain',
    components: {
        SectionHomePage,
        SectionMovie
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <main>
        <div class="container">
            <SectionHomePage v-if="store.loader"></SectionHomePage>
            <SectionMovie v-else></SectionMovie>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: var(--boolflix-primary);
    min-height: 80vh;
}
</style>