<template>
    <v-container>
    <v-text-field 
      label="Поиск" 
      prepend-inner-icon="mdi-magnify"
      :value="searchQuery"
      @input="searchQuery = $event.target.value"
      variant="outlined"
      density="compact"
      bg-color="indigo-darken-4" 
    ></v-text-field>
    <v-select 
      label="Сортировать"
      density="compact"  
      :items="sortOptions"
      :value="selectedSort"
      @change="selectedSort = $event.target.value"
      variant="outlined"
      class="select"
      bg-color="indigo-darken-4" 
    ></v-select>
  </v-container>
</template>

<script setup>
const props = defineProps({
    sortOptions: Function,
    searchQuery: Function,
    selectedSort: String
})
</script>