<template>
  <v-container
    class="elevation-2 mt-6 d-flex flex-column">
    <v-toolbar
      color="primary"
      dark>
      <v-toolbar-title>Añadir Película</v-toolbar-title>
    </v-toolbar>

    <v-form>
      <v-row>
        <v-col>
          <v-text-field
            v-model="movie.title"
            counter
            label="Título"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="movie.duration"
            type="number"
            label="Duración"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.rating"
            label="Rating"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.genre"
            label="Género"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="movie.trailer"
            label="Trailer"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.poster"
            label="Poster"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.director"
            label="Director"></v-text-field>
        </v-col>
      </v-row>
      <v-textarea
        v-model="movie.sinopsis"
        label="Sinopsis"></v-textarea>
      <v-textarea
        v-model="movie.cast"
        label="Reparto"></v-textarea>
    </v-form>
    <span
      v-if="error"
      class="red--text">{{error}}</span>
    <v-btn
      color="primary"
      dark
      class="align-self-center"
      @click="add">Añadir</v-btn>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'

export default {
    data () {
        return {
            movie: {
                title: '',
                duration: '',
                rating: '',
                trailer: '',
                poster: '',
                director: '',
                sinopsis: '',
                cast: ''
            },
            error: null
        }
    },
    methods: {
      async add () {
        this.error = null

        try {
          await MovieService.post(this.movie)
          this.$router.push({
            name: 'Movies'
          })
        } catch (error) {
          this.error = "Error al añadir la película"
        }
      }
    }
}
</script>

<style>

</style>