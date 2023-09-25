import { defineStore } from "pinia";
import { ref, watch, computed, onMounted } from "vue";
import { useMovieStore } from "./MovieStore";

export const useMyMoviesStore = defineStore('myMovieStore', () => {
    const myBookmarks = ref([])
    const myRatings = ref([])
    const movieStore = useMovieStore()
    const selectedSort = ref('')
    const searchQuery = ref('')
    const sortOptions = ref([
        { value: 'year', title: 'По году'},
        { value: 'rating', title: 'По рейтингу'},
        { value: 'movieLength', title: 'По длине'}
    ])

    const addToUsersMovies = (id) => {
        myBookmarks.value.push(id)
    }

    const removeFromUsersMovies = (id) => {
        myBookmarks.value = myBookmarks.value.filter(t => t !== id)
    }

    const listBookmarks = computed(() => {
        const myMovies = ref([])
        movieStore.movies.forEach(movie => {
            if (myBookmarks.value.includes(movie.id)) {
                myMovies.value.push(movie)
            }
        });
        return myMovies.value  
    })

    const listRatings = computed(() => {
        const myMovies = ref([])
        movieStore.movies.forEach(movie => {
            myRatings.value.forEach(ratedMovie => {
                if (ratedMovie.id === movie.id ) {
                    myMovies.value.push(movie)
                }
            })
        });
        return myMovies.value  
    })

    const updateRating = (rating, id) => {
        if (myRatings.value.length === 0) {
            myRatings.value.push({
                id: id,
                usersRating: rating
            })
        }
        else {
            const indexOfMovie = myRatings.value.findIndex(el => el.id === id)
            if (indexOfMovie > -1) {
                myRatings.value[indexOfMovie].usersRating = rating
            }
            else {
                myRatings.value.push({
                    id: id,
                    usersRating: rating
                })
            }
        }
    }

    const sortedBookmarkedMovies = computed(() => {
        const sortingBy = selectedSort.value
        if (sortingBy === 'rating') {
            return listBookmarks.value.slice(0).sort((movie1, movie2) => {
                return (movie2[sortingBy].imdb - movie1[sortingBy].imdb)
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
                return (movie2[sortingBy].imdb - movie1[sortingBy].imdb)
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

    watch(myRatings, newVal => {
        localStorage.setItem('myRatings', JSON.stringify(newVal))
    }, {deep: true})

    watch(myBookmarks, newVal => {
        localStorage.setItem('myBookmarks', JSON.stringify(newVal))
    }, {deep: true})
      
    onMounted(() => {
        myBookmarks.value = JSON.parse(localStorage.getItem('myBookmarks')) || [] 
        myRatings.value = JSON.parse(localStorage.getItem('myRatings')) || [] 
        movieStore.movies.forEach(movie => {
            myRatings.value.forEach(ratedMovie => {
                if (ratedMovie.id === movie.id ) {
                    movie.usersRating = ratedMovie.usersRating
                }
            })
        });
    })

    return {
        myBookmarks, myRatings, addToUsersMovies, removeFromUsersMovies, listRatings, updateRating, filteredBookmarkedMovies,filteredRatedMovies, sortOptions, searchQuery, selectedSort
    }
})