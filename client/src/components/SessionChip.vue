<template>
  <v-chip>
    {{dateString}}
  </v-chip>
</template>

<script>
export default {
  props: {
    session: {}
  },
  computed: {
    dateString: function () {
      const date = new Date(this.session.date)
      return (date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short'
      }) + ' - ' + date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
      })).toUpperCase()
    }
  }
}
</script>

<style>

</style>