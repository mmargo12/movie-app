import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";
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
        myBookmarks, myRatings, addToUsersMovies, removeFromUsersMovies, updateRating
    }
})