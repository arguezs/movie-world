<template>
  <v-row class="mt-6"
    :justify="($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) ? 'center' : 'end'">
      <v-col cols="auto" order="2" order-md="1">
        <v-btn ref="prevStep" @click="prevStep">Cancelar</v-btn>
      </v-col>

      <v-col cols="auto" order="1" order-md="2">
        <v-btn ref="nextStep" color="accent" @click="nextStep" :disabled="disable">Continuar</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  props: { disable: Boolean },
  methods: {
    nextStep () {
      this.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>