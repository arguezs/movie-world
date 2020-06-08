<template>
  <div>
    <v-app-bar color="primary" dark>
      <router-link to="/" class="display-1 white--text td-none ma-6">Movie World</router-link>

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

        <v-app-bar-nav-icon v-if="isAdmin" @click="drawer = true"></v-app-bar-nav-icon>
        
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn
          text
          exact
          :to="{name: 'Login'}">Login</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary right v-if="isAdmin">
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item :to="{name: 'Movies'}">
            <v-list-item-title>Películas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name: 'Sessions'}">
            <v-list-item-title>Sesiones</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name: 'Movie Stats'}">
            <v-list-item-title>Estadísticas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name: 'User List'}">
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name: 'Transaction List'}">
            <v-list-item-title>Transacciones</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'MainHeader',
  data: () => ({ drawer: false }),
  computed: {
    user () { return this.$store.state.user.name },
    isAdmin () { return this.$store.getters.isAdmin }
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

<style scoped>
  .td-none{text-decoration: none;}
</style>
