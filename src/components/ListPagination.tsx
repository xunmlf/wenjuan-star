import { FC, useEffect, useState } from 'react'

import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constant'

import type { PaginationProps } from 'antd'

type PropsType = {
  total: number
}

const showTotal: PaginationProps['showTotal'] = total => `问卷总数: ${total}`
const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  const [searchParams] = useSearchParams()

  // 通过改变url 参数来改变分页
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '1') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '10') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  // 通过分页改变url 参数，实现分页
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handelChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    // console.log(searchParams.toString())

    navigate({
      pathname,
      search: searchParams.toString()
    })
  }

  return (
    <div>
      <Pagination
        align='center'
        current={current}
        total={total}
        pageSize={pageSize}
        showTotal={showTotal}
        onChange={handelChange}
      ></Pagination>
    </div>
  )
}

export default ListPagination
