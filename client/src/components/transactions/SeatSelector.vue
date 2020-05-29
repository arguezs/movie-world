<template>
  <v-container>
    <v-row class="text-center">
      <v-col>Selecciona tus asientos</v-col>
    </v-row>

    <theater-layout
      :rows="session.Theater.Rows"
      :tickets="tickets"
      :complete="canProceed" />

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
  computed: {
    canProceed () {
      return this.$store.state.transaction.seats.length == this.tickets
    }
  },
  methods: {
    nextStep () {
      this.$store.commit('stepUp')
    },
    prevStep () {
      this.$store.commit('stepDown')
    }
  }
}
</script>