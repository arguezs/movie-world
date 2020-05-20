<template>
  <div>
    <user-header />

    <admin-header v-if="isAdmin" />
  </div>
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