import Axios from 'axios'

export default () => {
    const Api = Axios.create({
        baseURL: '/api/'
    })

    Api.defaults.withCredentials = true

    return Api
}
