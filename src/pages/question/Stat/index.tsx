import { FC } from 'react'

import useQuestionData from '../../../hooks/useQuestionData'
const Stat: FC = () => {
  const { loading, data } = useQuestionData()
  return (
    <div>
      <div>stat</div>
      <div>{loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}</div>
    </div>
  )
}
export default Stat
