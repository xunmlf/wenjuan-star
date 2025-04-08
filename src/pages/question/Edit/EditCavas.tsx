import { FC } from 'react'

import styles from './EditCavas.module.scss'
import { Spin } from 'antd'

import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import { ComponentInfoType } from '../../../store/componentsReducer'

type propsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)

  if (!componentConf) return null
  const { Component } = componentConf

  return <Component {...props} />
}

const EditCanvas: FC<propsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()

  console.log('componentList', componentList)

  if (loading) {
    return (
      <div>
        <Spin></Spin>
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c

        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.components}>{getComponent(c)}</div>
          </div>
        )
      })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.components}>
          <QuestionTitle />
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.components}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  )
}
export default EditCanvas
