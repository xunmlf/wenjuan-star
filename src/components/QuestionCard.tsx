import { FC, useState } from 'react'
import style from './QuestionCard.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { Space, Button, Divider, Tag, Popconfirm, message, Modal } from 'antd'

import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

import {
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
  BarChartOutlined,
  CopyOutlined
} from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props

  const [isStarState, setIsStarState] = useState(false)
  const navigator = useNavigate()

  const [isDeleted, setIsDeleted] = useState(false)

  // 设置标星
  const { run: handelChange, loading: changeLoad } = useRequest(
    async () => {
      const res = await updateQuestionService(_id, { isStar: !isStarState })
      return res
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState)
        if (isStarState) {
          message.success('取消标星成功')
        }
        if (!isStarState) {
          message.success('标星成功')
        }
      }
    }
  )

  // 复制问卷
  const { run: handelCopyRun, loading: copyLoad } = useRequest(
    async () => {
      const res = await duplicateQuestionService(_id)
      // console.log('data', res)

      return res
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        // console.log('res', res)

        message.success('复制成功')
        navigator(`/question/edit/${res.id}`)
      },
      onError: () => {
        message.error('复制失败')
      }
    }
  )

  // 删除问卷
  const { run: handelDeleteRun, loading: deleteLoad } = useRequest(
    async () => {
      const res = await updateQuestionService(_id, { isDeleted: true })
      return res
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        setIsDeleted(true)
      }
    }
  )

  const handelDeleteCancel = () => {
    message.info('取消删除')
  }

  const handelCopy = () => {
    confirm({
      title: '确定要复制吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        handelCopyRun()
      },
      onCancel() {
        message.info('取消复制')
      }
    })
  }

  if (isDeleted) {
    return null
  }

  return (
    <div className={style.contner}>
      <div className={style.title}>
        <div className={style.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            {isStarState && <StarOutlined style={{ color: 'red' }} />}

            {title}
          </Link>
        </div>
        <div className={style.right}>
          <Space>
            {isPublished ? <Tag color='green'>已发布</Tag> : <Tag color='red'>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>创建时间: {createdAt}</span>
          </Space>
          <span>{isStar}</span>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={style['button-contanier']}>
        <div className={style.left}>
          <Space>
            <Button type='text' size='small' icon={<EditOutlined />}>
              编辑问卷
            </Button>
            <Button type='text' size='small' icon={<BarChartOutlined />}>
              数据统计
            </Button>
          </Space>
        </div>

        <div className={style.right}>
          <Space>
            <Button
              type='text'
              size='small'
              icon={<StarOutlined />}
              onClick={handelChange}
              disabled={changeLoad}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Button
              type='text'
              size='small'
              icon={<CopyOutlined />}
              onClick={handelCopy}
              disabled={copyLoad}
            >
              复制
            </Button>

            <Popconfirm
              title='确定该删除吗？'
              okText='确定'
              cancelText='取消'
              onCancel={handelDeleteCancel}
              onConfirm={handelDeleteRun}
              disabled={deleteLoad}
            >
              <Button type='text' size='small' icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
