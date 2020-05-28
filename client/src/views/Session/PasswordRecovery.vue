<template>
  <v-container>
    <dismissible-alert :alert="result">
      <span slot="success">Se ha enviado un enlace a {{ mail }}</span>
      <span slot="fail">{{ errorMessage }}</span>
    </dismissible-alert>

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
          :loading="loadingState"
          @click="sendRecoveryCode">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import UserService from '@/services/UserService'
import DismissibleAlert from '@/components/DismissibleAlert'

export default {
  components: { DismissibleAlert },
  data () {
    return {
      mail: null,
      loadingState: false,
      result: null
    }
  },
  validations: {
    mail: { required, email }
  },
  computed: {
    invalidMail () {
      this.$v.$touch()
      return this.$v.$invalid
    },
    errorMessage () {
      return this.result ? this.result.error : null
    }
  },
  methods: {
    sendRecoveryCode () {
      const vue = this
      this.loadingState = true
      UserService.generateCode({mail: this.mail})
        .then(result => {
          if (result.data.error)
            vue.result = {error: result.data.error}
          else
            vue.result = {success: true}
        })
        .catch(() => { vue.result = {error: 'Se ha producido un error'} })
        .finally(() => { vue.loadingState = false })
    }
  }
}
</script>