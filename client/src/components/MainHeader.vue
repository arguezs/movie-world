<template>
  <v-app-bar
    app
    color="primary"
    dark>

    <v-toolbar-items>
      <v-btn
        text
        exact
        :to="{name: 'Home'}">Inicio</v-btn>
      <v-btn
        text
        exact
        :to="{name: 'Movies'}">Películas</v-btn>
      <v-btn
        text
        exact
        :to="{name: 'Sessions'}">Sesiones</v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items v-if="user">
      <span v-if="user.name">{{ user.name }}</span>
      <span v-else>{{ user.mail }}</span>
    </v-toolbar-items>

    <v-toolbar-items v-else>
      <v-btn
        text
        exact
        :to="{name: 'Login'}">Login</v-btn>
    </v-toolbar-items>

  </v-app-bar>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'MainHeader',
  computed: {
    user () {
      return this.$store.state.user
    } 
  },
  async mounted () {
    const user = (await AuthenticationService.getUserData()).data

    this.$store.commit('updateUser', user)
  }
}
</script>

<style>

</style>