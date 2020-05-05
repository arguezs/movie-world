import Api from './Api'

export default {
  register (user) {
    return Api().post('register', user)
  }
}