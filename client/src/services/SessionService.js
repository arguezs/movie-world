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
  },
  fetchWithDayAndTheater (date, theaterId) {
    return Api().get(`sessions/${date}/${theaterId}`)
  },
  remove (sessionId) {
    return Api().delete(`session/${sessionId}`)
  },
  fetchData (sessionId) {
    return Api().get(`session-data/${sessionId}`)
  }
}