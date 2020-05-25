<template>
  <v-container class="elevation-2 mt-6 d-flex flex-column">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Añadir Película</v-toolbar-title>
    </v-toolbar>

    <v-form>
      <v-row>
        <v-col>
          <v-text-field
            v-model="movie.title"
            counter
            label="Título" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="movie.duration"
            type="number"
            label="Duración" />
        </v-col>
        <v-col>
          <v-select
            :items="ratings"
            v-model="movie.rating"
            label="Rating" />
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.genre"
            label="Género" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            type="number"
            v-model="movie.year"
            label="Año" />
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.trailer"
            label="Trailer" />
        </v-col>
        <v-col>
          <v-file-input
            v-model="movie.poster"
            accept="image/*"
            label="Poster" />
        </v-col>
        <v-col>
          <v-text-field
            v-model="movie.director"
            label="Dirección" />
        </v-col>
      </v-row>
      <v-textarea
        v-model="movie.sinopsis"
        label="Sinopsis" />
      <v-textarea
        v-model="movie.cast"
        label="Reparto" />
    </v-form>
    <span
      v-if="error"
      class="red--text">{{error}}</span>
    <v-btn
      color="primary" dark
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
                title: null,
                duration: null,
                year: null,
                rating: null,
                trailer: null,
                poster: null,
                director: null,
                sinopsis: null,
                cast: null
            },
            ratings: [ 'TP', 'M-7', 'M-12', 'M-16', 'M-18' ],
            error: null
        }
    },
    methods: {
      async add () {
        this.error = null

        try {
          await MovieService.post(this.movie)
          this.$router.push({ name: 'Movies' })
        } catch (error) {
          this.error = "Error al añadir la película"
        }
      }
    }
}
</script>