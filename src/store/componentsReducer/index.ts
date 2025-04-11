import { createSlice, current } from '@reduxjs/toolkit'

import { ComponentPropsType } from '../../components/QuestionComponents/index'
import { getNextSelectedComponentId } from './utils'

// 定义组件信息的类型
export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
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
    },
    // 修改组件属性
    changeComponentProps: (state: ComponentsStateType, actions) => {
      const { fe_id, newProps } = actions.payload

      const curComponent = state.componentList.find(c => c.fe_id === fe_id)
      if (curComponent) {
        curComponent.props = {
          ...curComponent.props,
          ...newProps
        }
      }
    },
    // 删除画布中选中的组件
    deleteSelectedComponent: state => {
      const { componentList, seleceId } = state
      // 找到删除后的选中组件id
      const newSelectedId = getNextSelectedComponentId(seleceId, componentList)
      const index = componentList.findIndex(c => c.fe_id === seleceId)
      if (index < 0) {
        return
      }
      componentList.splice(index, 1)
      state.seleceId = newSelectedId
    },
    // 隐藏/显示画布中选中的组件
    hideSelectedComponent: state => {
      const { componentList, seleceId } = state

      if (!seleceId) return
      const curComponent = componentList.find(c => c.fe_id === seleceId)
      if (!curComponent) return
      // 如果当前选中的组件存在，则切换其隐藏状态
      if (curComponent) {
        curComponent.isHidden = !curComponent.isHidden
      }
      // 从新计算 seleteId
      let newSelectedId = ''
      if (curComponent?.isHidden) {
        newSelectedId = getNextSelectedComponentId(seleceId, componentList)
      } else {
        newSelectedId = curComponent.fe_id
      }
    }
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addConpnenet,
  changeComponentProps,
  deleteSelectedComponent,
  hideSelectedComponent
} = componentsSlice.actions
export default componentsSlice.reducer
