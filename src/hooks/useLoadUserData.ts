import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/modules/user'

export default function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)

  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: res => {
      const { username, nickname } = res
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })
  // 从redux中获取用户信息,判断是否已经有了用户数据
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }

    run()
  }, [username])
  return { waitingUserData }
}
