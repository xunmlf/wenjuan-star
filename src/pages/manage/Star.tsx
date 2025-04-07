import { FC } from 'react'
import style from './Common.module.scss'

import QuestionCard from '../../components/QuestionCard'

import { Typography, Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'

import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

import ListPagination from '../../components/ListPagination'

import { useTitle } from 'ahooks'
const { Title } = Typography

const Star: FC = () => {
  useTitle('小慕问卷-星标问卷')
  const { data, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data || {}
  return (
    <div>
      <div className={style.header}>
        <div className={style.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={style.right}>
          <ListSearch />
        </div>
      </div>
      <div className={style.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin size='large' />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description='暂无数据' />}
        {!loading &&
          list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question}></QuestionCard>
          })}
      </div>
      <div className={style.footer}>
        {!loading && list.length > 0 && <ListPagination total={total} />}
      </div>
    </div>
  )
}
export default Star
