// Initial state
const getDefaultState = () => ({
  step: 1,
  mail: null,
  price: 0,
  seats: []
})

const state = getDefaultState()

// Getters
const getters = {
  seatIds: state => state.seats.map(seat => seat.id)
}

 // Actions
 const actions = {
   resetTransactionState ({ commit }) {
    commit('resetState')
   }
 }

// Mutations
const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  updatePrice (state, price) {
    state.price = price
  },

  updateMail (state, mail) {
    state.mail = mail
  },

  updateRoute (state, route) {
    state.route = route
  },

  addSeat (state, seat) {
    state.seats.push(seat)
  },
  removeSeat (state, id) {
    state.seats = state.seats.filter(seat => seat.id != id)
  },

  stepUp (state) {
    state.step += 1
  },
  stepDown (state) {
    state.step -= 1
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}