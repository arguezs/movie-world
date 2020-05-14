<template>
  <v-row class="mt-6" justify="end">
      <v-col cols="auto">
        <v-btn @click="prevStep">Cancelar</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn color="primary" @click="nextStep" :disabled="disable">Continuar</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  props: ['disable'],
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