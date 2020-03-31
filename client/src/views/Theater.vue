<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>
        Sala
      </v-toolbar-title>
    </v-toolbar>
    <theater-layout :seats="theater" :session-seats="sessionSeats" />
  </v-container>
</template>

<script>
import TheaterLayout from '@/components/TheaterLayout'

import TheaterService from '@/services/TheaterService'
import SessionService from '@/services/SessionService'

export default {
  data () {
    return {
      theater: [],
      sessionSeats: []
    }
  },
  async mounted () {
    const theaterId = this.$route.params.theaterId
    this.theater = (await TheaterService.fetchTheater(theaterId)).data
    this.sessionSeats = (await SessionService.fetchSeats(2)).data
  },
  components: { TheaterLayout }
}
</script>

<style>

</style>