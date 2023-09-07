<template>
    <v-container padding="0" class="d-flex flex-wrap flex-row">
      <v-responsive width="200" >
        <div class="d-flex flex-row flex-wrap movie-list"> 
          <MovieCard v-for="movie in movies" :movie="movie" :key="movie.id" padding="0" ></MovieCard>
        </div>
        
      </v-responsive>
    </v-container>
</template>
  
<script setup>
import MovieCard from './MovieCard.vue'
import { useMovieStore } from '../store/MovieStore'

const movieStore =  useMovieStore()
const props = defineProps({
  movies: Array
})
//:title="movie.name" :image="movie.poster.url" :rating="movie.rating.imdb" :year="movie.year"
</script>

<style scoped>
.movie-list {
  gap: 10px;
}
</style>