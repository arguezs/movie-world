import Api from './Api'

export default {
  fetch (movieId) {
    if (movieId) {
      return Api().get(`movies/${movieId}`)
    }
    return Api().get(`movies`)
  },
  post (movie) {
    return Api().post('movies', movie)
  }
}