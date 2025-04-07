import { useParams } from 'react-router-dom'

import { getQuestionService } from '../services/question'

import { useRequest } from 'ahooks'
export default function useQuestionData() {
  const { questionId = '' } = useParams()

  //   const [questionData, setQuestionData] = useState({})
  //   const [loading, setLoading] = useState(true)

  //   // id变化时，加载数据
  //   useEffect(() => {
  //     const fn = async () => {
  //       const res = await getQuestionListService(questionId)
  //       setQuestionData(res)
  //       setLoading(false)
  //       console.log(res)
  //     }
  //     fn()
  //   }, [])

  async function getQuestionList() {
    const res = await getQuestionService(questionId)
    return res
  }
  const { loading, data, error } = useRequest(getQuestionList)

  return {
    loading,
    data,
    error
  }
}
