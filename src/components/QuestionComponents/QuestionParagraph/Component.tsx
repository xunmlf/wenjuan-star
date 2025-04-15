import { FC } from 'react'

import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '一个段落', isCenter } = { ...QuestionParagraphDefaultPropsType, ...props }

  const arrText = text.split('\n')
  //   console.log(arrText)

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {arrText.map((item, index) => {
        return (
          <span key={index}>
            {item}
            {index !== arrText.length - 1 && <br />}
          </span>
        )
      })}
    </Paragraph>
  )
}
export default Component
