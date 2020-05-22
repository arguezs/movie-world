<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loadingState"
      loading-text="Cargando usuarios..."></v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Dirección de correo', value: 'mail' },
        { text: 'Tipo', value: 'role' },
        { text: 'Acciones', value: 'actions' }
      ],
      users: [],
      loadingState: true
    }
  }
}
</script>