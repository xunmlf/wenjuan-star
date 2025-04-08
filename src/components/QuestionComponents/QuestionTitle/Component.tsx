import { FC } from 'react'

import { Typography } from 'antd'

import { QuestionTitleDefaultPropsType, QuestionTitlePropsType } from './interface'

const { Title } = Typography
const QuestionTitle: FC = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultPropsType, ...props }
  const getFontSizes = (level: number) => {
    if (level === 1) {
      return '24px'
    }
    if (level === 2) {
      return '20px'
    }
    if (level === 3) {
      return '18px'
    }
    if (level === 4) {
      return '16px'
    }
    if (level === 5) {
      return '14px'
    }
    return '12px'
  }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'left',
          marginBottom: 0,
          fontSize: getFontSizes(level)
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
