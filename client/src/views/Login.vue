<template>
  <v-container
    class="elevation-2 mt-5">
    <v-toolbar flat>
      <v-toolbar-title>Inicio de sesión</v-toolbar-title>
    </v-toolbar>

    <v-alert
      v-if="error"
      class="mx-12 mb-6"
      outlined
      dense
      type="error">
      Email o contraseña incorrectos
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
      <v-btn @click="login">Iniciar sesión</v-btn>
    </v-form>

    <v-row class="my-3 text-center">
      <v-col>
        ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mail: null,
        password: null
      },
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await AuthenticationService.login(this.user)

        if (this.route)
          this.$router.push(this.route)
        else
          this.$router.push('/')
      } catch (error) {
        this.error = error
      }
    }
  },
  mounted () {
    this.$store.commit('updateUser')

    if (this.$store.state.user)
      this.$router.push('/')
  },
  computed: {
    route () {
      return this.$store.state.route
    }
  }
}
</script>

<style>

</style>