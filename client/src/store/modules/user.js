import AuthenticationService from '@/services/AuthenticationService'

// Initial state
const state = () => ({
  name: null,
  type: null
})

const getters = {
  isAuthenticated: state => state.name ? true : false,
  isAdmin: state => state.type === 'ADMIN'
}

// Mutations
const mutations = {
  updateUser (state) {
    AuthenticationService.getUserData()
      .then(user => {
        state.name = user.data.name ? user.data.name : user.data.mail
        state.type = user.data.role
      })
      .catch(() => {
        state.name = null
        state.type = null
      })
  }
}

export default {
  state,
  getters,
  mutations
}