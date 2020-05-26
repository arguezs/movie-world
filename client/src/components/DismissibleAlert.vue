<template>
  <v-alert v-if="alert" v-model="state" dismissible
    class="mx-12 my-6" outlined dense
    :type="alert.success?'success':'error'">
    <slot v-if="alert.success" name="success"/>
    <slot v-else name="fail" />
    <slot />
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      state: true
    }
  },
  watch: {
    alert () { this.state = true }
  },
  props: ['alert']
}
</script>