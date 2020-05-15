<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-1"
        cols="auto"
        v-for="seat in seats"
        :key="seat.id">
        <seat :seat="seat" :occupied="isOccupied(seat)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Seat from './Seat'

export default {
  props: [ 'seats', 'sessionSeats' ],
  components: { Seat },
  methods: {
    isOccupied (seat) {
      return this.sessionSeats
        .filter((sessionSeat) => sessionSeat.id == seat.id).length
    }
  }
}
</script>