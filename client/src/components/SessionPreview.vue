<template>
  <v-container>
    <v-row>
      <v-col cols="auto">{{ session.time }}</v-col>
      <v-col>{{ movie.title }}</v-col>
      <v-col cols="auto">
        <v-btn
          outlined
          small
          color="error"
          @click="deleteSession">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieService from '@/services/MovieService'
import SessionService from '@/services/SessionService'

export default {
  data () {
    return {
      movie: {}
    }
  },
  props: ['session'],
  async mounted () {
    this.movie = (await MovieService.fetch(this.session.MovieId)).data
  },
  methods: {
    async deleteSession () {
      const confirm = window.confirm('¿Deseas eliminar esta sesión?')

      if (confirm) {
        await SessionService.remove(this.session.id)

        this.$emit('resync-sessions')
      }
    }
  }
}
</script>

<style>

</style>