<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-items>
      <v-btn
        text
        exact
        :to="{name: 'Home'}">Inicio</v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items v-if="user">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">{{ user }}</v-btn>
        </template>

        <v-list>
          <v-list-item :to="{name: 'Perfil'}">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="logout">
            <v-list-item-title class="red--text">Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-toolbar-items>

    <v-toolbar-items v-else>
      <v-btn
        text
        exact
        :to="{name: 'Login'}">Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  computed: {
    user () {
      return this.$store.state.user.name
    } 
  },
  methods: {
    async logout () {
      await AuthenticationService.logout()

      this.$store.commit('updateUser', null)
      this.$router.push('/')
    }
  }
}
</script>