<template>
    <v-container padding="0" class="d-flex flex-wrap flex-row">
      <div>
        <h2>Поиск</h2>
        <v-text-field></v-text-field>
      </div>
      <v-responsive v-for="movie in movieStore.movies" width="200">
        <MovieCard :title="movie.name" :image="movie.poster.url" :rating="movie.rating.imdb" :year="movie.year" padding="0"></MovieCard>
      </v-responsive>
    </v-container>
</template>
  
<script setup>
import MovieCard from './MovieCard.vue'
 import { useMovieStore } from '../store/MovieStore'

 const movieStore =  useMovieStore()

movieStore.watchMovies()

console.log(11)
</script>
  