import { FC, useEffect, useState } from 'react'
import { Space } from 'antd'

import styles from './Logo.module.scss'

import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'

import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '../router'

// const { Title } = Typography
const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME)
    }
  }, [username])
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <div>
            <FormOutlined style={{ color: '#fff' }} />
          </div>
          <div style={{ color: '#fff' }}>小慕问卷</div>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
