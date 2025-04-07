import { getQuestionListService } from '../services/question'
import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  STAT_PAGE_SIZE
} from '../constant'

type SearchOption = {
  isStar?: boolean
  isDeleted?: boolean
}

export default function useLoadQuestionListData(opt: Partial<SearchOption> = {}) {
  const [searchParams] = useSearchParams()

  const { isStar, isDeleted } = opt
  async function getQuestionListData() {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '1') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '10') || STAT_PAGE_SIZE

    const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
    return data
  }

  const { loading, data, error, refresh } = useRequest(getQuestionListData, {
    refreshDeps: [searchParams] // 刷新依赖项
  })

  return {
    data,
    loading,
    error,
    refresh
  }
}
