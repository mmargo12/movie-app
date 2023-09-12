import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

export const useMyMoviesStore = defineStore('myMovieStore', () => {
    const myBookmarks = ref([])
    const myRatings = ref([])

    const addToUsersMovies = (id) => {
        myBookmarks.value.push(id)
        console.log(id);
    }

    const removeFromUsersMovies = (id) => {
        myBookmarks.value = myBookmarks.value.filter(t => t !== id)
        
        console.log(myBookmarks.value);
    }


    watch(myBookmarks, newVal => {
        localStorage.setItem('myBookmarks', JSON.stringify(newVal))
    }, {deep: true})
      
    onMounted(() => {
        myBookmarks.value = JSON.parse(localStorage.getItem('myBookmarks')) || [] 
    })

    return {
        myBookmarks, addToUsersMovies, removeFromUsersMovies
    }
})