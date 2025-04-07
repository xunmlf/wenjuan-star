import { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import style from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'

import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'

import { createQuestionService } from '../services/question'

import { useRequest } from 'ahooks'
const ManageLayout: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // const [loading, setLoading] = useState(false)

  // const handleClick = async () => {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   // console.log(data)
  //   const { id } = data || {}

  //   if (id) {
  //     navigate(`/question/edit/${id}`)
  //     message.success('创建问卷成功')
  //   }
  //   setLoading(false)
  // }

  const { run: handleClick, loading } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: res => {
      navigate(`/question/edit/${res.id}`)
      message.success('创建问卷成功')
    }
  })

  return (
    <div className={style.container}>
      <div className={style.left}>
        <Space direction='vertical'>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            onClick={handleClick}
            disabled={loading}
          >
            新建问卷
          </Button>

          <Divider style={{ borderTop: 'transparent' }} />

          <Button
            type={pathname === '/manage/list' ? 'default' : 'text'}
            icon={<BarsOutlined />}
            size='large'
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>

          <Button
            type={pathname === '/manage/star' ? 'default' : 'text'}
            icon={<StarOutlined />}
            size='large'
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>

          <Button
            type={pathname === '/manage/trash' ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            size='large'
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>

      <div className={style.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
