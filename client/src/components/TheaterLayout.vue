<template>
  <v-container>
    <v-row
      v-for="row in rows"
      :key="row.row"
      justify="center"
      align="center">
      <v-col cols="1" class="text-secondary">{{ row.row }}</v-col>
      <v-col
        cols="auto"
        v-for="seat in row.Seats"
        :key="seat.id">
        <seat :seat="seat" :occupied="isOccupied(seat)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Seat from './Seat'

export default {
  props: [ 'rows', 'sessionSeats' ],
  components: { Seat },
  methods: {
    isOccupied (seat) {
      return this.sessionSeats
        .filter((sessionSeat) => sessionSeat.id == seat.id).length
    }
  }
}
</script>