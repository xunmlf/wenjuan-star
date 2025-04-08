import { configureStore } from '@reduxjs/toolkit'

import userReducer, { UserStateType } from './modules/user'

import componentsReducer, { ComponentsStateType } from './componentsReducer'

export type storeType = {
  user: UserStateType
  components: ComponentsStateType
}

export const store = configureStore({
  reducer: {
    // 分模块
    // counter: counterReducer,
    user: userReducer,
    components: componentsReducer
  }
})
