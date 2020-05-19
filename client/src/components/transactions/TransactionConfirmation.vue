<template>
  <v-container>

    <guest-or-sign-up v-if="!user" />

    <v-container v-if="userOrGuest">
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
    },
    userOrGuest () {
      return this.user || this.$store.state.transaction.mail
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