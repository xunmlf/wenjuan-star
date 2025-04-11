import { ComponentInfoType } from '.'

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
