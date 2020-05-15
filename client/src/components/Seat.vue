<template>
  <v-btn
    icon
    :outlined="selected"
    :color="seat.disabled ? 'primary' : ''"
    :disabled="disabled && !selected">
    <v-icon @click="selectSeat">event_seat</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    seat: {},
    disabled: Boolean
  },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    selectSeat () {
      this.selected = !this.selected

      if (this.selected)
        this.$emit('select', this.seat)
      else
        this.$emit('deselect', this.seat.id)
    }
  }
}
</script>

<style>

</style>