import { FC } from 'react'
import { Typography, Input } from 'antd'

const { Paragraph } = Typography
import { QuestionInputDefaultPropsType, QuestionInputPropsType } from './interface'
const QuestionInput: FC = (props: QuestionInputPropsType) => {
  const { title = '请输入问题', placeholder = '请输入问题' } = {
    ...QuestionInputDefaultPropsType,
    ...props
  }
  return (
    <div>
      <Paragraph strong style={{ marginBottom: 0 }}>
        {title}
      </Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}
export default QuestionInput
