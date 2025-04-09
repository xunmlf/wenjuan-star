import { FC } from 'react'

import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'

const LeftPanel: FC = () => {
  const tabsItem = [
    {
      key: 'componentLib',
      label: <span>组件库</span>,
      icon: <AppstoreOutlined />,
      children: <ComponentLib />
    },
    {
      key: 'layers',
      label: <span>图层</span>,
      icon: <BarsOutlined />,
      children: <div>图层</div>
    }
  ]
  return (
    <div>
      <Tabs items={tabsItem} defaultActiveKey='componentLib'></Tabs>
    </div>
  )
}
export default LeftPanel
