<template>
  <v-container>
    <v-row v-if="movies.length">
      <v-col
        cols="auto"
        v-for="movie in movies"
        :key="movie.id">
        <movie-preview :movie="movie" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-banner>
          <v-icon slot="icon" color="warning">priority_high</v-icon>
          <slot name="empty-message"></slot>
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MoviePreview from './MoviePreview'

export default {
  props: { movies: Array },
  components: { MoviePreview }
}
</script>

<style>

</style>