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
  seleceId: string // 当前选中的组件id
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentsStateType = {
  seleceId: '',
  componentList: []
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, actions) => {
      state.componentList = actions.payload.componentList
      state.seleceId = actions.payload.seleceId
    },
    //  设置选中的组件id
    changeSelectedId: (state: ComponentsStateType, actions) => {
      state.seleceId = actions.payload
    },

    // 添加新组件
    addConpnenet: (state: ComponentsStateType, actions) => {
      const newComponent = actions.payload

      const { componentList, seleceId } = state

      const index = componentList.findIndex(c => c.fe_id === seleceId)

      if (index < 0) {
        // 未选中任何组件，直接在组件列表末尾添加新组件
        state.componentList.push(newComponent)
      } else {
        // 在当前选中的组件后面插入新的组件
        state.componentList.splice(index + 1, 0, newComponent)
      }
      // 更新选中的组件id
      state.seleceId = newComponent.fe_id
    }
  }
})

export const { resetComponents, changeSelectedId, addConpnenet } = componentsSlice.actions
export default componentsSlice.reducer
