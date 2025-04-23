import { FC } from 'react'
import { Typography, Space, Checkbox } from 'antd'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionCheckbox: FC = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list } = {
    ...QuestionCheckboxDefaultProps,
    ...props
  }
  return (
    <div>
      <Paragraph>{title}</Paragraph>

      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map(option => {
          return (
            <Checkbox value={option.value} key={option.value} checked={option.checked}>
              {option.text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckbox
