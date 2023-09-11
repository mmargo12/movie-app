<template>
            <v-card 
            variant="outlined"
            width="225" 
            height="425"
            v-bind="props"
            class="bg-indigo-darken-4"
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
</template>
  
<script setup>
const props = defineProps({
    movie: Object
})
</script>  

<style scoped>
.title {
    word-break: break-word;
    max-width: 225px;
}
</style>