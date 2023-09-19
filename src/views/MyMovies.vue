<template>
    <NavBar></NavBar>
    <v-container>
        <h2>Мои закладки</h2>
        <MovieList :movies="myMovies.listBookmarks" class="pt-0"></MovieList>
        <h2>Moи оценки</h2>
        <MovieList :movies="myMovies.listRatings" class="pt-0"></MovieList>
    </v-container>
    
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import NavBar from '@/components/Navbar.vue'
import {useMyMoviesStore } from '@/store/MyMovies.js'

const myMovies = useMyMoviesStore()
</script>