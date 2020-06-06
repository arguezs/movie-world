<template>
  <v-btn
    icon
    :outlined="selected"
    :disabled="disabled && !selected">
    <v-icon @click="selectSeat">event_seat</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: { seat: Object, disabled: Boolean, row: String },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    selectSeat () {
      this.selected = !this.selected

      if (this.selected)
        this.$store.commit('addSeat', {
          id: this.seat.id,
          row: this.row,
          seat: this.seat.seat,
          disabled: this.seat.disabled
        })
      else
        this.$store.commit('removeSeat', this.seat.id)
    }
  }
}
</script>

<style>

</style>