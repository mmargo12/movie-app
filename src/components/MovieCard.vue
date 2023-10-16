<template> 
    <v-card 
        variant="outlined"
        width="225" 
        height="430"
        v-bind="props"
        class="bg-indigo-darken-4"
        @click.stop="isDialogShown = true"
    >
        <v-img 
            :src="movie.poster.url" 
            height="335"
            :aspect-ratio="9/16"
        />
        <div class="d-flex flex-column align-center">
            <v-card-title class="title pt-0 pb-0">
                {{ movie.name }}
            </v-card-title>
            <v-card-subtitle>
                {{ movie.year }}
            </v-card-subtitle>
            <v-card-subtitle class="pa-1 bg-yellow-lighten-1">
                {{ movie.rating.imdb || movie.rating.kp.toFixed(1)}}
            </v-card-subtitle>
        </div>
    </v-card>
    <v-dialog
        v-model="isDialogShown"
        width="auto"
        scrollable
    >
        <v-responsive>
            <v-card
                class="d-flex flex-column bg-indigo-darken-1 rounded-lg dialog"
                width="1000px"
                max-height="600px"
            >
                <div 
                    class="d-flex flex-row mb-4" 
                >
                    <v-img 
                        :src="movie.poster.url" 
                        :aspect-ratio="9/16"
                        width="368px"
                        height="550px"
                    />
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-space-between">
                            <v-card-title class="dialog-title">
                                {{ movie.name }}
                            </v-card-title>
                            <v-icon 
                                class="ma-2" 
                                v-if="!myMoviesStore.myBookmarks.includes(movie.id)" 
                                icon="mdi-bookmark-outline" 
                                size="x-large"
                                @click="myMoviesStore.addToUsersMovies(movie.id)"
                            />
                            <v-icon 
                                class="ma-2"
                                v-else 
                                icon="mdi-bookmark"
                                size="x-large"
                                @click="myMoviesStore.removeFromUsersMovies(movie.id)"
                            />
                        </div>
                        <div class="d-flex flex-row">
                            <v-card-subtitle class="pr-0">
                                {{ movie.alternativeName ?? movie.name }}, 
                            </v-card-subtitle>
                            <v-card-subtitle class="pl-2">
                                {{ movie.year }}
                            </v-card-subtitle>
                            <v-card-subtitle class="px-1 bg-yellow-lighten-1">
                                {{ movie.rating.imdb || movie.rating.kp.toFixed(1)}}
                            </v-card-subtitle>
                        </div>
                        <div class="d-flex flex-row">
                            <v-card-subtitle class="pr-0">
                                {{ movieType }}
                            </v-card-subtitle>
                            <v-card-subtitle class="pl-2">
                                {{ movie.movieLength }} мин.
                            </v-card-subtitle>
                        </div>
                        <div class="d-flex flex-row align-center">
                            <v-card-subtitle class="pr-1">
                                Ваша оценка:
                            </v-card-subtitle>
                            <v-rating
                                v-model="movie.usersRating"
                                hover
                                size="small"
                                density="comfortable"
                                @click="myMoviesStore.updateRating(movie.usersRating, movie.id)"
                            />
                        </div>
                        <v-card-text>
                            {{ movie.description }}
                        </v-card-text>
                    </div>
                </div>
                <div>
                    <h2 class="pl-3">В том же году вышли:</h2>
                    <MovieList 
                        :movies="movieStore.movies.filter(el => el.year === movie.year && el.id !== movie.id)"
                        class="pa-3"
                    />
                </div>  
            </v-card>
        </v-responsive>
    </v-dialog>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useMyMoviesStore } from '@/store/MyMovies'
import { useMovieStore } from '@/store/MovieStore';
import MovieList from './MovieList.vue';


const props = defineProps({
    movie: Object
})

const isDialogShown = ref(false)

const movieType = computed(() => {
    const rusType = ref('')
    switch (props.movie.type) {
    case 'movie' :
        rusType.value = 'кино'
        break
    case 'cartoon' :
        rusType.value = 'мультфильм'
        break
    case 'tv-series' :
        rusType.value = 'сериал'
        break
    case 'animated-series' :
        rusType.value = 'мультсериал'
        break
    case 'anime': 
        rusType.value = 'аниме'
        break
    }
    return rusType.value
})

const movieStore = useMovieStore()
const myMoviesStore = useMyMoviesStore()
</script>  

<style scoped lang="scss">
.title {
    word-break: break-word;
    max-width: 225px;
}

.dialog {
    overflow-y: auto;

    &-title {
        font-size: 50px;
        font-weight: 700;
        text-wrap: wrap;
        line-height: 3rem !important;
        flex: initial;
    }

    &::-webkit-scrollbar {
        background-color: #3949AB;
        border-radius: 10px;
    }
}
</style>