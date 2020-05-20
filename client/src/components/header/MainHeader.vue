<template>
  <v-app-bar app>
    <user-header />

    <admin-header v-if="isAdmin" />
  </v-app-bar>
</template>

<script>
import UserHeader from './UserHeader'
import AdminHeader from './AdminHeader'

export default {
  name: 'MainHeader',
  components: { UserHeader, AdminHeader },
  computed: {
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  }
}
</script>