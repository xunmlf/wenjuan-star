const KEY = 'user-token'

// 获取token
export function getToken() {
  return localStorage.getItem(KEY)
}

// 设置token
export function setToken(token: string) {
  return localStorage.setItem(KEY, token)
}

// 删除token
export function removeToken() {
  return localStorage.removeItem(KEY)
}
