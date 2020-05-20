import AuthenticationService from '@/services/AuthenticationService'

// Initial state
const state = () => null

// Mutations
const mutations = {
  updateUser (state) {
    AuthenticationService.getUserData()
      .then(user => {
        state.user = user.data.name ? user.data.name : user.data.mail
      })
      .catch(() => {
        state.user = null
      })
  }
}

export default {
  state,
  mutations
}