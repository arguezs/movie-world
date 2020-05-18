<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="2">Asientos:</v-col>
      <v-col cols="auto">
        <v-row
        v-for="seat in transaction.seats"
        :key="seat.id">
        <v-col cols="auto">Fila: {{ seat.row }}</v-col>
        <v-col cols="auto">Asiento: {{ seat.seat }}</v-col>
      </v-row>
      </v-col>
    </v-row>

    <step-buttons
      @nextStep="nextStep"
      @prevStep="prevStep" />
  </v-container>
</template>

<script>
import StepButtons from './StepButtons'

export default {
  components: { StepButtons },
  computed: {
    transaction () {
      return this.$store.state.transaction
    }
  },
  methods: {
    nextStep () {

    },
    prevStep () {
      this.$store.commit('stepDown')
    }
  }
}
</script>