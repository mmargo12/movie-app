<template>
  <h1>Страница с фильмами</h1>
  <v-container>
        <h2>Поиск</h2>
        <v-text-field 
          placeholder="Поиск" 
          prepend-inner-icon="mdi-magnify"
          v-model="movieStore.searchQuery"
        >
      </v-text-field>
  </v-container>
  <MovieList :movies="movieStore.movies"></MovieList>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import { useMovieStore } from '../store/MovieStore'

const movieStore =  useMovieStore()
</script>
