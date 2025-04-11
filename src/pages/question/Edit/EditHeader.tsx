import { FC } from 'react'

import styles from './EditHeader.module.scss'
import { Space, Button, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'

const { Title } = Typography
const EditHeader: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type='link' icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.center}>
          <EditToolbar></EditToolbar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type='primary'>发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
