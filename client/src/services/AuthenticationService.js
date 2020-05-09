import Api from './Api'

export default {
  login (user) {
    return Api().post('login', user)
  },

  getUserData () {
    return Api().get('user')
  },

  logout () {
    return Api().get('logout')
  }
}