<template>
  <v-container
    class="elevation-2 mt-5">
    <v-toolbar flat>
      <v-toolbar-title>Registro</v-toolbar-title>
    </v-toolbar>

    <v-alert
      v-if="result"
      class="mx-12 mb-6"
      outlined
      dense
      :type="result.success?'success':'error'">
      <span v-if="result.success">Registro completo</span>
      <ul v-else-if="result.invalid">
        <li v-for="message in result.message" :key="message">{{message}}</li>
      </ul>
      <span v-else>Error al registrar</span>
    </v-alert>

    <v-form
      class="mx-12">
      <v-text-field
        label="Dirección de correo"
        v-model="user.mail"
        required />
      <v-text-field
        label="Contraseña"
        v-model="user.password"
        type="password"
        required />
      <v-text-field
        label="Repetir contraseña"
        v-model="repeatPassword"
        type="password"
        required />
      <v-btn
        @click="register">Crear cuenta</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import {required, email, sameAs, helpers} from 'vuelidate/lib/validators'
const passRegEx = helpers.regex('passRegEx', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
import UserService from '@/services/UserService'

export default {
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
  },
  mounted () {
    if (this.$store.getters.isAuthenticated)
      this.$router.push('/')
  }
}
</script>