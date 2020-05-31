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
          :disabled="actualTickets==0"
          @click="actualTickets-=1"><v-icon>remove</v-icon></v-btn>
      </v-col>

      <v-col cols="1">{{ actualTickets }}</v-col>

      <v-col cols="1">
        <v-btn
          fab outlined x-small
          :disabled="actualTickets==10"
          @click="actualTickets+=1"><v-icon>add</v-icon></v-btn>
      </v-col>

      <v-col cols="2">{{ price.toFixed(2) }} €</v-col>

      <v-col cols="2">{{ totalPrice.toFixed(2) }} €</v-col>
    </v-row>

    <step-buttons
      @prevStep="prevStep"
      @nextStep="nextStep"
      :disable="actualTickets == 0" />

  </v-container>
</template>

<script>
import StepButtons from './StepButtons'

export default {
  props: { tickets: Number, step: Number },
  data () {
    return {
      price: 9.5,
      actualTickets: this.tickets
    }
  },
  watch: {
    actualTickets () {
      this.$emit('update:tickets', this.actualTickets)
      this.$store.commit('updatePrice', this.totalPrice)
    }
  },
  computed: {
    totalPrice () {
      return this.actualTickets * this.price
    }
  },
  components: { StepButtons },
  methods: {
    nextStep () {
      this.$store.commit('stepUp')
    },
    prevStep () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>