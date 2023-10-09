<template>
    <v-container class="d-flex flex-wrap flex-row pa-0 justify-center">
      <v-responsive width="200" >
        <div class="d-flex flex-row flex-wrap movie-list"> 
          <MovieCard v-for="movie in movies" :movie="movie" :key="movie.id"/>
        </div>
      </v-responsive>
    </v-container>
</template>
  
<script setup>
import MovieCard from './MovieCard.vue'

const props = defineProps({
  movies: Array
})
</script>

<style scoped>
.movie-list {
  gap: 10px;
}
</style>