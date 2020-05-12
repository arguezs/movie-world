import Api from './Api'

export default {
  register (user) {
    return Api().post('register', user)
  },

  updateProfile (user) {
    return Api().put('user', user)
  }
}