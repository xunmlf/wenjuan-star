//  标题 组件有的属性
export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  onChange?: (props: QuestionTitlePropsType) => void
}

// 默认的属性
export const QuestionTitleDefaultPropsType: QuestionTitlePropsType = {
  text: '一个标题',
  level: 1,
  isCenter: false
}
