<template>
  <v-container>
    <v-row
      v-for="row in rows"
      :key="row.row"
      justify="center"
      align="center"
      no-gutters>
      <v-col cols="1" class="text-secondary text-center">{{ row.row }}</v-col>
      <v-col
        cols="auto"
        v-for="seat in row.Seats"
        :key="seat.id">
        <seat
          :seat="seat" :row="row.row" :disabled="isOccupied(seat) || complete" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Seat from './Seat'
import SessionService from '@/services/SessionService'

export default {
  props: { rows: Array, tickets: Number, complete: Boolean},
  data () {
    return {
      selectedSeats: [],
      sessionSeats: []
    }
  },
  components: { Seat },
  async mounted () {
    this.sessionSeats = (await SessionService.fetchSeats(this.$route.params.sessionId)).data
  },
  methods: {
    isOccupied (seat) {
      return this.sessionSeats
        .filter((sessionSeat) => sessionSeat.id == seat.id).length == 1
    }
  }
}
</script>