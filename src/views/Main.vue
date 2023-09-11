<template>
  <NavBar></NavBar>
  <v-container>
    <v-text-field 
      label="Поиск" 
      prepend-inner-icon="mdi-magnify"
      v-model="movieStore.searchQuery"
      variant="outlined"
      density="compact"
      bg-color="indigo-darken-4" 
    ></v-text-field>
    <v-select 
      label="Сортировать"
      density="compact"  
      :items="movieStore.sortOptions"
      v-model="movieStore.selectedSort"
      variant="outlined"
      class="select"
      bg-color="indigo-darken-4" 
    ></v-select>
  </v-container>
  <MovieList :movies="movieStore.paginationedMovies" class="pt-0"></MovieList>
  <v-container>
    <v-pagination
      v-model="movieStore.page"
      rounded="circle"
      :length="movieStore.pageCount"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import NavBar from '@/components/Navbar.vue'
import { useMovieStore } from '../store/MovieStore'

const movieStore =  useMovieStore()
</script>

<style scoped>
.select {
  max-width: 200px;
}
</style>