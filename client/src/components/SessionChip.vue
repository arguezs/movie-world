<template>
  <v-chip
    :to="{
      name: 'Session',
      params: {sessionId: session.id} }"
    :color="afterMidnight ? 'deep-purple darken-3' : ''"
    :dark="afterMidnight">
    {{timeString}}
  </v-chip>
</template>

<script>
export default {
  props: {
    session: {}
  },
  computed: {
    timeString () {
      return this.session.time.substring(0, 5)
    },
    afterMidnight () {
      return this.session.time.substring(0, 2) == '00'
    }
  }
}
</script>