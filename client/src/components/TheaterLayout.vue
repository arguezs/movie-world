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
          :seat="seat" :row="row.row" :disabled="isOccupied(seat) || allSeatsPicked" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Seat from './Seat'

export default {
  props: [ 'rows', 'sessionSeats', 'tickets' ],
  data () {
    return {
      selectedSeats: []
    }
  },
  components: { Seat },
  computed: {
    allSeatsPicked () {
      return this.$store.state.transaction.seats.length == this.tickets
    }
  },
  methods: {
    isOccupied (seat) {
      return this.sessionSeats
        .filter((sessionSeat) => sessionSeat.id == seat.id).length == 1
    }
  }
}
</script>