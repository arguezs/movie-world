<template>
  <v-container>
    <v-card
      outlined>
      <v-card-title>{{movie.title}}</v-card-title>
      <v-card-subtitle>
        {{movie.duration}} min -
        {{movie.director}} -
        {{movie.genre}}
      </v-card-subtitle>
      <div class="d-flex">
        <v-card-text>{{movie.sinopsis}}</v-card-text>
        <v-img
          class="ma-2"
          max-height="300px"
          contain
          :src="movie.poster"></v-img>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'

export default {
  data () {
    return {
      movie: {}
    }
  },
  async mounted () {
    const movieId = this.$route.params.movieId
    this.movie = (await MovieService.fetch(movieId)).data
  }
}
</script>

<style>

</style>