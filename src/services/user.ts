import request from './request'

import { ResDataType } from './request'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = `/api/user/info`
  const data = (await request.get(url)) as ResDataType
  return data
}

// 登陆
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = `/api/user/login`
  const data = (await request.post(url, { username, password })) as ResDataType
  return data
}

// 注册
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = `/api/user/register`
  const data = (await request.post(url, { username, password, nickname })) as ResDataType
  return data
}
