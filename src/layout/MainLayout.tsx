import { Layout, Spin } from 'antd'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import style from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={style.header}>
        <div className={style.left}>
          <Logo />
        </div>
        <div className={style.right}>
          <UserInfo />
        </div>
      </Header>

      <Layout className={style.main}>
        <Content>{waitingUserData ? <Spin /> : <Outlet />}</Content>
      </Layout>

      <Footer className={style.footer}>小慕问卷 &copy; 2025 - present</Footer>
    </Layout>
  )
}
export default MainLayout
