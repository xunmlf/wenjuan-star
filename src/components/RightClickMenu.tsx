// components/RightClickMenu.tsx
import { Item, Menu, ItemParams } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  deleteSelectedComponent,
  hideSelectedComponent,
  lockSelectedComponent,
  pasteSelectedComponent
} from '../store/componentsReducer'
type Props = {
  id: string
}

const RightClickMenu = ({ id }: Props) => {
  const dispatch = useDispatch()
  const handleAction = ({ id, props }: ItemParams) => {
    // console.log('菜单项点击:', id)
    console.log('传入的组件数据:', props) // props.id 就是右键的组件id
    if (id === 'delete') {
      // dispatch(deleteComponent(props.id))
      //   console.log('删除组件: ', props.id)
      dispatch(deleteSelectedComponent())
    }
    if (id === 'lock') {
      dispatch(lockSelectedComponent())
    }
    if (id === 'hidden') {
      dispatch(hideSelectedComponent())
    }
    if (id === 'copy') {
      dispatch(copySelectedComponent())
    }
    if (id === 'paste') {
      dispatch(pasteSelectedComponent())
    }
  }

  return (
    <Menu id={id}>
      <Item id='lock' onClick={handleAction}>
        锁定
      </Item>
      <Item id='hidden' onClick={handleAction}>
        隐藏
      </Item>
      <Item id='delete' onClick={handleAction}>
        删除
      </Item>
      <Item id='copy' onClick={handleAction}>
        复制
      </Item>
      <Item id='paste' onClick={handleAction}>
        粘贴
      </Item>
    </Menu>
  )
}

export default RightClickMenu
