import { FC } from 'react'

import {
  componentConfGroup,
  ComponentConfigType
} from '../../../components/QuestionComponents/index'
import { Typography } from 'antd'
import styles from './CompomentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addConpnenet } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

function getComponent(c: ComponentConfigType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()
  function handelClick() {
    dispatch(
      addConpnenet({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProps
      })
    )
    // console.log('点击了', 111)
  }

  return (
    <div key={type} className={styles.warpper} onClick={handelClick}>
      <div className={styles.component}>
        <Component></Component>
      </div>
    </div>
  )
}
const ComponentLib: FC = () => {
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { components } = group
        return (
          <div key={group.groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {group.groupName}
            </Title>

            <div>{components.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
