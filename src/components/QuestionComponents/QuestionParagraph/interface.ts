// 组件配置
export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean
  // 下面两个用于属性表单
  onChange?: (props: QuestionParagraphPropsType) => void
  disabled?: boolean
}

// 组件的默认值
export const QuestionParagraphDefaultPropsType: QuestionParagraphPropsType = {
  text: '一个段落组件',
  isCenter: false
}
