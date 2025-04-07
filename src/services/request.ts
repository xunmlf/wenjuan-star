import axios, { AxiosResponse } from 'axios'

import { message } from 'antd'
import { getToken } from '../utils/user-token'

const request = axios.create({})

// 请求拦截
request.interceptors.request.use(
  config => {
    // 统一设置请求头
    // config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${getToken()}`

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 相应 拦截器。统一处理
request.interceptors.response.use((res: AxiosResponse) => {
  const resData = (res.data || {}) as ResType

  const { errno, data, msg } = resData

  // 处理错误
  if (errno !== 0) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  // 修改返回值，直接返回到res 对象中
  res.data = data

  return res.data as any
})

export default request

export interface ResType {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  // 键必须是字符串，  value 可以是任意类型
  [key: string]: any
}
