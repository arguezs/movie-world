<template>
  <v-btn
    icon
    :color="seat.disabled ? 'primary' : ''">
    <v-icon>event_seat</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    seat: {}
  }
}
</script>

<style>

</style>