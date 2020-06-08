<template>

  <form-layout
    @submit="login" max-width="60rem"
    :alert="error" fail-msg="Email o contraseña incorrectos"
    form-title="Inicio de sesión" submit-text="Iniciar sesión">
    <v-text-field
      label="Dirección de correo"
      v-model="user.mail" required />
    <v-text-field
      label="Contraseña" v-model="user.password"
      type="password" required />

    <template slot="extra">
      <v-divider class="mx-12" />
      <div class="py-6 text-center">
        ¿Aún no tienes cuenta? <router-link :to="{name: 'Register'}">Regístrate</router-link>
      </div>

      <div class="text-center pb-3">
        <router-link :to="{name: 'Password Recovery'}">Recuperar contraseña</router-link>
      </div>
    </template>
  </form-layout>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

import FormLayout from '@/components/FormLayout'

export default {
  components: { FormLayout },
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
          this.$router.push(this.route),
          this.$store.commit('updateRoute', null)
        else
          this.$router.push('/')
      } catch (error) {
        this.error = error
      }
    }
  },
  computed: {
    route () {
      return this.$store.state.route
    }
  }
}
</script>
