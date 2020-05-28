<template>
  <v-container>
    <v-card max-width="30vw" class="mx-auto my-6">
      <v-card-title>Recuperar contraseña</v-card-title>

      <v-card-subtitle>Introduce tu dirección de correo y te mandaremos un enlace para reestablecer tu contraseña.</v-card-subtitle>

      <v-card-text>
        <v-text-field label="Dirección de correo" v-model="mail" />
      </v-card-text>

      <v-card-actions>
        <v-btn class="mx-auto mb-3">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      mail: null
    }
  }
}
</script>