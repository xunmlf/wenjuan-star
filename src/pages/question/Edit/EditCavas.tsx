import { FC, MouseEvent } from 'react'

import styles from './EditCavas.module.scss'
import { Spin } from 'antd'

import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

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
  const { componentList, seleceId } = useGetComponentInfo()

  const dispatch = useDispatch()

  console.log('componentList', componentList)

  if (loading) {
    return (
      <div>
        <Spin></Spin>
      </div>
    )
  }

  function hundleClick(e: MouseEvent, id: string) {
    e.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c

          // 拼接class类名
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === seleceId,
            [styles.locked]: isLocked
          })
          return (
            <div key={fe_id} className={wrapperClassName} onClick={e => hundleClick(e, fe_id)}>
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
