<template>
  <v-dialog
    v-model="dialog"
    persistent>

    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-on="on">
        <v-icon left>add</v-icon> Añadir
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Añadir sesión</v-card-title>

      <v-card-text
        class="text-center">
        <v-row>
          <v-col>
            <v-select
              v-model="session.theaterId"
              label="Sala"
              :items="theaters"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-date-picker
              v-model="date"></v-date-picker>
          </v-col>
          <v-col>
            <v-time-picker
              v-model="time"></v-time-picker>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      session: {
        date: '',
        theaterId: '',
        movieId: ''
      },
      theaters: [],
      date: '',
      time: ''
    }
  },
  props: {
    movie: {}
  },
  mounted () {
    this.session.movieId = this.movie.id
  },
  watch: {
    date: function (val) {
      this.session.date = `${val} ${this.time}`
    },
    time: function (val) {
      this.session.date = `${this.date} ${val}`
    }
  }
}
</script>
  
<style>

</style>