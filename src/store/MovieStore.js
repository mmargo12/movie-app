import { defineStore } from "pinia";
import { ref } from "vue";
import kino1 from '@/movies/kinopoisk-1.json'

export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref(kino1.docs)
    
    return {
        movies
    }
})