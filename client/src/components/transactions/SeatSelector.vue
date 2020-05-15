<template>
  <v-container>
    <theater-layout :seats="session.Theater.Seats" :sessionSeats="session.Seats" />
    <step-buttons @prevStep="prevStep" @nextStep="nextStep" />
  </v-container>
</template>

<script>
import TheaterLayout from '../TheaterLayout'
import StepButtons from './StepButtons'

export default {
  components: { StepButtons, TheaterLayout },
  props: ['session'],
  methods: {
    nextStep () {
      this.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>

<style>

</style>