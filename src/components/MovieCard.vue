<template>
        <v-hover v-slot="{isHovering, props}">
            <v-card 
            color="black" 
            width="250" 
            height="400"
            v-bind="props"
            >
                <v-img 
                    :src="movie.poster.url" 
                    cover
                    :aspect-ratio="9/16"
                >
                    <v-expand-transition>
                        <v-card-item 
                            class="pa-0 bg-black d-flex flex-column 
                            justify-start align-start transition-fast-in-fast-out 
                            -left flex-start card" 
                            v-if="isHovering"
                            style="height: 100%"
                        >
                            <v-card-title class="text-white title text-wrap flex-start align-self-start" min-height="100">{{ movie.name }}</v-card-title>
                            <v-card-subtitle class="text- bg-yellow d-inline pa-1 align-self-start">{{ movie.rating.imdb }}</v-card-subtitle>
                            <v-card-subtitle>{{ movie.year }}</v-card-subtitle>
                        </v-card-item>
                    </v-expand-transition>
            
                </v-img>
            </v-card>
        </v-hover>
</template>
  
<script setup>
import { ref } from 'vue';
const props = defineProps({
    movie: Object
})
const moreInfo = ref(false)

    
</script>  

<style scoped>
.card {
    text-align: left;

}
</style>