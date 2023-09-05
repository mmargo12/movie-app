import { defineStore } from "pinia";
import { computed, ref } from "vue";
import kino1 from '@/movies/kinopoisk-1.json'


export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref([])
    const isMovieLoading = ref(false)
    const selectedSort = ref('')
    const searchQuery = ref('')
    const page = ref(1)
    const limit = ref(10)
    const totalPages = ref(0)
    const sortOptions = ref([
        { value: 'year', name: 'По году'},
        { value: 'rating', name: 'По рейтингу'},
        { value: 'length', name: 'По длине'}
    ])
    
    const sortedMovies = computed(() => {
        return [...movies].sort((movie1, movie2) => movie1[selectedSort]?.localCompare(movie2[selectedSort]))
    })
    const sortedAndSearchedPosts = computed(() => {
        return sortedMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    })

    movies.value = kino1.docs

    const watchMovies = () => console.log(movies.value)

    return {
        movies, watchMovies
    }
})