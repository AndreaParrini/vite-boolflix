<script>
import axios from 'axios';

export default {
    name: 'SliderItem',
    data() {
        return {
            activeImage: 0,
            trendMovie: [],
        }
    },
    methods: {
        getTrendMovie() {
            axios
                .get('https://api.themoviedb.org/3/trending/all/week?api_key=1624b90122a6e598e03c4e5d2ad8bd21&language=it-IT')
                .then((response) => {
                    let loader = 0;
                    for (let i = 0; i < response.data.results.length; i++) {
                        const movie = response.data.results[i];
                        if (loader < 6) {
                            this.trendMovie.push(movie);
                            loader++;
                        }
                    }
                });
        }
    },
    created() {
        this.getTrendMovie();
        setInterval(() => {
            this.activeImage++;
            if (this.activeImage > this.trendMovie.length - 1) {
                this.activeImage = 0;
            }

        }, "3000")
    }
}
</script>

<template>
    <div class="popular">
        <h1>I trend di questa settimana</h1>
        <div class="row">
            <div class=" col-2" v-for="(movie, index) in trendMovie">
                <div class="thumbs" :class="index === activeImage ? 'active' : ''" @click="activeImage = index">
                    <img width="200" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">
                    <div class="titolo">{{ movie.title ? movie.title : movie.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popular {
    text-align: center;
    padding-top: 2rem;

    & h1 {
        text-transform: uppercase;
        margin: 2rem 0;
    }

    & .slides {
        width: 100%;

        &>img {
            width: 300px;
            height: 500px;
        }
    }

    & .thumbs {
        width: 100%;

        & img {
            width: 100%;
        }

        &.active {
            &>img {
                filter: drop-shadow(0 1rem 0.6rem black);
                border: 3px solid white;
                scale: 1.1;
            }

            & .titolo {
                display: block;
            }
        }
    }

    & .titolo {
        display: none;
        margin-top: 2rem;
        color: white;
        text-transform: uppercase;
    }
}
</style>