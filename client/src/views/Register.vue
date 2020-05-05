<template>
  <v-container
    class="elevation-2 mt-5">
    <v-toolbar flat>
      <v-toolbar-title>Registro</v-toolbar-title>
    </v-toolbar>
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
      }
    }
  },
  methods: {
    async register () {
      try {
        await UserService.register(this.user)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>