<template>
  <v-container>
    <v-row>
      <v-col cols="auto">{{ session.time.substring(0,5) }}</v-col>
      <v-col>{{ session.Movie.title }}</v-col>
      <v-col cols="auto">
        <v-btn
          outlined small
          color="error"
          :disabled="disabled"
          @click="deleteSession">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SessionService from '@/services/SessionService'

export default {
  props: { session: Object },
  methods: {
    async deleteSession () {
      const confirm = window.confirm('¿Deseas eliminar esta sesión?')

      if (confirm) {
        await SessionService.remove(this.session.id)

        this.$emit('resync-sessions')
      }
    }
  },
  computed: {
    disabled () {
      const sessionDate = new Date(this.session.date + ' ' + this.session.time)
      return sessionDate.getTime() < Date.now() || this.session.transactionCount > 0
    }
  }
}
</script>

<style>

</style>