import axios from 'axios'

const api = axios.create({
    // baseURL : 'https://bookingtravel-backend-side.onrender.com/api',
    baseURL : 'http://localhost:4000/api',
    withCredentials: true, // Include credentials in the requests
})

export default api