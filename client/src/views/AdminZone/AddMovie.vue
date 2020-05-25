<template>
  <v-container class="elevation-2 mt-6 d-flex flex-column">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Añadir Película</v-toolbar-title>
    </v-toolbar>

    <v-form name="form">
      <v-row>
        <v-col>
          <v-text-field
            name="title"
            counter
            label="Título" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            name="duration"
            type="number"
            label="Duración" />
        </v-col>
        <v-col>
          <v-select
            :items="ratings"
            name="rating"
            label="Rating" />
        </v-col>
        <v-col>
          <v-text-field
            name="genre"
            label="Género" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            type="number"
            name="year"
            label="Año" />
        </v-col>
        <v-col>
          <v-text-field
            name="trailer"
            label="Trailer" />
        </v-col>
        <v-col>
          <v-file-input
            name="poster"
            accept="image/*"
            label="Poster" />
        </v-col>
        <v-col>
          <v-text-field
            name="director"
            label="Dirección" />
        </v-col>
      </v-row>
      <v-textarea
        name="sinopsis"
        label="Sinopsis" />
      <v-textarea
        name="cast"
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
      ratings: [ 'TP', 'M-7', 'M-12', 'M-16', 'M-18' ],
      error: null
    }
  },
  methods: {
    add () {
      this.error = null
      const vue = this
      const formData = new FormData(document.forms.namedItem('form'))

      MovieService.post(formData)
        .then(() => { vue.$router.push({name: 'Movies'}) })
        .catch(() => { vue.error = "Error al añadir la película" })

    }
  }
}
</script>