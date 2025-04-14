// 添加快捷键

import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
  selectPrevComponent,
  selectNextComponent
} from '../store/componentsReducer'

function isActiveElement() {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true

  return false
}
export default function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除快捷键
  useKeyPress(['delete', 'backspace'], () => {
    if (!isActiveElement()) return
    // console.log('Backspace')
    // 删除选中的组件
    dispatch(deleteSelectedComponent())
  })

  // 复制快捷键
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElement()) return
    // console.log('ctrl+c')
    // 复制选中的组件`
    dispatch(copySelectedComponent())
  })

  // 粘贴快捷键
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElement()) return
    // console.log('ctrl+v')
    // 粘贴选中的组件
    dispatch(pasteSelectedComponent())
  })
  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElement()) return
    dispatch(selectPrevComponent())
  })
  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElement()) return
    dispatch(selectNextComponent())
  })
}
