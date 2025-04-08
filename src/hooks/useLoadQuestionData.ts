import { useParams } from 'react-router-dom'

import { getQuestionService } from '../services/question'

import { useRequest } from 'ahooks'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
export default function useLoadQuestionData() {
  //   const { id = '' } = useParams()
  const { questionId = '' } = useParams()
  const dispatch = useDispatch()
  //   console.log(id)

  // ajax 加载数据
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('id is required')
      const res = await getQuestionService(id)
      //   console.log('result', res)
      return res
    },
    {
      manual: true
    }
  )

  // 根据 获取的data  设置 redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    // 把 componentList 传给 redux store
    dispatch(resetComponents({ componentList }))
  }, [data])

  // 判断id 变化 ，执行ajax 加载问卷数据
  useEffect(() => {
    run(questionId)
  }, [questionId])

  return {
    loading,
    error
  }
}
