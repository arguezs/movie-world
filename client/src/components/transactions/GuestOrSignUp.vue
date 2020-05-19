<template>
  <v-container class="text-center">
    <v-row justify="center" v-if="!guest">
      <v-col cols="4">
        <v-row>
          <v-col>¿Tienes una cuenta?</v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" text to="/login">Accede para continuar</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical />

      <v-col cols="4">
        <v-row>
          <v-col>O</v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-btn color="primary" text @click="chooseGuest">Continúa como invitado</v-btn>
          </v-col>
          <span class="text--secondary caption">Tendrás que introducir una cuenta de correo válida</span>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="6">
        <v-text-field
          :error="!validMail"
          label="Dirección de correo"
          v-model="mail"
          type="mail" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      guest: false,
      mail: null
    }
  },
  validations: {
    mail: {required, email}
  },
  watch: {
    mail () {
      this.$v.$touch()

      if (this.validMail)
        this.$store.commit('updateMail', this.mail)
    }
  },
  computed: {
    validMail () {
      return !this.$v.$invalid
    }
  },
  methods: {
    chooseGuest () {
      this.guest = true
    }
  }

}
</script>