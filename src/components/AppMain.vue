<script>
import { store } from '../store';
export default {
    name: 'AppMain',
    data() {
        return {
            store
        }
    },
    methods: {
        urlImage(codiceIso) {
            const url = `/images/icons8-${codiceIso}-100.png`
            return url;
        },
        conversionVote(vote) {
            const newVote = (vote * 5) / 10;
            return Math.floor(newVote);
        },
        nameLanguage(language) {
            for (let i = 0; i < store.languages.length; i++) {
                const element = store.languages[i];
                if (element.iso_639_1 === language) {
                    return element.english_name;
                }
            }
        },
        isNull(image) {
            if (image != null) {
                return true
            }
            return false;
        }
    }
}
</script>

<template>
    <main>
        <div class="container">
            <div class="row" v-if="store.loader">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl" v-for=" movie  in  store.movies  ">
                    <div class="card">
                        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt=""
                            v-if="isNull(movie.poster_path)">
                        <div class="info">
                            <div class="title">
                                <span>Titolo:</span> {{ movie.title ? movie.title : movie.name }}
                            </div>
                            <div class="original_title">
                                <span>Titolo Originale:</span> {{ movie.original_title ? movie.original_title :
                                    movie.original_name }}
                            </div>
                            <div class="language">
                                <span>Lingua:</span>
                                <img :src="urlImage(movie.original_language)" :alt="nameLanguage(movie.original_language)">
                            </div>
                            <div class="vote">
                                <span>Voto:</span>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"
                                    v-for=" in  conversionVote(movie.vote_average) "></i>
                                <i class="fa-regular fa-star" v-for=" in  (5 - conversionVote(movie.vote_average)) "></i>
                            </div>
                            <div class="overview">
                                <span>Overview:</span>
                                <div>{{ movie.overview ? movie.overview : "In this movie there isn't a overview" }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home_page" v-else>
                Benvenuto in Boolflix, il sito per la ricerca e la scoperta di nuovi film\serie tv da vedere.
                Nel nostro sito potrai avere un grande varietà di scelta tra più di migliaia di film, con recensioni da
                parte di tutti i nostri utenti, cosi da poter avere già da subito una prima senzazione.
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: var(--boolflix-primary);
    padding: 2rem 0;
    min-height: 80vh;

    & .card {
        position: relative;
        height: 100%;
        border: 2px solid white;
        border-radius: 1rem;
    }



    & .card:hover .info {
        z-index: 1000;
        scale: 1.07;
        transition: all 1s;
    }

    & .info {
        padding: 0.5rem;
        height: 100%;
        width: 100%;
        background-color: rgb(0, 0, 0);
        position: absolute;
        top: 0;
        left: 0;
        color: white;
        overflow: scroll;
        border: 2px solid white;
        border-radius: 1rem;


        & .title,
        & .original_title,
        & .language,
        & .vote,
        & .overview {
            margin: 0.5rem 0;
            font-size: 16px;

            & span {
                font-weight: bolder;
                margin-right: 0.3rem;
            }

        }

        & .language {
            width: 100%;
            display: flex;
            align-items: center;

            & img {
                max-width: 60px;
            }
        }
    }
}

.card>img {
    height: 100%;
    z-index: 999;
    position: relative;
    border-radius: 1rem;
}

.home_page {
    height: 30vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>