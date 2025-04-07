import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_LIST_PATHNAME
} from '../router'
function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // 如果正在等待用户数据，不进行导航
    if (waitingUserData) return

    // 如果是不需要用户信息的页面（如 404），直接返回
    if (isNoNeedUserInfo(pathname)) return

    if (username) {
      // 已登录用户访问登录/注册页面时，重定向到管理列表页
      if (isLoginOrRegister(pathname)) {
        navigate(MANAGE_LIST_PATHNAME)
      }
    } else {
      // 未登录用户访问需要登录的页面时，重定向到登录页
      navigate(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname, navigate])
}
export default useNavPage
