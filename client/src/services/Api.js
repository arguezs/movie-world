import Axios from 'axios'

export default () => {
    return Axios.create({
        baseURL: 'http://localhost:8081/'
    })
}
