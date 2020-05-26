<template>
  <v-container>
    <add-movie />

    <v-row>
      <v-col cols="auto" v-for="movie in movies" :key="movie.id">
        <movie-preview :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'

import MoviePreview from '@/components/MoviePreview'
import AddMovie from '@/components/movie/AddMovie'

export default {
  data () {
    return {
      movies: []
    }
  },
  components: { MoviePreview, AddMovie },
  async mounted () {
    this.movies = (await MovieService.fetch()).data
  }
}
</script>
