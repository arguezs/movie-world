<template>

  <form-layout
    max-width="60rem"
    :alert="result"
    form-title="Registro"
    success-msg="Registro completo"
    fail-msg="Error al registrar"
    submit-text="Crear cuenta"
    @submit="register">

    <v-text-field label="Dirección de correo" v-model="user.mail" />
    <v-text-field label="Contraseña" v-model="user.password" type="password" />
    <v-text-field label="Repetir contraseña" v-model="repeatPassword" type="password" />

  </form-layout>

</template>

<script>
import {required, email, sameAs, helpers} from 'vuelidate/lib/validators'
const passRegEx = helpers.regex('passRegEx', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
import UserService from '@/services/UserService'

import FormLayout from '@/components/FormLayout'

export default {
  components: { FormLayout },
  data() {
    return {
      user: {
        mail: null,
        password: null
      },
      repeatPassword: null,
      result: null
    }
  },
  validations: {
    user: {
      mail: { required, email },
      password: { required, passRegEx }
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs(function() { return this.user.password })
    }
  },
  methods: {
    async register () {
      this.$v.$touch()

      if (this.$v.$invalid){
        this.result = {
          invalid: true,
          message: []
        }
        if (!this.$v.user.mail.required ||
            !this.$v.user.password.required ||
            !this.$v.repeatPassword.required)
          this.result.message.push("Todos los campos son obligatorios")
        if (!this.$v.user.mail.email)
          this.result.message.push("Debes introducir una dirección de correo válida") 
        if (!this.$v.user.password.passRegEx)
          this.result.message.push("La contraseña debe contener al menos una letra, un número y un símbol especial, y tener al menos ocho carácteres de longitud")
        if (!this.$v.repeatPassword.sameAsPassword)
          this.result.message.push('Las contraseñas no coinciden')
      } else {
        try {
          this.result = (await UserService.register(this.user)).data

          this.user.mail = null
          this.user.password = null
        } catch (error) {
          this.result = {error: error}
        }
      }    
    }
  }
}
</script>
