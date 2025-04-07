import { FC } from 'react'

import QuestionInput from '../../../components/Question/QuestionInput/Component'

import QuestionTitle from '../../../components/Question/QuestionTitle/Component'

import styles from './EditCavas.module.scss'
const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.components}>
          <QuestionTitle />
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.components}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}
export default EditCanvas
