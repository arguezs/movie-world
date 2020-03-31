<template>
  <v-btn
    icon
    :color="seat.disabled ? 'primary' : ''"
    :disabled="occupied">
    <v-icon>event_seat</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    seat: {},
    occupied: Boolean
  }
}
</script>

<style>

</style>