import Api from './Api'

export default {
  fetchTheater (theaterId) {
    return Api().get(`seats/${theaterId}`)
  },
  fetchTheaters() {
    return Api().get('theaters')
  }
}