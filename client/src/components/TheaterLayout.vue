<template>
  <v-container>
    <v-row
      justify="center"
      no-gutter
      v-for="row in seats"
      :key="seats.indexOf(row)">
      <v-col
        class="pa-1"
        cols="auto"
        v-for="seat in row"
        :key="seat.id">
        <seat :seat="seat" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Seat from './Seat'

export default {
  props: [ 'seats' ],
  components: {
    Seat
  }
}
</script>

<style>

</style>