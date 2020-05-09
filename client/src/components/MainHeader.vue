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

  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>