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
  fetchNextReleases () {
    return Api().get('next-releases')
  },
  post (movie) {
    return Api().post('movies', movie, { headers: { 'Content-Type': 'multipart/form-data' }})
  },
  fetchMovieStats () {
    return Api().get('movie-stats')
  }
}