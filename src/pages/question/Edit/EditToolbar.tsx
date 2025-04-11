import { FC } from 'react'

import { Button, Space, Tooltip } from 'antd'

import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined
} from '@ant-design/icons'
import { deleteSelectedComponent, hideSelectedComponent } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  // 删除
  const handelDelete = () => {
    // console.log('删除')
    dispatch(deleteSelectedComponent())
  }
  // 隐藏
  const handleHide = () => {
    console.log('隐藏')
    dispatch(hideSelectedComponent())
  }

  return (
    <div>
      <Space>
        <Tooltip title='删除'>
          <Button
            shape='circle'
            type='link'
            icon={<DeleteOutlined />}
            onClick={handelDelete}
          ></Button>
        </Tooltip>
        <Tooltip title='隐藏'>
          <Button shape='circle' type='link' icon={<EyeInvisibleOutlined />} onClick={handleHide} />
        </Tooltip>

        <Tooltip title='锁定'>
          <Button shape='circle' icon={<LockOutlined />} />
        </Tooltip>
        <Tooltip title='复制'>
          <Button shape='circle' type='link' icon={<CopyOutlined />} />
        </Tooltip>
        <Tooltip title='粘贴'>
          <Button shape='circle' type='link' icon={<BlockOutlined />} />
        </Tooltip>

        <Tooltip title='上移'>
          <Button shape='circle' type='link' icon={<UpOutlined />} />
        </Tooltip>
        <Tooltip title='下移'>
          <Button shape='circle' type='link' icon={<DownOutlined />} />
        </Tooltip>

        <Tooltip title='撤销'>
          <Button shape='circle' type='link' icon={<UndoOutlined />} />
        </Tooltip>
        <Tooltip title='重做'>
          <Button shape='circle' type='link' icon={<RedoOutlined />} />
        </Tooltip>
      </Space>
    </div>
  )
}

export default EditToolbar
