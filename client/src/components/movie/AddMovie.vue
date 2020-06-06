<template>
  <v-dialog v-model="dialog">
    
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">
        <v-icon left>add</v-icon> Añadir Película
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Añadir Película</v-card-title>

      <v-card-text>
        <v-form name="form" ref="form">
          <v-row>
            <v-col>
              <v-text-field dense name="title" counter label="Título" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field dense name="duration" type="number" label="Duración" />
            </v-col>
            <v-col>
              <v-select dense :items="ratings" name="rating" label="Rating" />
            </v-col>
            <v-col>
              <v-text-field dense name="genre" label="Género" />
            </v-col>
          </v-row>

          <v-row align="end">
            <v-col>
              <v-text-field dense type="number" name="year" label="Año" />
            </v-col>
            <v-col>
              <v-file-input dense name="poster" accept="image/*" label="Poster" />
            </v-col>
            <v-col>
              <v-text-field dense name="director" label="Dirección" />
            </v-col>
          </v-row>

          <v-textarea dense name="sinopsis" label="Sinopsis" />

          <v-textarea dense name="cast" label="Reparto" />
        </v-form>

        <span v-if="error" class="red--text">{{error}}</span>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn text @click="dissmiss">Cancelar</v-btn>

        <v-btn color="primary" @click="add">Añadir</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import MovieService from '@/services/MovieService'

export default {
  data () {
    return {
      dialog: false,
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
        .then(() => { vue.$emit('success') })
        .catch(() => { vue.$emit('fail') })
        .finally(() => { vue.dissmiss() })

    },
    dissmiss () {
      this.$refs.form.reset()
      this.dialog = false
    }
  }
}
</script>
