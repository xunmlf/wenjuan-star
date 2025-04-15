import { FC } from 'react'

import { QuestionInfoPropsType, QuestionInfoDefaultPropsType } from './interface'
import { Typography } from 'antd'
const { Paragraph, Title } = Typography
const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '请输入问题', desc = '请输入描述' } = {
    ...QuestionInfoDefaultPropsType,
    ...props
  }
  const arrText = desc.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={5} style={{ fontSize: '24px', marginBottom: 0 }}>
        {title}
      </Title>
      <Paragraph>
        {arrText.map((item, index) => {
          return (
            <span key={index}>
              {item}
              {/* 如果 index 不是最后一个，就加一个换行 */}
              {index !== arrText.length - 1 && <br />}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}
export default QuestionInfo
