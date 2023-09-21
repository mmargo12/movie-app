import { defineStore } from "pinia";
import { ref, watch, computed, onMounted } from "vue";
import { useMovieStore } from "./MovieStore";

export const useMyMoviesStore = defineStore('myMovieStore', () => {
    const myBookmarks = ref([])
    const myRatings = ref([])
    const movieStore = useMovieStore()

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
                    console.log(movie.id);
                }
            })
        });
        return myMovies.value  
    })

    const getMovieRating = computed((id) => {
        if (myRatings.value.findIndex(ratedMovie => ratedMovie.id === id) > -1 ) {
                    return myRatings.value[myRatings.value.findIndex(ratedMovie => ratedMovie.id === movie.id)].usersRating
        } 
            else {
                    return 0
        }
    })

    const updateRating = (rating, id) => {
        if (myRatings.value.length === 0) {
            myRatings.value.push({
                id: id,
                usersRating: rating.value
            })
        }
        else {
            const indexOfMovie = myRatings.value.findIndex(el => el.id === id)
            if (indexOfMovie > -1) {
                myRatings.value[indexOfMovie].usersRating = rating.value
            }
            else {
                myRatings.value.push({
                    id: id,
                    usersRating: rating.value
                })
            }
        }
        console.log(myRatings.value);
    }

    watch(myRatings, newVal => {
        localStorage.setItem('myRatings', JSON.stringify(newVal))
    }, {deep: true})

    watch(myBookmarks, newVal => {
        localStorage.setItem('myBookmarks', JSON.stringify(newVal))
    }, {deep: true})
      
    onMounted(() => {
        myBookmarks.value = JSON.parse(localStorage.getItem('myBookmarks')) || [] 
        myRatings.value = JSON.parse(localStorage.getItem('myRatings')) || [] 
    })

    return {
        myBookmarks, myRatings, addToUsersMovies, removeFromUsersMovies, listBookmarks, listRatings, updateRating, getMovieRating
    }
})