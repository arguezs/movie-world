<template>
  <v-container class="mt-6">
    
    <dismissible-alert :alert="alert" :max-width="maxWidth">
      <span slot="success">{{ successMsg }}</span>
      <span slot="fail">{{ failMsg }}</span>

      <ul v-if="alert && alert.invalid">
        <li v-for="message in alert.message" :key="message">{{message}}</li>
      </ul>
    </dismissible-alert>

    <v-card :max-width="maxWidth" class="mx-auto">
      <v-card-title>{{ formTitle }}</v-card-title>

      <v-card-subtitle>
        <slot name="subtitle" />
      </v-card-subtitle>

      <v-card-text>
        <slot />
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="mx-auto mb-3"
          :disabled="disabled"
          color="primary"
          :loading="loading"
          @click="submit">{{ submitText }}</v-btn>
      </v-card-actions>

      <slot name="extra" />

    </v-card>

  </v-container>
</template>

<script>
import DismissibleAlert from './DismissibleAlert'

export default {
  components: { DismissibleAlert },
  props: ['maxWidth', 'alert', 'successMsg', 'failMsg', 'formTitle', 'disabled',
  'loading', 'submitText'],
  methods: {
    submit () { this.$emit('submit') }
  }
}
</script>
