<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <v-toolbar>
            <v-toolbar-title @click="$router.push('/')">Movie app</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn>Поиск</v-btn>
                <v-btn>Фильмы</v-btn>
                <v-btn>Моё</v-btn>
            </v-toolbar-items>
        </v-toolbar>
      </v-responsive>
    </v-container>
</template>
  
<script setup>
    //@click="$router.push('/posts')"
    //добавить ссылки на всё потом
</script>
  