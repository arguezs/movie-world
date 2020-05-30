<template>
  <v-toolbar dense color="secondary">
    <v-toolbar-title class="mr-6">Administración</v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        text exact
        :to="{name: 'Movies'}">Películas</v-btn>
      <v-btn
        text exact
        :to="{name: 'Sessions'}">Sesiones</v-btn>
      <v-btn
        text exact
        :to="{name: 'Movie Stats'}">Estadísticas</v-btn>
      <v-btn
        text exact
        :to="{name: 'User List'}">Usuarios</v-btn>
      <v-btn
        text exact
        :to="{name: 'Transaction List'}">Transacciones</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>