import axios from 'axios'
import store from '@/store'

const ins = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:9090' : 'https://udkisangel.ml/blog-api',
  timeout: 1000 * 10
})

ins.interceptors.request.use(config => {
  config.headers.common['Authorization'] = `Bearer ${store.state.token}`

  return config
})

export default ins