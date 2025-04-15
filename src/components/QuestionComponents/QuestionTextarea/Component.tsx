import { FC } from 'react'

import { Typography, Input } from 'antd'
import { QuestionTextareaDefaultPropsType, QuestionTextareaPropsType } from './interface'

const { Paragraph } = Typography
const { TextArea } = Input
const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title = '多行输入框', placeholder } = { ...QuestionTextareaDefaultPropsType, ...props }
  return (
    <div>
      <Paragraph strong style={{ marginBottom: 0 }}>
        {title}
      </Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}
export default QuestionTextarea
