import { useSelector } from 'react-redux'

import { UserStateType } from '../store/modules/user'
import { storeType } from '../store'
function useGetUserInfo() {
  const { username, nickname } = useSelector<storeType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default useGetUserInfo
