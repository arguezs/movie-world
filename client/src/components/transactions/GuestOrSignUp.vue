<template>
  <v-container class="text-center">
    <v-row justify="center" v-if="!guest">
      <v-col cols="4">
        <v-row>
          <v-col>¿Tienes una cuenta?</v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" text @click="chooseLogin">Accede para continuar</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical />

      <v-col cols="4">
        <v-row>
          <v-col>O</v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-btn color="primary" text @click="chooseGuest">Continúa como invitado</v-btn>
          </v-col>
          <span class="text--secondary caption">Tendrás que introducir una cuenta de correo válida</span>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="6">
        <v-text-field
          label="Dirección de correo"
          v-model="mail"
          type="mail" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      guest: false,
      mail: null
    }
  },
  watch: {
    mail () {
      if (this.validMail)
        this.$store.commit('updateMail', this.mail)
    }
  },
  computed: {
    validMail () {
      const RegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      console.log(this.mail, this.mail.match(RegEx))
      return this.mail.match(RegEx)
    }
  },
  methods: {
    chooseGuest () {
      this.guest = true
    },
    chooseLogin () {
      this.$store.commit('updateRoute', this.$route.path)
      this.$router.push('/login')
    }
  }

}
</script>