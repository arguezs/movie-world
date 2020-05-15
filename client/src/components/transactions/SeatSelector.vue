<template>
  <v-container>
    <v-row class="text-center">
      <v-col>Selecciona tus asientos</v-col>
    </v-row>

    <theater-layout
      :rows="session.Theater.Rows"
      :sessionSeats="session.Seats"
      :tickets="tickets"
      @seatClicked="seatClicked" />

    <step-buttons
      :disable="!canProceed"
      @prevStep="prevStep"
      @nextStep="nextStep" />
  </v-container>
</template>

<script>
import TheaterLayout from '../TheaterLayout'
import StepButtons from './StepButtons'

export default {
  components: { StepButtons, TheaterLayout },
  props: ['session', 'tickets'],
  data () {
    return {
      canProceed: false
    }
  },
  methods: {
    nextStep () {
      this.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    },
    seatClicked (allSelected) {
      this.canProceed = allSelected
    }
  }
}
</script>