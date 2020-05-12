<template>
  <v-container>
    <v-btn
      :to="{name: 'AddMovie'}"
      color="primary">
      <v-icon left>add</v-icon>
      Añadir
    </v-btn>
    <v-row>
      <v-col
        cols="auto"
        v-for="movie in movies"
        :key="movie.id" >
        <movie-preview :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MoviePreview from '@/components/MoviePreview'
import MovieService from '@/services/MovieService'

export default {
    data () {
        return {
            movies: []
        }
    },
    components: { MoviePreview },
    async mounted () {
      this.$store.commit('updateUser')
      this.movies = (await MovieService.fetch()).data
    }
}
</script>

<style>

</style>
