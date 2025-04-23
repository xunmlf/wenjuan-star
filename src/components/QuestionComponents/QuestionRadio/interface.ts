export interface OptionType {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  options?: OptionType[] // 选项数组
  isVertical?: boolean // 是否垂直排列
  value?: string // 选中的值
  // 用于PropComponent中 更新属性
  onChange?: (newProps: QuestionRadioPropsType) => void // 选中值变化时的回调函数
  disabled?: boolean // 是否禁用
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选框',
  options: [
    { value: 'option1', text: '选项1' },
    { value: 'option2', text: '选项2' },
    { value: 'option3', text: '选项3' }
  ],
  isVertical: false,
  value: ''
}
