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
      session: {},
      theater: [],
      sessionSeats: []
    }
  },
  async mounted () {
    const sessionId = this.$route.params.sessionId
    this.session = (await SessionService.fetchOne(sessionId)).data
    this.theater = (await TheaterService.fetchTheater(this.session.theaterId)).data
    this.sessionSeats = (await SessionService.fetchSeats(sessionId)).data
  },
  components: { TheaterLayout }
}
</script>

<style>

</style>