<script>
import { store } from '../store.js';
import SliderItem from './SliderItem.vue'

export default {
    name: 'SectionHomePage',
    components: {
        SliderItem
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <section class="home_page">
        <div class="intro">
            <h2>
                Benvenuto in <span>Boolflix</span>
            </h2>
            <div>
                Il sito per la ricerca e la scoperta di nuovi film/serie tv da vedere.
            </div>
            <div>
                Nel nostro sito potrai avere un grande varietà di scelta tra più di migliaia di film, con recensioni da
                parte di tutti i nostri utenti, cosi da poter avere già da subito una prima senzazione.
            </div>
        </div>
        <SliderItem></SliderItem>
    </section>
</template>

<style scoped>
.home_page {
    color: white;

    & .intro {
        text-align: center;

        &>h2 {
            margin: 1rem 0;

            & span {
                color: var(--boolflix-red);
                text-transform: uppercase;
            }
        }

        & div {
            margin: 0.5rem 0;
        }
    }

}
</style>