import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:"https://bleep-server.onrender.com",
    withCredentials:true
})