import Api from './Api'

export default {
  fetchAll (movieId) {
    return Api().get(`movies/${movieId}/sessions`)
  },
  post (session) {
    return Api().post('session', session)
  },
  fetchSeats (sessionId) {
    return Api().get(`session/${sessionId}/seats`)
  },
  fetchOne (sessionId) {
    return Api().get(`session/${sessionId}`)
  }
}