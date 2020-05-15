<template>
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
          @click="ticketsDown"><v-icon>remove</v-icon></v-btn>
      </v-col>

      <v-col cols="1">{{ tickets }}</v-col>

      <v-col cols="1">
        <v-btn
          fab outlined x-small
          :disabled="tickets==10"
          @click="ticketsUp"><v-icon>add</v-icon></v-btn>
      </v-col>

      <v-col cols="2">{{ price.toFixed(2) }} €</v-col>

      <v-col cols="2">{{ totalPrice.toFixed(2) }} €</v-col>
    </v-row>

    <step-buttons @prevStep="this.$emit('prevStep')" @nextStep="nextStep" :disable="actualTickets == 0" />

  </v-container>
</template>

<script>
import StepButtons from './StepButtons'

export default {
  props: ['tickets', 'step'],
  data () {
    return {
      price: 9.5,
      actualTickets: this.tickets
    }
  },
  computed: {
    totalPrice () {
      return this.actualTickets * this.price
    }
  },
  components: { StepButtons },
  methods: {
    ticketsUp () {
      this.actualTickets += 1
      this.$emit('update:tickets', this.actualTickets)
    },
    ticketsDown () {
      this.actualTickets -= 1
      this.$emit('update:tickets', this.actualTickets)
    },
    nextStep () {
      this.$emit('nextStep')
    }
  }
}
</script>

<style>

</style>