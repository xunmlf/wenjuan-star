import { ComponentInfoType, ComponentsStateType } from '.'

// 找到指定的位置
export function getNextSelectedComponentId(fe_id: string, componentList: ComponentInfoType[]) {
  // 过滤掉隐藏的组件
  const filteredComponentList = componentList.filter(c => !c.isHidden)
  // 找到当前选中组件的下标
  const index = filteredComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  let newSelectedId = ''
  const length = filteredComponentList.length

  if (length <= 1) {
    // 只有一个组件，删除就没有选中的组件了
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 删除的是最后一个组件，选中前一个
      newSelectedId = filteredComponentList[index - 1].fe_id
    } else {
      // 删除的是中间的组件，选中下一个
      newSelectedId = filteredComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

// 画布中添加组件
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const index = state.componentList.findIndex(c => c.fe_id === state.seleceId)
  if (index < 0) {
    // 未选中任何组件，则添加到组件列表中
    state.componentList.push(newComponent)
  } else {
    // 选中组件，则插入到选中组件后面
    state.componentList.splice(index + 1, 0, newComponent)
  }
  // 更新选中 id
  state.seleceId = newComponent.fe_id
}
