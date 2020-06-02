<template>

  <form-layout
    @submit="updateProfile" max-width="60rem"
    :alert="alert" fail-msg="Error al actualizar el perfil"
    success-msg="Perfil actualizado" form-title="Perfil"
    submit-text="Actualizar perfil" :disabled="!password">

    <v-row align="center">
      <v-col cols="12" sm="3"
        :class="$vuetify.breakpoint.xs ? 'pb-0' : 'text-right'">Nombre:</v-col>
      <v-col>
        <v-text-field v-model="user.name" placeholder="Nombre" />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" sm="3"
        :class="$vuetify.breakpoint.xs ? 'pb-0' : 'text-right'">Correo:</v-col>
      <v-col>
        <v-text-field v-model="user.mail" placeholder="Correo" />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" sm="3"
        :class="$vuetify.breakpoint.xs ? 'pb-0' : 'text-right'">Fecha de nacimiento:</v-col>
      <v-col>
        <v-text-field v-model="user.birthday" type="date" placeholder="Fecha de nacimiento" />
      </v-col>
    </v-row>

    <v-divider />

    <v-row align="center">
      <v-col>
        <v-text-field v-model="password" type="password" placeholder="Confirmar contraseña" />
      </v-col>
    </v-row>

  </form-layout>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import UserService from '@/services/UserService'
import store from '@/store'

import FormLayout from '@/components/FormLayout'

export default {
  components: { FormLayout },
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
      next({name: 'Login'})
  }
}
</script>

<style>

</style>