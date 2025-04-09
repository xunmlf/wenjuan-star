import { FC } from 'react'

import styles from './index.module.scss'

import EditCavas from './EditCavas'

import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'

import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import LeftPanel from './LeftPanel'
const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  function clearSelected() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelected}>
            <div className={styles['canvas-wrapper']}>
              <EditCavas loading={loading}></EditCavas>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
