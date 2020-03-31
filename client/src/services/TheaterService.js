import Api from './Api'

export default {
  fetchTheater (theaterId) {
    return Api().get(`seats/${theaterId}`)
  }
}