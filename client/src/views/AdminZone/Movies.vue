<template>
  <v-container>
    <router-view v-if="childrenRoute" />

    <template v-else>
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
    </template>
    
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
  computed: {
    childrenRoute () {
      return this.$route.matched.length > 2
    }
  }, 
  async mounted () {
    this.movies = (await MovieService.fetch()).data
  }
}
</script>

<style>

</style>
