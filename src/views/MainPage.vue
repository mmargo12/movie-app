<template>
  <NavBar />
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
      bg-color="indigo-darken-4" 
      style="max-width: 200px;" 
    />
  </v-container>
  <MovieList :movies="paginationedMovies" class="pa-4 pt-0" />
  <v-container>
    <v-pagination v-model="page" rounded="circle" :length="pageCount" />
  </v-container>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import NavBar from '@/components/Navbar.vue'
import { useMovieStore } from '@/store/MovieStore'
import { computed, ref } from "vue";
import { sortOptions, limit } from '@/constances'

const movieStore = useMovieStore()

const selectedSort = ref('')
const searchQuery = ref('')
const page = ref(1)

const sortedMovies = computed(() => {
  const sortingBy = selectedSort.value
  if (sortingBy === 'rating') {
    return movieStore.movies.slice(0).sort((movie1, movie2) => {
      return ((movie2[sortingBy].imdb || movie2[sortingBy].kp) - (movie1[sortingBy].imdb || movie1[sortingBy].kp))
    })
  }
  return movieStore.movies.slice(0).sort((movie1, movie2) => {
    return movie2[sortingBy] - movie1[sortingBy]
  })
})

const filteredMovies = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return sortedMovies.value.filter(movie => {
    return movie.name.toLowerCase().includes(query)
  })
})

const paginationedMovies = computed(() => {
  return filteredMovies.value.slice((page.value - 1) * limit, page.value * limit)
})

const totalPages = computed(() => {
  return filteredMovies.value.length
})

const pageCount = computed(() => {
  return Math.ceil(totalPages.value / limit)
})
</script>