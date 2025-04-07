import { createSlice } from '@reduxjs/toolkit'

// 定义用户信息的类型
export interface UserStateType {
  username: string
  nickname: string
}

const INIT_SATTE: UserStateType = {
  username: '',
  nickname: ''
}

// 创建一个用户切片
export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_SATTE,
  reducers: {
    loginReducer: (state: UserStateType, action) => {
      state.username = action.payload.username
      state.nickname = action.payload.nickname
      return state
    },
    // 登出
    logoutReducer: () => {
      return INIT_SATTE
    }
  }
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
