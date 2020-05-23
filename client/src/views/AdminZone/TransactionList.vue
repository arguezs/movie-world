<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :loading="loadingState">
    </v-data-table>
  </v-container>
</template>

<script>
import TransactionService from '@/services/TransactionService'

export default {
  data () {
    return {
      headers:[
        { text: 'Transacción', value: 'id' },
        { text: 'Dirección de correo', value: 'user' },
        { text: 'Tipo', value: 'type' },
        { text: 'Sesión', value: 'SessionId' }
      ],
      transactions: [],
      loadingState: true
    }
  },
  mounted () { this.loadTransactions() },
  methods: {
    loadTransactions () {
      const vue = this
      this.loadingState = true

      TransactionService.fetchAll()
        .then(transactions => { vue.transactions = transactions.data })
        .catch(() => { vue.error = true })
        .finally(() => { vue.loadingState = false })
    }
  }
}
</script>