<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loadingState"
      loading-text="Cargando usuarios...">

      <template v-slot:item.name="{ item }"> {{ item.name || 'N/A' }}</template>

    </v-data-table>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService'

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
  },
  mounted () {
    const vue = this

    UserService.fetchUsers()
      .then(users => { vue.users = users.data })
      .catch(() => { vue.error = true })
      .finally(() => { vue.loadingState = false })
  }
}
</script>