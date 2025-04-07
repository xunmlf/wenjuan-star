import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'antd'

import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const { pathname } = useLocation()

  // 获取查询参数
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const searchValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setSearchValue(searchValue)
  }, [searchParams])

  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  const onSearch = (value: string) => {
    // console.log(value)
    navigate({
      pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  return (
    <div>
      <Search
        placeholder='请输入关键字'
        value={searchValue}
        allowClear
        size='large'
        onChange={handelChange}
        onSearch={onSearch}
        style={{ width: '260px' }}
      />
    </div>
  )
}

export default ListSearch
