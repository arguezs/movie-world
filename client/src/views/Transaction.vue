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
          <v-container>
            <v-row class="text-center">
              <v-col>Selecciona cuántas entradas quieres</v-col>
            </v-row>
            <v-row align="center" justify="center" class="text-center">
              <v-col cols="3">Entradas</v-col>
              <v-col cols="2">Precio</v-col>
              <v-col cols="2">Total</v-col>
            </v-row>
            <v-row align="center" justify="center" class="text-center">
              <v-col cols="1">
                <v-btn
                  fab outlined x-small
                  :disabled="tickets==0"
                  @click="tickets-=1"><v-icon>remove</v-icon></v-btn>
              </v-col>
              <v-col cols="1">{{ tickets }}</v-col>
              <v-col cols="1">
                <v-btn
                  fab outlined x-small
                  :disabled="tickets==10"
                  @click="tickets+=1"><v-icon>add</v-icon></v-btn>
              </v-col>
              <v-col cols="2">{{ price.toFixed(2) }} €</v-col>
              <v-col cols="2">{{ totalPrice.toFixed(2) }} €</v-col>
            </v-row>
            <v-row class="mt-6" justify="end">
              <v-col cols="auto">
                <v-btn to="/">Cancelar</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn color="primary" @click="step = 2">Continuar</v-btn>
              </v-col>
            </v-row>
          </v-container>
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

export default {
  data () {
    return {
      step: 1,
      session: null,
      tickets: 0,
      price: 9.5
    }
  },
  computed: {
    totalPrice () {
      return this.tickets * this.price
    }
  },
  async mounted () {
    this.session = (await SessionService.fetchData(this.$route.params.sessionId)).data
  }
}
</script>

<style>

</style>