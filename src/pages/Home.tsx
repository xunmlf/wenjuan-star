import { FC, useState, useEffect, use } from 'react'

import { Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME, MANAGE_LIST_PATHNAME } from '../router'
import styles from './Home.module.scss'

import axios from 'axios'
import useGetUserInfo from '../hooks/useGetUserInfo'
const { Title, Paragraph } = Typography

const Home: FC = () => {
  useEffect(() => {
    axios.get('/api/test').then(res => {
      console.log(res)
    })
  }, [])

  const [pathname, setPathname] = useState('/')
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME)
    } else {
      setPathname(LOGIN_PATHNAME)
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100000+，发布问卷 10000+，收到答卷 10000000+</Paragraph>
        <div>
          <Link to={pathname}>
            <Button type='primary'>开始使用</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
