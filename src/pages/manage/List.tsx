import { FC, useEffect, useRef, useState } from 'react'
import style from './Common.module.scss'

import QuestionCard from '../../components/QuestionCard'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'

import { useTitle, useDebounceFn, useRequest } from 'ahooks'

import { getQuestionListService } from '../../services/question'
import { useSearchParams } from 'react-router-dom'

import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('小慕问卷-我的问卷')

  // const { data, loading } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data || {}

  const [started, setStarted] = useState(false)

  const [page, setPage] = useState(1)

  const [list, setList] = useState([])

  const [total, setTotal] = useState(0)

  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()

  const containerRef = useRef<HTMLDivElement>(null)

  // keyword 变化时，重置信息
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  }, [keyword])

  /**
   * @description  加载数据的函数
   * @param {type}
   * @returns {run:Function} run: 加载数据的触发器
   * */
  const { run: load, loading } = useRequest(
    async () => {
      const res = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE, //每次加载数量：默认10
        keyword
      })
      return res
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) // 累计
        setTotal(total)
        setPage(page + 1)
      }
    }
  )

  /**
   * 滑动就执行刷新函数，满足条件就触发加载函数
   * @see https://ahooks.js.org/zh-CN/hooks/use-debounce-fn
   * @returns {run: Function} run: 防抖函数的触发器
   * */
  const { run: landMore } = useDebounceFn(
    () => {
      const elem = containerRef.current // 获取当前元素
      if (!elem) return
      const domRef = elem.getBoundingClientRect() // 获取元素的大小及其相对于视口的位置
      if (domRef === null) return
      const { bottom } = domRef // 获取元素的底部
      // 当元素底部小于视口高度+100时，触发加载更多
      if (bottom < document.documentElement.clientHeight + 100) {
        // 满足条件就触发加载函数
        load()
        setStarted(true)
      }

      console.log('触发加载更多')
    },
    {
      wait: 200
    }
  )

  //   什么时候触发加载更多
  // 1 当页面加载，或者URL参数（keyword）变化时，触发加载
  useEffect(() => {
    // 触发加载
    landMore()
  }, [searchParams, landMore])

  // 2 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', landMore)
    }

    return () => {
      // 事件解绑，避免内存泄漏
      window.removeEventListener('scroll', landMore)
    }
  }, [haveMoreData, searchParams])

  const LoadMoreContentElem = () => {
    // 1. 未加载、正在加载，显示 Spin
    if (!started || loading) return <Spin />
    // 2. 加载完成，无数据，显示 Empty
    if (total === 0) return <Empty description='暂无数据' />
    // 3. 拉到底部
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }

  return (
    <div>
      <div className={style.header}>
        <div className={style.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={style.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={style.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={style.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </div>
  )
}
export default List
