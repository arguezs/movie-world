<template>
  <v-container>
    <v-card outlined>
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
      <v-card-title>Sesiones</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="6" v-for="day in sessions" :key="day.date">
            <v-row>
              <v-col>{{day.date}}</v-col>
            </v-row>
            <v-row>
              <v-col v-for="session in day.sessions" :key="session.id" cols="auto" class="text-center">
                <session-chip :session="session" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      
    </v-card>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'
import SessionService from '@/services/SessionService'

import SessionChip from '@/components/SessionChip'

export default {
  title () {
    return this.movie.title
  },
  data () {
    return {
      movie: {},
      sessions: []
    }
  },
  async mounted () {
    const movieId = this.$route.params.movieId
    this.movie = (await MovieService.fetch(movieId)).data
    this.sessions = (await SessionService.fetchAll(movieId)).data
  },
  components: { SessionChip }
}
</script>