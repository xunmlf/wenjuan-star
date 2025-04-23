import { FC } from 'react'

import { Typography, Space, Radio } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionRadio: FC = (props: QuestionRadioPropsType) => {
  const {
    title,
    options = [],
    isVertical,
    value
  } = {
    ...QuestionRadioDefaultProps,
    ...props
  }
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((option, index) => {
            return (
              <Radio value={option.value} key={index}>
                {option.text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}
export default QuestionRadio
