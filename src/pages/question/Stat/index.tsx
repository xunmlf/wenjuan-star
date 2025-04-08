import { FC } from 'react'

import useQuestionData from '../../../hooks/useLoadQuestionData'
const Stat: FC = () => {
  const { loading } = useQuestionData()
  return (
    <div>
      <div>stat</div>
      <div>{loading ? <p>loading...</p> : <p></p>}</div>
    </div>
  )
}
export default Stat
