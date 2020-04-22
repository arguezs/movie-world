<template>
  <v-container>
    <v-row>
      <v-col cols="auto">{{ session.time }}</v-col>
      <v-col>{{ movie.title }}</v-col>
    </v-row>
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
  props: ['session'],
  async mounted () {
    this.movie = (await MovieService.fetch(this.session.movieId)).data
  }
}
</script>

<style>

</style>