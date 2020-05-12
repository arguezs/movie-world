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
      <v-btn
        @click="register">Crear cuenta</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  data() {
    return {
      user: {
        mail: null,
        password: null
      },
      result: null
    }
  },
  methods: {
    async register () {
      try {
        this.result = (await UserService.register(this.user)).data

        this.user.mail = null
        this.user.password = null
      } catch (error) {
        this.result = {error: error}
      }
    }
  },
  mounted () {
    this.$store.commit('updateUser')

    if (this.$store.state.user)
      this.$router.push('/')
  }
}
</script>

<style>

</style>