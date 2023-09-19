<template> 
    <v-card 
        variant="outlined"
        width="225" 
        height="430"
        v-bind="props"
        class="bg-indigo-darken-4"
        @click.stop="dialog = true"
    >
        <v-img 
            :src="movie.poster.url" 
            height="335"
            :aspect-ratio="9/16"
        >
        </v-img>
        <div class="d-flex flex-column align-center">
            <v-card-title class="title pt-0 pb-0">{{ movie.name }}</v-card-title>
            <v-card-subtitle>{{ movie.year }}</v-card-subtitle>
            <v-card-subtitle class="pa-1 bg-yellow-lighten-1">{{ movie.rating.imdb }}</v-card-subtitle>
        </div>
    </v-card>
    <v-dialog
        v-model="dialog"
        width="auto"
    >
    <v-responsive>
        <v-card
            class="d-flex flex-row bg-indigo-darken-1 rounded-lg"
            height="550px"
            width="1000px"
        >
            <v-img 
                :src="movie.poster.url" 
                :aspect-ratio="9/16"
                width="368px"
            >
                </v-img>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row justify-space-between">
                        <v-card-title class="dialog-title">{{ movie.name }}</v-card-title>
                        <v-icon 
                            class="ma-2" 
                            v-if="!myMoviesStore.myBookmarks.includes(movie.id)" 
                            icon="mdi-bookmark-outline" 
                            size="x-large"
                            @click="myMoviesStore.addToUsersMovies(movie.id)"
                        ></v-icon> 
                        <v-icon 
                            class="ma-2"
                            v-else 
                            icon="mdi-bookmark"
                            size="x-large"
                            @click="myMoviesStore.removeFromUsersMovies(movie.id)"
                        ></v-icon>
                    </div>
                    
                    <div class="d-flex flex-row">
                        <v-card-subtitle class="pr-0">{{ movie.alternativeName ?? movie.name }}, </v-card-subtitle>
                        <v-card-subtitle class="pl-2">{{ movie.year }}</v-card-subtitle>
                        <v-card-subtitle class="px-1 bg-yellow-lighten-1">{{ movie.rating.imdb }}</v-card-subtitle>
                    </div>
                    <div class="d-flex flex-row">
                        <v-card-subtitle class="pr-0">{{ movieType }}</v-card-subtitle>
                        <v-card-subtitle class="pl-2">{{ movie.movieLength }} мин.</v-card-subtitle>
                    </div>
                    <div class="d-flex flex-row align-center">
                        <v-card-subtitle class="pr-1">Ваша оценка:</v-card-subtitle>
                        <v-rating
                            v-model="rating"
                            hover
                            size="small"
                            density="comfortable"
                            @input="updateRating">
                            <template v-slot:item="props">
                                <v-icon 
                                :color="props.isFilled ? 'white' : 'indigo-lighten-1'"
                                @click="myMoviesStore.updateRating(props, movie.id)">
                                    mdi-star
                                </v-icon>
                            </template>
                        </v-rating>
                    </div>
                    <v-card-text>{{ movie.description }}</v-card-text>
                </div>
        </v-card>
    </v-responsive>
    </v-dialog>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useMyMoviesStore } from '@/store/MyMovies'

const props = defineProps({
    movie: Object
})

const dialog = ref(false)
const rating = ref(0)

const movieType = computed(() => {
    if (props.movie.type === 'movie') {
        return 'кино'
    }
    else if (props.movie.type === 'cartoon') {
        return 'мультфильм'
    }
    else if (props.movie.type === 'tv-series') {
        return 'сериал'
    }
    else if (props.movie.type === 'animated-series') {
        return 'мультсериал'
    }
    else {
        return 'аниме'
    }
})

const updateRating = (rating, id) => {
        console.log(rating.value, id);
    }

const myMoviesStore = useMyMoviesStore()
</script>  

<style scoped>
.title {
    word-break: break-word;
    max-width: 225px;
}

.dialog-title {
    font-size: 50px;
    font-weight: 700;
    text-wrap: wrap;
    line-height: 3rem !important;
}
</style>