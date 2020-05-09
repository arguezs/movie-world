<template>
  <v-container>
    <v-toolbar-title flat>Perfil</v-toolbar-title>

    <v-form>
      
      <v-row align="center">
        <v-col cols="1">Nombre:</v-col>
        <v-col>
          <v-text-field v-model="user.name" />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="1">Correo:</v-col>
        <v-col>
          <v-text-field v-model="user.mail" />
        </v-col>
      </v-row>

    </v-form>
  </v-container>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>

</style>