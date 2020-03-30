<template>
  <v-container>
    <v-card
      outlined>
      <v-row dense>
        <v-col>
          <v-card-title>{{movie.title}}</v-card-title>
          <v-card-subtitle>
            {{movie.duration}} min -
            {{movie.director}} -
            {{movie.genre}}
          </v-card-subtitle>
          <v-card-text>{{movie.sinopsis}}</v-card-text>
          <v-card-text>
            <div class="overline">Reparto</div>
            {{movie.cast}}
          </v-card-text>
        </v-col>
        <v-col cols="auto">
          <v-img
            class="ma-2"
            max-height="300px"
            max-width="250px"
            contain
            :src="movie.poster"></v-img>
        </v-col>
      </v-row>
    </v-card>

    <v-card outlined class="mt-6">
      <v-row>
        <v-col>
          <v-card-title>Sesiones</v-card-title>
        </v-col>
        <v-col
          cols="auto"
          class="pa-6">
          <add-session-dialog :movie="movie"></add-session-dialog>
        </v-col>
      </v-row>
      
    </v-card>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'
import AddSessionDialog from '@/components/AddSessionDialog'

export default {
  data () {
    return {
      movie: {}
    }
  },
  async mounted () {
    const movieId = this.$route.params.movieId
    this.movie = (await MovieService.fetch(movieId)).data
  },
  components: {
    AddSessionDialog
  }
}
</script>

<style>

</style>