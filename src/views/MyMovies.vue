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
    <v-container class="pt-0">
        <div class="d-flex flex-row">
            <h2 class="mr-2">Мои закладки</h2>
            <v-btn 
                variant="text" 
                class="pa-0" 
                style="min-width: 40px;"
                @click="showBookmarks = !showBookmarks"
            >
                <v-icon 
                    icon="mdi-chevron-double-down" 
                    size="x-large"
                    v-if="showBookmarks"
                >
                </v-icon>
                <v-icon 
                    icon="mdi-chevron-double-up" 
                    size="x-large"
                    v-else
                >
                </v-icon>
            </v-btn>
        </div>
        <MovieList :movies="myMovies.filteredBookmarkedMovies" class="pt-0" v-if="showBookmarks"></MovieList>
        <div class="d-flex flex-row">
            <h2>Moи оценки</h2>
            <v-btn 
                variant="text" 
                class="pa-0" 
                style="min-width: 40px;"
                @click="showRated = !showRated"
            >
                <v-icon 
                    icon="mdi-chevron-double-down" 
                    size="x-large"
                    v-if="showRated"
                >
                </v-icon>
                <v-icon 
                    icon="mdi-chevron-double-up" 
                    size="x-large"
                    v-else
                >
                </v-icon>
            </v-btn>
        </div>
        <MovieList :movies="myMovies.filteredRatedMovies" class="pt-0" v-if="showRated"></MovieList>
    </v-container>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import NavBar from '@/components/Navbar.vue'
import {useMyMoviesStore } from '@/store/MyMovies.js'
import { ref } from 'vue';

const showBookmarks = ref(true)
const showRated = ref(true)

const myMovies = useMyMoviesStore()
</script>

<style scoped>
.select {
  max-width: 200px;
}
</style>