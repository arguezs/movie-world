<template>
  <v-container>

    <v-container v-if="user">
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

    <guest-or-sign-up v-else />
  </v-container>
</template>

<script>
import StepButtons from './StepButtons'
import GuestOrSignUp from './GuestOrSignUp'

export default {
  components: { StepButtons, GuestOrSignUp },
  computed: {
    transaction () {
      return this.$store.state.transaction
    },
    user () {
      return this.$store.state.user
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