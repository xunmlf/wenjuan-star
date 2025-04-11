export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (props: QuestionInputPropsType) => void
}
export const QuestionInputDefaultPropsType: QuestionInputPropsType = {
  title: '一个输入框',
  placeholder: '请输入内容'
}
