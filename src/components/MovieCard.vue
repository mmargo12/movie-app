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
                    <v-card-title class="dialog-title">{{ movie.name }}</v-card-title>
                    <div class="d-flex flex-row">
                        <v-card-subtitle class="pr-0">{{ movie.alternativeName ?? movie.name }}, </v-card-subtitle>
                        <v-card-subtitle class="pl-2">{{ movie.year }}</v-card-subtitle>
                        <v-card-subtitle class="px-1 bg-yellow-lighten-1">{{ movie.rating.imdb }}</v-card-subtitle>
                    </div>
                    <div class="d-flex flex-row">
                        <v-card-subtitle class="pr-0">{{ movieType }}</v-card-subtitle>
                        <v-card-subtitle class="pl-2">{{ movie.movieLength }} мин.</v-card-subtitle>
                    </div>
                    <v-card-text>{{ movie.description }}</v-card-text>
                    <!-- <v-icon icon="mdi-bookmark"></v-icon>
                    <v-icon icon="mdi-bookmark-outline"></v-icon> -->
                    <!-- <v-card-actions @click="$router.push(`/movie/${movie.id}`)">Подробнее</v-card-actions> -->
                </div>
        </v-card>
    </v-dialog>
</template>
  
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    movie: Object
})

const dialog = ref(false)

const movieType = computed(() => {
    if (props.movie.type === 'movie') {
        return 'кино'
    }
    else if (props.movie.type === 'cartoon') {
        return 'мультфильм'
    }
    else {
        return 'сериал'
    }
})
//@click="$router.push(`/movie/${movie.id}`)"
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