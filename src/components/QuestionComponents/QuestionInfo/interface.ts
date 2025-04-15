export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  onChange?: (props: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultPropsType: QuestionInfoPropsType = {
  desc: '请输入描述',
  title: '输入标题'
}
