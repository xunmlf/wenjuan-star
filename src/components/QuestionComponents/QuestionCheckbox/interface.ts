export type OptionType = {
  value: string
  text: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  list?: OptionType[] // 选项数组
  isVertical?: boolean // 是否垂直排列

  // 用于PropComponent中 更新属性
  onChange?: (newProps: QuestionCheckboxPropsType) => void // 选中值变化时的回调函数
  disabled?: boolean // 是否禁用
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false }
  ]
}
