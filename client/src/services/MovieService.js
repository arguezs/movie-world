import Api from './Api'

export default {
  fetch (movieId) {
    if (movieId) {
      return Api().get(`movies/${movieId}`)
    }
    return Api().get(`movies`)
  },
  fetchListing () {
    return Api().get('movie-listing')
  },
  post (movie) {
    return Api().post('movies', movie)
  }
}