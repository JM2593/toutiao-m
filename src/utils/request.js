import store from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // config 一定要返回，不然没有配置项
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
