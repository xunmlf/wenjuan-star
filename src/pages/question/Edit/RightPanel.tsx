import { FC } from 'react'

import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabsItem = [
    {
      key: 'prop',
      label: <span>属性</span>,
      icon: <FileTextOutlined />,
      children: <ComponentProp />
    },
    {
      key: 'setting',
      label: <span>页面设置</span>,
      icon: <SettingOutlined />,
      children: <div>页面设置</div>
    }
  ]
  return (
    <div>
      <Tabs items={tabsItem} defaultActiveKey='prop'></Tabs>
    </div>
  )
}
export default RightPanel
