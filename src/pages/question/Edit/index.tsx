import { FC } from 'react'

import styles from './index.module.scss'

import EditCavas from './EditCavas'
// import useQuestionData from '../../../hooks/useQuestionData'
const Edit: FC = () => {
  // const { loading, data } = useQuestionData()

  return (
    <div className={styles.container}>
      <div>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>lift</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCavas></EditCavas>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
