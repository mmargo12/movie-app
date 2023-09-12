import { defineStore } from "pinia";
import { computed, ref } from "vue";
import kino1 from '@/movies/kinopoisk-1.json'
import { useMyMoviesStore } from "./MyMovies";

export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref(kino1.docs)
    const selectedSort = ref('')
    const searchQuery = ref('')
    const page = ref(1)
    const limit = ref(15)
    const sortOptions = ref([
        { value: 'year', title: 'По году'},
        { value: 'rating', title: 'По рейтингу'},
        { value: 'movieLength', title: 'По длине'}
    ])

    const visibleMovies = computed(() => {
        return movies.value.slice((page.value - 1) * limit.value, page.value * limit.value)
    })

    const sortedMovies = computed(() => {
        const sortingBy = selectedSort.value
        if (sortingBy === 'rating') {
            return movies.value.slice(0).sort((movie1, movie2) => {
                return (movie2[sortingBy].imdb - movie1[sortingBy].imdb)
            })
        }
        return movies.value.slice(0).sort((movie1, movie2) => {
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
        return filteredMovies.value.slice((page.value - 1) * limit.value, page.value * limit.value)
    })

    const totalPages = computed(() => {
        return filteredMovies.value.length
    })

    const pageCount = computed(() => {
        return Math.ceil(totalPages.value / limit.value)
    })

    const myMoviesStore = useMovieStore()

    // const myMovies = computed(() => {
    //     console.log(myMoviesStore.myBookmarks);
    //     const myArr = ref([])
    //     movies.value.forEach(el => {
    //         // if (myMoviesStore.myBookmarks.includes(el.id)) {
    //         // myArr.push(el)
    //         // }
    //         myArr.push(el)
    //     });
    //     return myArr
    // })

    return {
        movies, searchQuery, sortOptions, selectedSort, page, pageCount, limit, visibleMovies, paginationedMovies
    }
})