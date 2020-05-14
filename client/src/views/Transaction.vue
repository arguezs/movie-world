<template>
  <v-container>
    <v-card>
      <v-card-title>Compra tus entradas</v-card-title>
      <v-card-text class="pl-12">
        <v-row>
          <v-col>
            <span
              class="text--primary font-weight-bold">Película:</span> {{ session.Movie.title }}
            </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span
              class="text--primary font-weight-bold">Fecha:</span> {{ session.date }}
            </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span
              class="text--primary font-weight-bold">Sesión:</span> {{ session.time }}
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
            :tickets.sync="tickets" :step="step"
            @nextStep="step+=1" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container>
            <v-row>
              <v-btn @click="step = 3">Continuar</v-btn>
              <v-btn @click="step = 1">Cancelar</v-btn>
            </v-row>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container>
            <v-row>
              <v-btn>Continuar</v-btn>
              <v-btn @click="step = 2">Cancelar</v-btn>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import SessionService from '@/services/SessionService'

import TicketSelector from '@/components/transactions/TicketSelector'

export default {
  data () {
    return {
      step: 1,
      session: null,
      tickets: 0,
    }
  },
  async mounted () {
    this.session = (await SessionService.fetchData(this.$route.params.sessionId)).data
  },
  components: { TicketSelector }
}
</script>

<style>

</style>