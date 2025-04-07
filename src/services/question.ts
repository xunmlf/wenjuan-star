import request from './request'

import { ResDataType } from './request'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await request.get(url)) as ResDataType
  return data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await request.post(url)) as ResDataType
  return data
}

// 获取问卷列表
export async function getQuestionListService(opt: Partial<SearchOption>): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await request.get(url, { params: opt })) as ResDataType
  return data
}

// 更新单个问卷 -标星 - 假删除
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const res = (await request.patch(url, opt)) as ResDataType
  return res
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const res = (await request.post(url)) as ResDataType
  return res
}

// 批量彻底删除
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = `/api/question`
  const res = (await request.delete(url, { data: { ids } })) as ResDataType
  return res
}
