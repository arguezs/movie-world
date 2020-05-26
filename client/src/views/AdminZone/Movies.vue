<template>
  <v-container>
    <add-movie @success="onSuccess" @fail="onFail" />

    <v-alert
      v-if="result"
      class="mx-12 my-6" outlined dense
      :type="result.success?'success':'error'">
      <span v-if="result.success">Película creada</span>
      <span v-else>Error al crear la película</span>
    </v-alert>

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
      movies: [],
      result: null
    }
  },
  components: { MoviePreview, AddMovie },
  mounted () {
    this.loadMovies()
  },
  methods: {
    onSuccess () {
      this.result = {success: true}
      this.loadMovies()
    },
    onFail () { this.result = {fail: true} },
    loadMovies () {
      const vue = this

      MovieService.fetch()
        .then(response => { vue.movies = response.data })
    }
  }
}
</script>
