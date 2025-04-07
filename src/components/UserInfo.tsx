import { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router'
import { removeToken } from '../utils/user-token'

import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'

import { logoutReducer } from '../store/modules/user'
const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)

  // const { nickname, username } = data || {}

  const { username, nickname } = useGetUserInfo()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutReducer())
    removeToken()
    message.success('退出成功')
    navigate('/login')
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type='link' onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}
export default UserInfo
