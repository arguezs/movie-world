<template>

  <form-layout
    max-width="30rem"
    :alert="result"
    :success-msg="`Se ha enviado un mensaje a ${mail}`"
    :fail-msg="errorMessage"
    form-title="Recuperar contraseña"
    :disabled="invalidMail"
    :loading="loadingState"
    submit-text="Enviar"
    @submit="sendRecoveryCode">
    <span slot="subtitle">Introduce tu dirección de correo y te mandaremos un enlace para reestablecer tu contraseña.</span>

    <v-text-field label="Dirección de correo" v-model="mail" />
  </form-layout>
  
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import UserService from '@/services/UserService'
import FormLayout from '@/components/FormLayout'

export default {
  components: { FormLayout },
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