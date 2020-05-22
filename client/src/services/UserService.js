import Api from './Api'

export default {
  register (user) {
    return Api().post('register', user)
  },

  updateProfile (user) {
    return Api().put('user', user)
  },

  fetchUsers () {
    return Api().get('user-list')
  },

  deleteUser (userId) { return Api().delete(`user/${userId}`) },

  makeAdmin (userId) { return Api().get(`user/${userId}/make-admin`) }
}