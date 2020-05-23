<template>
  <v-container>
    <v-btn @click="loadTransactions">
      <v-icon>autorenew</v-icon>
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :loading="loadingState"
      show-expand
      single-expand
      :expanded.sync="expanded" >

      <template v-slot:item.user="{ item }">
        <span v-if="item.User">{{ item.User.mail }}</span>
        <span v-else>{{ item.guest }}</span>
      </template>

      <template v-slot:item.type="{ item }">
        <span v-if="item.User">Usuario</span>
        <span v-else>Anónimo</span>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="px-0">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <th>Sala</th>
                <th>Asiento</th>
              </thead>

              <tbody>
                <tr v-for="seat in item.Seats" :key="seat.seat">
                  <td>Sala {{ seat.Row.TheaterId }}</td>
                  <td>{{ seat.Row.row }}-{{ seat.seat }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import TransactionService from '@/services/TransactionService'

export default {
  data () {
    return {
      expanded: [],
      headers:[
        { text: 'Transacción', value: 'id' },
        { text: 'Dirección de correo', value: 'user' },
        { text: 'Tipo', value: 'type' },
        { text: 'Sesión', value: 'SessionId' },
        { text: 'Total', value: 'total'},
        { text: '', value: 'data-table-expand' },
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