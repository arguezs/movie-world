import Api from './Api'

export default {
  fetch (movieId) {
    return Api().get(`session/${movieId}`)
  },
  post (session) {
    return Api().post('session', session)
  },
  fetchSeats (sessionId) {
    return Api().get(`session/${sessionId}/seats`)
  }
}