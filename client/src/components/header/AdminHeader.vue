<template>
  <v-toolbar dense>
    <v-toolbar-items>
      <v-btn
        text
        exact
        :to="{name: 'Movies'}">Películas</v-btn>
      <v-btn
        text
        exact
        :to="{name: 'Sessions'}">Sesiones</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>