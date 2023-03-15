import axios from 'axios'
import { Message } from 'element-ui'
// const isProd = process.env.NODE_ENV == 'production'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    Message(error)
    return Promise.reject(error)
  }
)
export default request
