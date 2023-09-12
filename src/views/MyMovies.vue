<template>
    <NavBar></NavBar>
    <MovieList :movies="movieStore.paginationedMovies" class="pt-0"></MovieList>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import NavBar from '@/components/Navbar.vue'
import { useMovieStore } from '@/store/MovieStore'

const movieStore =  useMovieStore()
</script>