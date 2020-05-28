<template>
  <v-container>

    <dismissible-alert :alert="result">
      <span slot="success">Contraseña restaurada</span>
      <span slot="fail">Error al cambiar la contraseña</span>

      <ul v-if="result && result.invalid">
        <li v-for="message in result.message" :key="message">{{message}}</li>
      </ul>
    </dismissible-alert>

    <v-card max-width="30rem" class="mx-auto my-6">
      <v-card-title>Reestablecer contraseña</v-card-title>

      <v-card-text>
        <v-text-field label="Nueva contraseña" type="password" v-model="password" />
        <v-text-field label="Repetir contraseña" type="password" v-model="repeatPass" />
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="mx-auto mb-3"
          :disabled="requiredPass"
          color="primary"
          :loading="loadingState"
          @click="restorePassword">Reestablecer</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService'
import DismissibleAlert from '@/components/DismissibleAlert'
import {required, sameAs, helpers} from 'vuelidate/lib/validators'
const passRegEx = helpers.regex('passRegEx', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)

export default {
  components: {DismissibleAlert},
  data () {
    return {
      password: null,
      repeatPass: null,
      loadingState: false,
      result: null
    }
  },
  validations: {
    password: {required, passRegEx},
    repeatPass: {sameAsPassword: sameAs('password')}
  },
  computed: {
    requiredPass () {
      return !this.password || !this.repeatPass
    }
  },
  methods: {
    restorePassword () {
      this.loadingState = true
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.result = { invalid: true, message: [] }

        if (!this.$v.password.passRegEx)
          this.result.message.push("La contraseña debe contener al menos una letra, un número y un símbol especial, y tener al menos ocho carácteres de longitud")
        if (!this.$v.repeatPass.sameAsPassword)
          this.result.message.push('Las contraseñas no coinciden')

        this.loadingState = false
      } else {
        const vue = this

        UserService.restorePassword({password: this.password, code: this.$route.params.recoveryCode})
          .then(result => {
            if (result.data){
              vue.result = {success: true}
              vue.password = null
              vue.repeatPass = null
            }
          })
          .catch(() => { vue.result = {error: true} })
          .finally(() => { vue.loadingState = false })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const code = to.params.recoveryCode
    console.log(to)

    UserService.checkCode(code)
      .then(result => {
        if (!result.data)
          next('/')
        else
          next()
      })
      .catch(() => { next('/') })
  }
}
</script>

<style>

</style>