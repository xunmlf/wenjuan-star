import { FC, useState } from 'react'
import style from './Common.module.scss'

import { Typography, Empty, Table, Tag, Space, Button, Modal, message, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'

import { updateQuestionService, deleteQuestionService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

import ListPagination from '../../components/ListPagination'
import { useTitle, useRequest } from 'ahooks'

const { Title } = Typography

const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小慕问卷-回收站')
  const { data, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data || {}

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const questionColumns = [
    {
      title: '问卷名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color='green' key='isPublished'>
            已发布
          </Tag>
        ) : (
          <Tag color='red' key='isPublished'>
            未发布
          </Tag>
        )
      }
    },
    {
      title: '是否星标',
      dataIndex: 'isStar',
      key: 'isStar',
      render: (isStar: boolean) =>
        isStar ? (
          <Tag color='success' key='isStar'>
            星标
          </Tag>
        ) : (
          <Tag color='gray' key='isStar'>
            未星标
          </Tag>
        )
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
      key: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt'
    }
  ]

  const { run: deleteConfirmRun } = useRequest(
    async () => {
      const res = await deleteQuestionService(selectedIds)
      return res
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([]) // 清空选中
      }
    }
  )

  const deleteQuestions = () => {
    confirm({
      title: '是否要删除问卷？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteConfirmRun()
      },
      onCancel() {
        message.info('取消删除')
      }
    })
  }

  const { run: restoreQuestionsRun } = useRequest(
    async () => {
      for (const _id of selectedIds) {
        const res = await updateQuestionService(_id, { isDeleted: false })
        return res
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([]) // 清空选中
      }
    }
  )
  const restoreQuestions = () => {
    confirm({
      title: '是否要恢复问卷？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        restoreQuestionsRun()
      },
      onCancel() {
        message.info('取消恢复')
      }
    })
  }

  const tableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type='primary' disabled={selectedIds.length === 0} onClick={restoreQuestions}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={deleteQuestions}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        columns={questionColumns}
        dataSource={list}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          }
        }}
      />
    </>
  )
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
        {!loading && list.length > 0 && tableElement}
      </div>
      <div className={style.footer}>
        {!loading && list.length > 0 && <ListPagination total={total} />}
      </div>
    </div>
  )
}
export default Trash
