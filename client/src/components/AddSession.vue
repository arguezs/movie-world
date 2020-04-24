<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="session.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="session.time"
              label="Hora"
              prepend-icon="access_time"
              readonly
              v-on="on"></v-text-field>
          </template>
          <v-time-picker
            v-model="session.time"
            format="24hr"
            @click:minute="$refs.menu.save(session.time)"/>
        </v-menu>
      </v-col>
      <v-col>
        <v-select
          label="Película"
          :items="movies"
          item-text="title"
          item-value="id"
          v-model="session.movieId" />
      </v-col>
      <v-col cols="auto">
        <v-btn
          tile
          color="primary"
          outlined>Añadir</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'

export default {
  data () {
    return {
      movies: [],
      session: {
        date: this.date,
        time: null,
        movieId: null,
        theaterId: this.theater
      }
    }
  },
  props: ['theater', 'date'],
  async mounted () {
    this.movies = (await MovieService.fetch()).data
  }
}
</script>

<style>

</style>