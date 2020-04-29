<template>
  <v-container>
    <v-row v-if="movies.length">
      <v-col
        v-for="movie in movies"
        :key="movie.id">
        <movie-preview movie="movie" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <slot name="empty-message"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MoviePreview from './MoviePreview'

export default {
  props: {
    movies: []
  },
  components: { MoviePreview }
}
</script>

<style>

</style>