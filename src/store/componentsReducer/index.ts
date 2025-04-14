import { createSlice } from '@reduxjs/toolkit'

import { ComponentPropsType } from '../../components/QuestionComponents/index'
import { getNextSelectedComponentId, insertNewComponent } from './utils'

import { nanoid } from 'nanoid'
import cloneDeep from 'lodash/clonedeep'

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
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  seleceId: '',
  componentList: [],
  copiedComponent: null
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

      // const { componentList, seleceId } = state

      insertNewComponent(state, newComponent)

      // const index = componentList.findIndex(c => c.fe_id === seleceId)

      // if (index < 0) {
      //   // 未选中任何组件，直接在组件列表末尾添加新组件
      //   state.componentList.push(newComponent)
      // } else {
      //   // 在当前选中的组件后面插入新的组件
      //   state.componentList.splice(index + 1, 0, newComponent)
      // }
      // // 更新选中的组件id
      // state.seleceId = newComponent.fe_id
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
    // 隐藏/显示画布中选中的组件  --- TODO 有bug
    hideSelectedComponent: state => {
      if (!state.seleceId) return

      const targetComponent = state.componentList.find(c => c.fe_id === state.seleceId)
      if (!targetComponent) return

      // 先切换隐藏状态
      targetComponent.isHidden = !targetComponent.isHidden

      // 重新计算 selectedId
      let newSelectedId = ''
      if (targetComponent.isHidden) {
        // 如果现在要隐藏，就找下一个可选的组件 id
        newSelectedId = getNextSelectedComponentId(state.seleceId, state.componentList)
      } else {
        // 如果当前要显示，就选中当前组件
        newSelectedId = targetComponent.fe_id
      }

      state.seleceId = newSelectedId
    },
    // 锁定/解锁画布中选中的组件
    lockSelectedComponent: state => {
      if (!state.seleceId) return
      const targetComponent = state.componentList.find(c => c.fe_id === state.seleceId)
      if (!targetComponent) return
      targetComponent.isLocked = !targetComponent.isLocked
    },
    // 复制
    copySelectedComponent: state => {
      if (!state.seleceId) return
      const selectComponent = state.componentList.find(c => c.fe_id === state.seleceId)
      if (!selectComponent) return
      // 复制当前选中的组件 -- 使用深拷贝
      state.copiedComponent = cloneDeep(selectComponent)
    },
    // 粘贴
    pasteSelectedComponent: state => {
      if (!state.copiedComponent) return
      // 修改 copiedComponent 的 fe_id -- 使用 nanoid
      state.copiedComponent.fe_id = nanoid()

      // 添加到组件列表中
      insertNewComponent(state, state.copiedComponent)
    }
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addConpnenet,
  changeComponentProps,
  deleteSelectedComponent,
  hideSelectedComponent,
  lockSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent
} = componentsSlice.actions
export default componentsSlice.reducer
