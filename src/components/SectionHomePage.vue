<script>
import { store } from '../store';

export default {
    name: 'SectionHomePage',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <section class="home_page" v-if="store.loader">
        <div>
            Benvenuto in Boolflix, il sito per la ricerca e la scoperta di nuovi film\serie tv da vedere.
            Nel nostro sito potrai avere un grande varietà di scelta tra più di migliaia di film, con recensioni da
            parte di tutti i nostri utenti, cosi da poter avere già da subito una prima senzazione.
        </div>
    </section>
</template>

<style scoped>
.home_page {
    height: 30vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>