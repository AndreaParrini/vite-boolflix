<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'CardItem',
    props: {
        movie: Object,
        type: String
    },
    data() {
        return {
            allCast: [],
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
        },
        determinateGenre(id) {
            if (this.type === 'movie') {
                for (let i = 0; i < store.allGenresMovie.length; i++) {
                    const element = store.allGenresMovie[i];
                    if (element.id === id) {
                        return element.name;
                    }
                }
            }
            else {
                for (let i = 0; i < store.allGenresSerieTv.length; i++) {
                    const element = store.allGenresSerieTv[i];
                    if (element.id === id) {
                        return element.name;
                    }
                }
            }
        },
        addCast(response) {
            let counter = 0;
            for (let i = 0; i < response.data.cast.length; i++) {
                const element = response.data.cast[i];
                if (counter < 4) {
                    this.allCast.push(element);
                    counter++;

                }
            }
        },
        getAllCast(id) {
            if (this.type === 'movie') {
                axios
                    .get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
                    .then((response) => {
                        this.addCast(response);
                    })
            } else {
                axios
                    .get('https://api.themoviedb.org/3/tv/' + id + '/credits?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
                    .then((response) => {
                        this.addCast(response);
                    })
            }

        }

    },
    mounted() {
        this.getAllCast(this.movie.id);
    }
}
</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl">

        <div class="card">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="" v-if="isNull(movie.poster_path)">
            <div class="info">
                <div class="title">
                    <span>Titolo:</span> {{ movie.title ? movie.title : movie.name }}
                </div>
                <div class="original_title" v-if="movie.original_title != movie.title || movie.original_name != movie.name">
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
                <div class="generi">
                    <span>Generi: </span>
                    <div v-for="genre in movie.genre_ids">{{ determinateGenre(genre) }},</div>
                </div>
                <div class="overview">
                    <span>Overview:</span>
                    <div>{{ movie.overview ? movie.overview : "In this movie there isn't a overview" }}
                    </div>
                </div>
                <div class="cast">
                    <span>Cast:</span>
                    <div v-for="actor in allCast">{{ actor.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
& .card {
    position: relative;
    height: 100%;
    border: 2px solid white;
    border-radius: 1rem;

    &>img {
        height: 100%;
        z-index: 999;
        position: relative;
        border-radius: 1rem;
    }

    &:hover {
        scale: 1.05;
        transition: all 1s;
    }

    &:hover .info {
        z-index: 1000;

    }

    & .info {
        padding: 0.5rem;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.93);
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
        & .overview,
        & .generi,
        & .cast {
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

        & .generi div {
            display: inline-block;
            margin: 0.25rem;
        }

        & .cast div {
            margin: 0.2rem 0;
        }
    }
}
</style>