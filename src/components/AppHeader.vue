<script>
export default {
    name: 'AppHeader',
}
</script>

<template>
    <header>
        <div class="container">
            <h2 class="title"> Boolflix </h2>
            <input type="text" name="searchMovie" id="searchMovie" v-model="searchText"
                placeholder="Insert here name of movie" @keyup.enter="searchAll">
        </div>
    </header>
</template>



<style scoped>
header {
    background-color: var(--boolflix-dark);

    & .container {
        display: flex;
        justify-content: space-between;
        padding: 2rem 0;
        align-items: center;

        & .title {
            color: var(--boolflix-red);
            text-transform: uppercase;
        }

        & input {
            width: 180px;
            padding: 0.5rem;
        }

    }

}
</style>