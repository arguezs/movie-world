<template>
  <v-container>
    <add-movie @success="onSuccess" @fail="onFail" />

    <dismissible-alert :alert="result">
      <span slot="success">Película creada</span>
      <span slot="fail">Error al crear la película</span>
    </dismissible-alert>

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
import DismissibleAlert from '@/components/DismissibleAlert'

export default {
  data () {
    return {
      movies: [],
      result: null
    }
  },
  components: { MoviePreview, AddMovie, DismissibleAlert },
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
