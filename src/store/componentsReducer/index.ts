import { createSlice } from '@reduxjs/toolkit'

import { ComponentPropsType } from '../../components/QuestionComponents/index'

// 定义组件信息的类型
export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentsStateType = {
  componentList: []
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, actions) => {
      return actions.payload
    }
  }
})

export const { resetComponents } = componentsSlice.actions
export default componentsSlice.reducer
