<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loadingState"
      loading-text="Cargando usuarios...">

      <template v-slot:item.name="{ item }"> {{ item.name || 'N/A' }}</template>

      <template v-slot:item.actions="{ item }">

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon color="error" :disabled="item.role == 'ADMIN'" v-on="on">
              <v-icon>block</v-icon>
            </v-btn>
          </template>
          
          <span>Bloquear usuario</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon color="success" :disabled="item.role == 'ADMIN'" v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          
          <span>Hacer administrador</span>
        </v-tooltip>
            
      </template>
      
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