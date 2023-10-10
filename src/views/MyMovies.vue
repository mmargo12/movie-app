<template>
    <NavBar/>
    <v-container>
        <v-text-field 
        label="Поиск" 
        prepend-inner-icon="mdi-magnify"
        v-model="searchQuery"
        variant="outlined"
        density="compact"
        bg-color="indigo-darken-4"
        />
        <v-select 
        label="Сортировать"
        density="compact"  
        :items="sortOptions"
        v-model="selectedSort"
        variant="outlined"
        style="max-width: 200px;"
        bg-color="indigo-darken-4" 
        />
    </v-container>
    <v-container class="pt-0">
        <v-expansion-panels multiple v-model="panel">
            <v-expansion-panel
                bg-color="indigo-darken-2" 
                value="bookmarks">
                <v-expansion-panel-title 
                    expand-icon="mdi-chevron-double-down" 
                    collapse-icon="mdi-chevron-double-up"
                    class="panels-title"
                >
                    Мои закладки
                </v-expansion-panel-title>
                <v-expansion-panel-text class="pt-3 panel-text">
                    <MovieList :movies="filteredBookmarkedMovies"/>
                </v-expansion-panel-text>
                
            </v-expansion-panel>
            <v-expansion-panel 
                bg-color="indigo-darken-2" 
                value="ratings"
            >
                <v-expansion-panel-title 
                    expand-icon="mdi-chevron-double-down" 
                    collapse-icon="mdi-chevron-double-up"
                    class="panels-title"
                >
                    Мои оценки
                </v-expansion-panel-title>
                <v-expansion-panel-text class="pt-3 panel-text">
                    <MovieList :movies="filteredRatedMovies"/>
                </v-expansion-panel-text>
                
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import NavBar from '@/components/Navbar.vue'
import { useMovieStore } from '@/store/MovieStore';
import {useMyMoviesStore } from '@/store/MyMovies.js'
import { ref, computed } from 'vue'
import { sortOptions } from '@/constances'

const panel = ref(['bookmarks', 'ratings'])
const selectedSort = ref('')
const searchQuery = ref('')

const myMovies = useMyMoviesStore()
const movieStore = useMovieStore()

const listBookmarks = computed(() => {
    const movies = ref([])
    movieStore.movies.forEach(movie => {
        if (myMovies.myBookmarks.includes(movie.id)) {
            movies.value.push(movie)
        }
    })
    return movies.value  
})

const listRatings = computed(() => {
    const movies = ref([])
    movieStore.movies.forEach(movie => {
        myMovies.myRatings.forEach(ratedMovie => {
            if (ratedMovie.id === movie.id ) {
                movies.value.push(movie)
            }
        })
    })
    return movies.value  
})

const sortedBookmarkedMovies = computed(() => {
    const sortingBy = selectedSort.value
    if (sortingBy === 'rating') {
        return listBookmarks.value.slice(0).sort((movie1, movie2) => {
            return ((movie2[sortingBy].imdb || movie2[sortingBy].kp) - (movie1[sortingBy].imdb || movie1[sortingBy].kp))
        })
    }
    return listBookmarks.value.slice(0).sort((movie1, movie2) => {
        return movie2[sortingBy] - movie1[sortingBy]
    })
})

const sortedRatedMovies = computed(() => {
    const sortingBy = selectedSort.value
    if (sortingBy === 'rating') {
        return listRatings.value.slice(0).sort((movie1, movie2) => {
            return ((movie2[sortingBy].imdb || movie2[sortingBy].kp) - (movie1[sortingBy].imdb || movie1[sortingBy].kp))
        })
    }
    return listRatings.value.slice(0).sort((movie1, movie2) => {
        return movie2[sortingBy] - movie1[sortingBy]
    })
})

const filteredBookmarkedMovies = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return sortedBookmarkedMovies.value.filter(movie => {
        return movie.name.toLowerCase().includes(query)
    })
})

const filteredRatedMovies = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return sortedRatedMovies.value.filter(movie => {
        return movie.name.toLowerCase().includes(query)
    })
})
</script>

<style scoped lang="scss">
.v-expansion-panel-text__wrapper {
    padding: 0 !important; 
} 

.panels-title {
    font-size: 20px;
}
</style>