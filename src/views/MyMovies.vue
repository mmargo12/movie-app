<template>
    <NavBar></NavBar>
    <v-container>
        <v-text-field 
        label="Поиск" 
        prepend-inner-icon="mdi-magnify"
        v-model="myMovies.searchQuery"
        variant="outlined"
        density="compact"
        bg-color="indigo-darken-4"
        ></v-text-field>
        <v-select 
        label="Сортировать"
        density="compact"  
        :items="myMovies.sortOptions"
        v-model="myMovies.selectedSort"
        variant="outlined"
        class="select"
        bg-color="indigo-darken-4" 
        ></v-select>
    </v-container>
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
import { useMovieStore } from '@/store/MovieStore'

const movieStore =  useMovieStore()
const myMovies = useMyMoviesStore()
</script>