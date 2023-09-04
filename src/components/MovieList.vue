<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <MovieCard></MovieCard>
        {{ movieStore.movies }}
      </v-responsive>
    </v-container>
</template>
  
<script setup>
import MovieCard from './MovieCard.vue'
 import { useMovieStore } from '../store/MovieStore'

 const movieStore =  useMovieStore()

//  movieStore.watchMovies

console.log(11)
</script>
  