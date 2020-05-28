<template>
  <v-container>
    <v-card max-width="30rem" class="mx-auto my-6">
      <v-card-title>Recuperar contraseña</v-card-title>

      <v-card-subtitle>Introduce tu dirección de correo y te mandaremos un enlace para reestablecer tu contraseña.</v-card-subtitle>

      <v-card-text>
        <v-text-field label="Dirección de correo" v-model="mail" />
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="mx-auto mb-3"
          :disabled="invalidMail"
          color="primary"
          @click="sendRecoveryCode">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      mail: null
    }
  },
  validations: {
    mail: { required, email }
  },
  computed: {
    invalidMail () {
      this.$v.$touch()
      return this.$v.$invalid
    }
  },
  methods: {
    sendRecoveryCode () {
      
    }
  }
}
</script>