<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title><v-icon>theaters</v-icon> Compra tus entradas</v-card-title>
      <v-card-text class="pl-12">
        <v-row>
          <v-col>
            <v-row>
              <v-col class="text--primary font-weight-bold" lg="2" md="4">Película:</v-col>
              <v-col>{{ session.Movie.title }}</v-col>
            </v-row>
            <v-row>
              <v-col class="text--primary font-weight-bold" lg="2" md="4">Fecha:</v-col> 
              <v-col>{{ dateString }}</v-col>
            </v-row>
            <v-row>
              <v-col class="text--primary font-weight-bold" lg="2" md="4">Sesión:</v-col>
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

    <dismissible-alert :alert="result">
      <span slot="success">Transacción realizada con éxito. Redirigiendo.</span>
      <span slot="fail">No se ha podido realizar la compra. Inténtalo de nuevo más tarde.</span>
    </dismissible-alert>

    <v-stepper v-model="step" class="mt-6">
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
          <transaction-confirmation
            @success="transactionSuccess"
            @error="transactionError" />
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import SessionService from '@/services/SessionService'

import DismissibleAlert from '@/components/DismissibleAlert'
import TicketSelector from '@/components/transactions/TicketSelector'
import SeatSelector from '@/components/transactions/SeatSelector'
import TransactionConfirmation from '@/components/transactions/TransactionConfirmation'

export default {
  data () {
    return {
      session: null,
      tickets: 0,
      price: 9.5,
      result: null
    }
  },
  async mounted () {
    this.session = (await SessionService.fetchData(this.$route.params.sessionId)).data
  },
  components: { DismissibleAlert, TicketSelector, SeatSelector, TransactionConfirmation },
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
  },
  methods: {
    transactionSuccess () {
      this.result = {success: true}
      const vue = this

      window.setTimeout(() => {
        vue.$router.push('/')
      }, 10000)
    },
    transactionError () {
      this.result = {error: true}
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (window.confirm('¿Está seguro de que desea dejar esta página?')){
      this.$store.dispatch('resetTransactionState')
      next()
    } else {
      next(false)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == 'Login') {
      this.$store.commit('updateRoute', from.path)
      next ()
    } else if (this.result || window.confirm('¿Está seguro de que desea dejar esta página?')){
      this.$store.dispatch('resetTransactionState')
      next()
    } else {
      next(false)
    }
    
  }
}
</script>

<style>

</style>