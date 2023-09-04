<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <v-card>
            <v-card-item>
                <v-card-title>Title</v-card-title>
                <v-card-subtitle>Subtitle</v-card-subtitle>
            </v-card-item>
            <v-card-text>Text</v-card-text>
            <v-card-actions>
                <v-btn>See more</v-btn>
            </v-card-actions>
        </v-card>
      </v-responsive>
    </v-container>
</template>
  
<script setup>
    const props = defineProps({
        title: String,
        rating: Number,
        image: String,
        year: Number
    })
</script>
  