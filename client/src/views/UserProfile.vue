<template>
  <v-container>
    <v-toolbar-title flat>Perfil</v-toolbar-title>

    <v-form>
      
      <v-row align="center">
        <v-col cols="2" class="text-right">Nombre:</v-col>
        <v-col>
          <v-text-field v-model="user.name" placeholder="Nombre" />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2" class="text-right">Correo:</v-col>
        <v-col>
          <v-text-field v-model="user.mail" placeholder="Correo" />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2" class="text-right">Fecha de nacimiento:</v-col>
        <v-col>
          <v-text-field v-model="user.birthday" placeholder="Fecha de nacimeinto" />
        </v-col>
      </v-row>

    </v-form>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      user: null
    }
  },
  async mounted () {
    if (!this.$store.state.user)
      this.$router.push({name: 'Login'})

    this.user = (await AuthenticationService.getUserData()).data
  }
}
</script>

<style>

</style>