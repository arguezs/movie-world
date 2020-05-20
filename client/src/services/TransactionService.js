import Api from './Api'

export default {
  create (transaction) {
    return Api().post('transaction', transaction)
  }
}