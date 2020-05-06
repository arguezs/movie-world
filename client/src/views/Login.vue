<template>
  <v-container
    class="elevation-2 mt-5">
    <v-toolbar flat>
      <v-toolbar-title>Inicio de sesión</v-toolbar-title>
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
      <v-btn>Iniciar sesión</v-btn>
    </v-form>
  </v-container>
</template>

<script>
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
  }
}
</script>

<style>

</style>