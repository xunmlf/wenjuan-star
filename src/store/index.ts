import { configureStore } from '@reduxjs/toolkit'

import userReducer, { UserStateType } from './modules/user'

export type storeType = {
  user: UserStateType
}
export const store = configureStore({
  reducer: {
    // 分模块
    // counter: counterReducer,
    user: userReducer
  }
})
