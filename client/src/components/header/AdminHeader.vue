<template>

  <v-navigation-drawer v-model="drawerUpdate" absolute temporary right>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item>
          <v-btn text :to="{name: 'Movies'}">Películas</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text :to="{name: 'Sessions'}">Sesiones</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text :to="{name: 'Movie Stats'}">Estadísticas</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text :to="{name: 'User List'}">Usuarios</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text :to="{name: 'Transaction List'}">Transacciones</v-btn>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
  props: {drawer: Boolean},
  data () {
    return { drawerUpdate: this.drawer }
  },
  watch: {
    drawerUpdate () {
      this.$emmit('update:drawer', this.drawerUpdate)
    },
    drawer () {
      this.drawerUpdate = this.drawer
    }
  }
}
</script>
