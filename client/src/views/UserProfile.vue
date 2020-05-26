<template>
  <v-container>
    <v-toolbar-title flat>Perfil</v-toolbar-title>

    <dismissible-alert :alert="alert">
      <span slot="success">Perfil actualizado</span>
      <span slot="fail">Error al actualizar el perfil</span>
    </dismissible-alert>

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
          <v-text-field v-model="user.birthday" type="date" placeholder="Fecha de nacimiento" />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2" class="text-right">Confirmar contraseña:</v-col>
        <v-col>
          <v-text-field v-model="password" type="password" placeholder="Contraseña" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-center">
          <v-btn
            :disabled="!password"
            @click="updateProfile">Actualizar perfil</v-btn>
        </v-col>
      </v-row>

    </v-form>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import UserService from '@/services/UserService'
import store from '@/store'

import DismissibleAlert from '@/components/DismissibleAlert'

export default {
  components: { DismissibleAlert },
  data () {
    return {
      user: null,
      alert: null,
      password: null
    }
  },
  async mounted () {
    this.user = (await AuthenticationService.getUserData()).data
  },
  methods: {
    updateProfile () {
      const self = this
      const body = { 
        user: this.user,
        password: this.password
      }

      UserService.updateProfile(body)
        .then((response) => {
          self.$store.commit('updateUser')
          self.alert = {
            success: true,
            status: response
          }
        })
        .catch((error) => {
          self.alert = {
            success: false,
            status: error
          }
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.isAuthenticated)
      next()
    else
      next('/login')
  }
}
</script>

<style>

</style>