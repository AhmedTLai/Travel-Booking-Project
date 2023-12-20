import axios from 'axios'

const api = axios.create({
    baseURL : 'https://bronze-scallop-toga.cyclic.app/api',
    // baseURL : 'http://localhost:4000/api',
    withCredentials: true, // Include credentials in the requests
})

export default api
