<template>
  <v-container>
    <movie-data :movie="movie" />

    <session-showcase :sessions="sessions" />
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'
import SessionService from '@/services/SessionService'

import MovieData from '@/components/movie/MovieData'
import SessionShowcase from '@/components/movie/SessionShowcase'

export default {
  title () {
    return this.movie.title
  },
  data () {
    return {
      movie: {},
      sessions: []
    }
  },
  async mounted () {
    const movieId = this.$route.params.movieId
    this.movie = (await MovieService.fetch(movieId)).data
    this.sessions = (await SessionService.fetchAll(movieId)).data
  },
  components: { MovieData, SessionShowcase }
}
</script>