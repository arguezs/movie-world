// Initial state
const state = () => ({
  step: 1,
  mail: null,
  price: 0,
  seats: []
})

// Getters
const getters = {
  seatIds: state => state.seats.map(seat => seat.id)
}

 // Actions
 const actions = {
   resetTransaction (context) {
    context.state = context.rootState
   }
 }

// Mutations
const mutations = {
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