<template>
    <v-container class="bg-indigo-darken-4 rounded-pill">
      <v-responsive>
        <v-toolbar class="bg-indigo-darken-4">
            <v-toolbar-title>
              MOVIE APP
            </v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
                <v-btn @click="$router.push('/')">
                  Фильмы
                </v-btn>
                <v-btn @click="$router.push('/my')">
                  Моё
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
      </v-responsive>
    </v-container>
</template> 