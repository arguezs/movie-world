<template>
  <v-container>
    <v-card>
      <v-card-title><v-icon>theaters</v-icon> Compra tus entradas</v-card-title>
      <v-card-text class="pl-12">
        <v-row>
          <v-col>
            <v-row>
              <v-col class="text--primary font-weight-bold" cols="2">Película:</v-col>
              <v-col>{{ session.Movie.title }}</v-col>
            </v-row>
            <v-row>
              <v-col class="text--primary font-weight-bold" cols="2">Fecha:</v-col> 
              <v-col>{{ dateString }}</v-col>
            </v-row>
            <v-row>
              <v-col class="text--primary font-weight-bold" cols="2">Sesión:</v-col>
              <v-col>{{ timeString }}</v-col>
            </v-row>
          </v-col>

          <v-col align-self="center">
            <v-card max-width="300" class="mx-auto text-center">
              <v-toolbar color="primary" dark flat dense class="text-center">
                <v-toolbar-title>Total</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="text--primary display-1">{{ $store.state.transaction.price.toFixed(2) }} €</v-card-text>
            </v-card>
          </v-col>
          </v-row>
          
      </v-card-text>
    </v-card>

    <v-stepper v-model="step" class="mt-12">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Entradas</v-stepper-step>
        <v-stepper-step :complete="step > 2" step="2">Asientos</v-stepper-step>
        <v-stepper-step :complete="step > 3" step="3">Completar compra</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>

        <v-stepper-content step="1">
          <ticket-selector
            :tickets.sync="tickets" :step="step" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <seat-selector
            :session="session"
            :tickets="tickets"/>
        </v-stepper-content>

        <v-stepper-content step="3">
          <transaction-confirmation />
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import SessionService from '@/services/SessionService'

import TicketSelector from '@/components/transactions/TicketSelector'
import SeatSelector from '@/components/transactions/SeatSelector'
import TransactionConfirmation from '@/components/transactions/TransactionConfirmation'

export default {
  data () {
    return {
      session: null,
      tickets: 0,
      price: 9.5
    }
  },
  async mounted () {
    this.$store.commit('updateUser')
    this.session = (await SessionService.fetchData(this.$route.params.sessionId)).data
  },
  components: { TicketSelector, SeatSelector, TransactionConfirmation },
  computed: {
    step () {
      return this.$store.state.transaction.step
    },
    dateString () {
      const date = new Date(this.session.date + ' ' + this.session.time)
      return date.toLocaleDateString(undefined, {dateStyle: 'long'})
    },
    timeString () {
      const date = new Date(this.session.date + ' ' + this.session.time)
      return date.toLocaleTimeString(undefined, {timeStyle: 'short'})
    }
  }
}
</script>

<style>

</style>